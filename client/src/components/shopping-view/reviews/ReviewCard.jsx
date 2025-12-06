import React, { useState } from 'react';
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import RatingStars from './RatingStars';
import { FaThumbsUp, FaFlag } from 'react-icons/fa';

const ReviewCard = ({
  review,
  currentUser,
  showActions = true,
  showVerifiedBadge = true,
  className = ""
}) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [hasReported, setHasReported] = useState(false);

  // Get user initials from username
  const getUserInitials = (username) => {
    if (!username) return 'U';
    return username.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle marking review as helpful
  const handleMarkHelpful = async () => {
    if (isHelpful) return;
    setIsHelpful(true);
    // TODO: Dispatch action to mark review as helpful
    // dispatch(markReviewHelpful(review._id));
  };

  // Handle reporting review
  const handleReportReview = async () => {
    if (hasReported) return;
    setHasReported(true);
    // TODO: Dispatch action to report review
    // dispatch(reportReview(review._id));
  };

  const isOwnReview = currentUser && review.userId === currentUser.id;

  return (
    <div className={`p-4 border rounded-lg space-y-3 ${className}`}>
      {/* Review Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="font-HeadFont">
              {getUserInitials(review.userId?.username || 'User')}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">
                {review.userId?.username || 'Anonymous User'}
              </h3>
              {showVerifiedBadge && review.isVerifiedPurchase && (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Verified Purchase
                </span>
              )}
              {isOwnReview && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Your Review
                </span>
              )}
            </div>
            <RatingStars rating={review.rating} size="sm" readonly />
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">
            {formatDate(review.createdAt)}
          </p>
        </div>
      </div>

      {/* Review Content */}
      <div className="space-y-2">
        <p className="text-sm text-gray-700 leading-relaxed">
          {review.reviewText}
        </p>

        {/* Admin Response */}
        {review.adminResponse && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-blue-800">Admin Response</span>
              {review.respondedAt && (
                <span className="text-xs text-blue-600">
                  {formatDate(review.respondedAt)}
                </span>
              )}
            </div>
            <p className="text-sm text-blue-700">{review.adminResponse}</p>
          </div>
        )}
      </div>

      {/* Review Actions */}
      {showActions && !isOwnReview && (
        <>
          <Separator />
          <div className="flex items-center gap-4 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkHelpful}
              disabled={isHelpful}
              className="h-8 px-2 text-xs hover:bg-green-50 hover:text-green-700"
            >
              <FaThumbsUp className={`mr-1 ${isHelpful ? 'text-green-600' : ''}`} />
              Helpful {review.helpfulCount > 0 && `(${review.helpfulCount})`}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleReportReview}
              disabled={hasReported}
              className="h-8 px-2 text-xs hover:bg-red-50 hover:text-red-700"
            >
              <FaFlag className={`mr-1 ${hasReported ? 'text-red-600' : ''}`} />
              {hasReported ? 'Reported' : 'Report'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewCard;