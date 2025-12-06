const express = require("express");
const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  canReviewProduct,
  markReviewHelpful,
  reportReview,
  getReviewStatistics,
  getUserReviewHistory,
} = require("../../controllers/shop/review-controller");
const { authMiddleware } = require("../../controllers/auth/Auth-Controller");

const router = express.Router();

// Public routes
router.get("/product/:productId", getProductReviews);
router.get("/product/:productId/statistics", getReviewStatistics);
router.get("/can-review/:productId/:userId", canReviewProduct);

// Protected routes (require authentication)
router.use(authMiddleware);

// Create review (protected)
router.post("/product/:productId", createReview);

// Update/delete own reviews (protected)
router.put("/:reviewId", updateReview);
router.delete("/:reviewId", deleteReview);

// Community actions (protected)
router.post("/:reviewId/helpful", markReviewHelpful);
router.post("/:reviewId/report", reportReview);

// User review history (protected)
router.get("/user/:userId/history", getUserReviewHistory);

module.exports = router;