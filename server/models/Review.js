const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: true, // Auto-approve for now, can be changed for manual moderation
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
    reportedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for performance
ReviewSchema.index({ productId: 1, isApproved: 1 });
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true }); // One review per user per product
ReviewSchema.index({ orderId: 1 });

// Static method to update product review statistics
ReviewSchema.statics.updateProductReviewStats = async function (productId) {
  const stats = await this.aggregate([
    { $match: { productId: productId, isApproved: true } },
    {
      $group: {
        _id: "$productId",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
        ratingDistribution: {
          $push: "$rating",
        },
      },
    },
  ]);

  const ratingDistribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  if (stats.length > 0) {
    const distribution = stats[0].ratingDistribution;
    distribution.forEach((rating) => {
      ratingDistribution[rating]++;
    });

    await mongoose.model("Product").findByIdAndUpdate(productId, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10, // Round to 1 decimal
      totalReviews: stats[0].totalReviews,
      ratingDistribution,
    });
  } else {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    });
  }
};

module.exports = mongoose.model("Review", ReviewSchema);
