require("dotenv").config();
const Review = require("../../models/Review");
const { authMiddleware } = require("../../controllers/auth/Auth-Controller");

// Get all reviews with filtering and pagination for admin
const getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 20, status = 'all', rating, productId } = req.query;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = {};

    if (status !== 'all') {
      filter.isApproved = status === 'approved';
    }

    if (rating && rating !== 'all') {
      filter.rating = parseInt(rating);
    }

    if (productId) {
      filter.productId = productId;
    }

    const reviews = await Review.find(filter)
      .populate('userId', 'username email')
      .populate('productId', 'title image')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Admin reviews fetched successfully",
      data: reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReviews / limit),
        totalReviews,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve or reject a review
const moderateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { action } = req.body; // 'approve' or 'reject'

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Must be 'approve' or 'reject'",
      });
    }

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { isApproved: action === 'approve' },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Update product review statistics
    await Review.updateProductReviewStats(review.productId);

    return res.status(200).json({
      success: true,
      message: `Review ${action}d successfully`,
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add admin response to a review
const respondToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { responseText, adminId } = req.body;

    if (!responseText || !adminId) {
      return res.status(400).json({
        success: false,
        message: "Response text and admin ID are required",
      });
    }

    const review = await Review.findByIdAndUpdate(
      reviewId,
      {
        adminResponse: responseText,
        adminId,
        respondedAt: new Date()
      },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin response added successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete any review (admin only)
const deleteReviewAdmin = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const productId = review.productId;
    await Review.findByIdAndDelete(reviewId);

    // Update product review statistics
    await Review.updateProductReviewStats(productId);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully by admin",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get review statistics for admin dashboard
const getAdminReviewStats = async (req, res) => {
  try {
    const stats = await Review.aggregate([
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          approvedReviews: { $sum: { $cond: [{ $eq: ["$isApproved", true] }, 1, 0] } },
          pendingReviews: { $sum: { $cond: [{ $eq: ["$isApproved", false] }, 1, 0] } },
          averageRating: { $avg: "$rating" },
          ratingDistribution: {
            $push: "$rating"
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalReviews: 0,
      approvedReviews: 0,
      pendingReviews: 0,
      averageRating: 0,
      ratingDistribution: []
    };

    // Calculate rating distribution
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    result.ratingDistribution.forEach(rating => {
      distribution[rating]++;
    });

    return res.status(200).json({
      success: true,
      data: {
        ...result,
        ratingDistribution: distribution
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get reviews reported by users
const getReportedReviews = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ reportedCount: { $gt: 0 } })
      .populate('userId', 'username email')
      .populate('productId', 'title image')
      .sort({ reportedCount: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments({ reportedCount: { $gt: 0 } });

    return res.status(200).json({
      success: true,
      message: "Reported reviews fetched successfully",
      data: reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReviews / limit),
        totalReviews,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllReviews,
  moderateReview,
  respondToReview,
  deleteReviewAdmin,
  getAdminReviewStats,
  getReportedReviews,
};