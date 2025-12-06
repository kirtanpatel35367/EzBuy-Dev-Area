require("dotenv").config();
const Review = require("../../models/Review");
const Order = require("../../models/Order");
const Product = require("../../models/Products");

// Get reviews for a product with pagination and filtering
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sortBy = 'newest', rating } = req.query;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = { productId, isApproved: true };

    // Add rating filter if specified
    if (rating && rating !== 'all') {
      filter.rating = parseInt(rating);
    }

    // Build sort object
    let sort = {};
    switch (sortBy) {
      case 'newest':
        sort.createdAt = -1;
        break;
      case 'oldest':
        sort.createdAt = 1;
        break;
      case 'highest':
        sort.rating = -1;
        break;
      case 'lowest':
        sort.rating = 1;
        break;
      case 'helpful':
        sort.helpfulCount = -1;
        break;
      default:
        sort.createdAt = -1;
    }

    const reviews = await Review.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
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

// Create a new review (only for verified purchases)
const createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, rating, reviewText, orderId } = req.body;

    if (!userId || !rating || !reviewText || !orderId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    // Verify that user has purchased the product
    const order = await Order.findOne({
      userId,
      _id: orderId,
      "cartItems.productId": productId,
      orderStatus: 'delivered'
    });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "You can only review products you have purchased and received",
      });
    }

    // Create new review
    const newReview = new Review({
      userId,
      productId,
      orderId,
      rating,
      reviewText,
      isVerifiedPurchase: true,
    });

    await newReview.save();

    // Update product review statistics
    await Review.updateProductReviewStats(productId);

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a review (only own reviews)
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId, rating, reviewText } = req.body;

    if (!userId || !rating || !reviewText) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const review = await Review.findOne({ _id: reviewId, userId });
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or you don't have permission to update it",
      });
    }

    review.rating = rating;
    review.reviewText = reviewText;
    await review.save();

    // Update product review statistics
    await Review.updateProductReviewStats(review.productId);

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a review (only own reviews)
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const review = await Review.findOne({ _id: reviewId, userId });
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or you don't have permission to delete it",
      });
    }

    const productId = review.productId;
    await Review.deleteOne({ _id: reviewId });

    // Update product review statistics
    await Review.updateProductReviewStats(productId);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Check if user can review a product (has purchased and not reviewed yet)
const canReviewProduct = async (req, res) => {
  try {
    const { productId, userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({ userId, productId });

    if (existingReview) {
      return res.status(200).json({
        success: true,
        canReview: false,
        hasReviewed: true,
        review: existingReview,
      });
    }

    // Check if user has purchased the product
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: 'delivered'
    });

    return res.status(200).json({
      success: true,
      canReview: !!order,
      hasReviewed: false,
      order: order ? { _id: order._id } : null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark review as helpful
const markReviewHelpful = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { $inc: { helpfulCount: 1 } },
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
      message: "Review marked as helpful",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Report a review
const reportReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { $inc: { reportedCount: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Auto-hide review if reported too many times
    if (review.reportedCount >= 5) {
      review.isApproved = false;
      await review.save();
    }

    return res.status(200).json({
      success: true,
      message: "Review reported successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get review statistics for a product
const getReviewStatistics = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId, {
      averageRating: 1,
      totalReviews: 1,
      ratingDistribution: 1
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        averageRating: product.averageRating,
        totalReviews: product.totalReviews,
        ratingDistribution: product.ratingDistribution,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user's review history
const getUserReviewHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ userId })
      .populate('productId', 'title image')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments({ userId });

    return res.status(200).json({
      success: true,
      message: "User review history fetched successfully",
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
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  canReviewProduct,
  markReviewHelpful,
  reportReview,
  getReviewStatistics,
  getUserReviewHistory,
};