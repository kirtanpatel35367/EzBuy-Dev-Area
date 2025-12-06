import React, { useState } from 'react';
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Label } from "../../ui/label";
import RatingStars from './RatingStars';
import { toast } from 'sonner';

const ReviewForm = ({
  open,
  setOpen,
  productId,
  userId,
  orderId,
  initialReview = null,
  onSubmit,
  isLoading = false
}) => {
  const [rating, setRating] = useState(initialReview?.rating || 0);
  const [reviewText, setReviewText] = useState(initialReview?.reviewText || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form
  const resetForm = () => {
    setRating(0);
    setReviewText('');
    setIsSubmitting(false);
  };

  // Handle form close
  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      setOpen(false);
    }
  };

  // Validate form
  const validateForm = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return false;
    }
    if (reviewText.trim().length < 10) {
      toast.error('Review text must be at least 10 characters long');
      return false;
    }
    if (reviewText.trim().length > 1000) {
      toast.error('Review text must not exceed 1000 characters');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const reviewData = {
        userId,
        orderId,
        rating,
        reviewText: reviewText.trim()
      };

      if (initialReview) {
        // Update existing review
        await onSubmit({
          reviewId: initialReview._id,
          reviewData
        });
        toast.success('Review updated successfully');
      } else {
        // Create new review
        await onSubmit({
          productId,
          reviewData
        });
        toast.success('Review submitted successfully');
      }

      resetForm();
      setOpen(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const characterCount = reviewText.length;
  const minCharacters = 10;
  const maxCharacters = 1000;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] font-HeadFont">
        <DialogHeader>
          <DialogTitle>
            {initialReview ? 'Edit Your Review' : 'Write a Review'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Selection */}
          <div className="space-y-2">
            <Label htmlFor="rating" className="text-sm font-medium">
              Rating <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col items-center space-y-2">
              <RatingStars
                rating={rating}
                size="lg"
                interactive
                onRatingChange={setRating}
                readonly={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                {rating === 0
                  ? 'Click to rate'
                  : `${rating} star${rating !== 1 ? 's' : ''}`
                }
              </p>
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="reviewText" className="text-sm font-medium">
              Your Review <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this product. What did you like or dislike?"
              className="min-h-[120px] resize-none"
              disabled={isSubmitting}
              maxLength={maxCharacters}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Minimum {minCharacters} characters</span>
              <span className={`${characterCount < minCharacters || characterCount > maxCharacters ? 'text-red-500' : ''}`}>
                {characterCount}/{maxCharacters}
              </span>
            </div>
          </div>

          {/* Additional Info */}
          {!initialReview && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Important:</strong> This review will be associated with your verified purchase.
                Only one review per product per customer is allowed.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading || rating === 0}
              className="min-w-[100px]"
            >
              {isSubmitting || isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  {initialReview ? 'Updating...' : 'Submitting...'}
                </span>
              ) : (
                initialReview ? 'Update Review' : 'Submit Review'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;