import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { Skeleton } from "../../ui/skeleton";
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import ReviewStats from './ReviewStats';
import ReviewFilters from './ReviewFilters';
import {
  fetchProductReviews,
  fetchReviewStatistics,
  checkCanReview,
  createReview,
  updateReview,
  setFilters,
  clearReviews,
  setCurrentPage
} from '@/store/shop/review-slice';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

const ReviewList = ({
  productId,
  currentUser,
  showWriteReview = true,
  maxReviews = null,
  className = ""
}) => {
  const dispatch = useDispatch();
  const {
    reviews,
    reviewStats,
    currentReview,
    isLoading,
    error,
    pagination,
    filters
  } = useSelector((state) => state.reviews);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [canReviewInfo, setCanReviewInfo] = useState(null);

  // Initialize and fetch reviews
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductReviews({
        productId,
        page: 1,
        limit: maxReviews || 10,
        sortBy: filters.sortBy,
        rating: filters.rating
      }));
      dispatch(fetchReviewStatistics(productId));
    }

    return () => {
      dispatch(clearReviews());
    };
  }, [productId, dispatch, maxReviews, filters.sortBy, filters.rating]);

  // Check if user can review (if logged in)
  useEffect(() => {
    if (productId && currentUser) {
      dispatch(checkCanReview({ productId, userId: currentUser.id }))
        .unwrap()
        .then((result) => {
          setCanReviewInfo(result);
        })
        .catch((error) => {
          console.error('Error checking review permission:', error);
        });
    }
  }, [productId, currentUser, dispatch]);

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(fetchProductReviews({
      productId,
      page: 1,
      limit: maxReviews || 10,
      sortBy: newFilters.sortBy,
      rating: newFilters.rating
    }));
  };

  // Handle pagination
  const handleLoadMore = () => {
    if (pagination.currentPage < pagination.totalPages) {
      const nextPage = pagination.currentPage + 1;
      dispatch(setCurrentPage(nextPage));
      dispatch(fetchProductReviews({
        productId,
        page: nextPage,
        limit: 10,
        sortBy: filters.sortBy,
        rating: filters.rating
      }));
    }
  };

  // Handle review submission
  const handleReviewSubmit = async ({ productId: reviewProductId, reviewData }) => {
    try {
      if (currentReview) {
        await dispatch(updateReview({
          reviewId: currentReview._id,
          reviewData
        })).unwrap();
      } else {
        await dispatch(createReview({
          productId: reviewProductId,
          reviewData
        })).unwrap();
      }

      // Refresh reviews and stats
      dispatch(fetchProductReviews({
        productId,
        page: 1,
        limit: maxReviews || 10,
        sortBy: filters.sortBy,
        rating: filters.rating
      }));
      dispatch(fetchReviewStatistics(productId));

      // Check review status again
      if (currentUser) {
        const result = await dispatch(checkCanReview({ productId, userId: currentUser.id })).unwrap();
        setCanReviewInfo(result);
      }
    } catch (error) {
      throw error; // Let ReviewForm handle the error display
    }
  };

  // Handle edit review
  const handleEditReview = () => {
    if (currentReview) {
      setShowReviewForm(true);
    }
  };

  // Loading skeleton
  if (isLoading && reviews.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <Skeleton key={j} className="h-4 w-4" />
                      ))}
                    </div>
                  </div>
                </div>
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && reviews.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-red-500">Failed to load reviews. Please try again later.</p>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => dispatch(fetchProductReviews({ productId }))}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Review Statistics */}
      {reviewStats && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <ReviewStats reviewStats={reviewStats} />
        </div>
      )}

      {/* Write Review Section */}
      {showWriteReview && currentUser && canReviewInfo && (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
          <div>
            {currentReview ? (
              <div>
                <p className="font-medium">You've reviewed this product</p>
                <p className="text-sm text-muted-foreground">
                  Rating: {currentReview.rating} stars
                </p>
              </div>
            ) : canReviewInfo.canReview ? (
              <div>
                <p className="font-medium">Share your experience</p>
                <p className="text-sm text-muted-foreground">
                  Help others by writing a review
                </p>
              </div>
            ) : (
              <div>
                <p className="font-medium">Purchase this product to write a review</p>
                <p className="text-sm text-muted-foreground">
                  Only verified purchases can be reviewed
                </p>
              </div>
            )}
          </div>
          {(currentReview || canReviewInfo.canReview) && (
            <Button
              onClick={currentReview ? handleEditReview : () => setShowReviewForm(true)}
              className="flex items-center gap-2"
            >
              {currentReview ? 'Edit Review' : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  Write Review
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* Filters */}
      {reviews.length > 0 && (
        <ReviewFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          totalReviews={pagination.totalReviews}
        />
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 && !isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No reviews yet.</p>
            {showWriteReview && currentUser && canReviewInfo?.canReview && (
              <p className="text-sm mt-2">Be the first to review this product!</p>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                currentUser={currentUser}
                showActions={true}
                showVerifiedBadge={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {!maxReviews && pagination.currentPage < pagination.totalPages && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More Reviews'}
          </Button>
        </div>
      )}

      {/* Review Form Dialog */}
      <ReviewForm
        open={showReviewForm}
        setOpen={setShowReviewForm}
        productId={productId}
        userId={currentUser?.id}
        orderId={canReviewInfo?.order?._id}
        initialReview={currentReview}
        onSubmit={handleReviewSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ReviewList;