const express = require("express");
const {
  getAllReviews,
  moderateReview,
  respondToReview,
  deleteReviewAdmin,
  getAdminReviewStats,
  getReportedReviews,
} = require("../../controllers/admin/admin-review-controller");
const { authMiddleware } = require("../../controllers/auth/Auth-Controller");

const router = express.Router();

// All admin routes require authentication
router.use(authMiddleware);

// Get all reviews with filtering and pagination
router.get("/", getAllReviews);

// Get admin dashboard statistics
router.get("/stats", getAdminReviewStats);

// Get reported reviews
router.get("/reported", getReportedReviews);

// Moderate (approve/reject) a review
router.put("/:reviewId/moderate", moderateReview);

// Add admin response to a review
router.post("/:reviewId/respond", respondToReview);

// Delete any review
router.delete("/:reviewId", deleteReviewAdmin);

module.exports = router;