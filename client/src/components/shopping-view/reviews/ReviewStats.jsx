import React from 'react';
import RatingStars from './RatingStars';

const ReviewStats = ({ reviewStats, className = "" }) => {
  if (!reviewStats) {
    return null;
  }

  const { averageRating, totalReviews, ratingDistribution } = reviewStats;

  // Calculate percentage for each rating
  const getPercentage = (count) => {
    if (totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  // Format rating to 1 decimal place
  const formatRating = (rating) => {
    return Number.isInteger(rating) ? rating : rating.toFixed(1);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Overall Rating */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">
            {formatRating(averageRating)}
          </div>
          <RatingStars rating={averageRating} size="md" readonly />
          <div className="text-sm text-muted-foreground mt-1">
            {totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      {totalReviews > 0 && (
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-sm font-medium w-8">{rating}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${getPercentage(ratingDistribution[rating])}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">
                {ratingDistribution[rating]}
              </span>
              <span className="text-xs text-muted-foreground w-10 text-right">
                ({getPercentage(ratingDistribution[rating])}%)
              </span>
            </div>
          ))}
        </div>
      )}

      {/* No Reviews Message */}
      {totalReviews === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          <p>No reviews yet for this product.</p>
          <p className="text-sm">Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewStats;