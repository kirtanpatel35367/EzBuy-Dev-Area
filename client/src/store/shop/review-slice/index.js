import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/api/api";

const initialState = {
  reviews: [],
  reviewStats: null,
  userReviews: [],
  currentReview: null,
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalReviews: 0,
    limit: 10
  },
  filters: {
    sortBy: 'newest',
    rating: 'all'
  }
};

// Fetch product reviews
export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async ({ productId, page = 1, limit = 10, sortBy = 'newest', rating = 'all' }) => {
    const response = await axiosClient.get(`shop/reviews/product/${productId}`, {
      params: { page, limit, sortBy, rating }
    });
    return response?.data;
  }
);

// Fetch review statistics for a product
export const fetchReviewStatistics = createAsyncThunk(
  "reviews/fetchReviewStatistics",
  async (productId) => {
    const response = await axiosClient.get(`shop/reviews/product/${productId}/statistics`);
    return response?.data;
  }
);

// Check if user can review a product
export const checkCanReview = createAsyncThunk(
  "reviews/checkCanReview",
  async ({ productId, userId }) => {
    const response = await axiosClient.get(`shop/reviews/can-review/${productId}/${userId}`);
    return response?.data;
  }
);

// Create a new review
export const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({ productId, reviewData }) => {
    const response = await axiosClient.post(`shop/reviews/product/${productId}`, reviewData);
    return response?.data;
  }
);

// Update a review
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ reviewId, reviewData }) => {
    const response = await axiosClient.put(`shop/reviews/${reviewId}`, reviewData);
    return response?.data;
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async ({ reviewId, userId }) => {
    const response = await axiosClient.delete(`shop/reviews/${reviewId}`, { data: { userId } });
    return response?.data;
  }
);

// Mark review as helpful
export const markReviewHelpful = createAsyncThunk(
  "reviews/markHelpful",
  async (reviewId) => {
    const response = await axiosClient.post(`shop/reviews/${reviewId}/helpful`);
    return response?.data;
  }
);

// Report a review
export const reportReview = createAsyncThunk(
  "reviews/reportReview",
  async ({ reviewId, reason }) => {
    const response = await axiosClient.post(`shop/reviews/${reviewId}/report`, { reason });
    return response?.data;
  }
);

// Get user's review history
export const fetchUserReviewHistory = createAsyncThunk(
  "reviews/fetchUserReviewHistory",
  async ({ userId, page = 1, limit = 10 }) => {
    const response = await axiosClient.get(`shop/reviews/user/${userId}/history`, {
      params: { page, limit }
    });
    return response?.data;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearReviews: (state) => {
      state.reviews = [];
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalReviews: 0,
        limit: 10
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch product reviews
      .addCase(fetchProductReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Fetch review statistics
      .addCase(fetchReviewStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviewStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewStats = action.payload.data;
      })
      .addCase(fetchReviewStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Check if user can review
      .addCase(checkCanReview.fulfilled, (state, action) => {
        state.currentReview = action.payload.hasReviewed ? action.payload.review : null;
      })

      // Create review
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add new review to the beginning of the list
        state.reviews.unshift(action.payload.data);
        state.pagination.totalReviews += 1;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Update review
      .addCase(updateReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the review in the list
        const index = state.reviews.findIndex(review => review._id === action.payload.data._id);
        if (index !== -1) {
          state.reviews[index] = action.payload.data;
        }
        // Update current review if it's the one being edited
        if (state.currentReview && state.currentReview._id === action.payload.data._id) {
          state.currentReview = action.payload.data;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete review
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the review from the list
        state.reviews = state.reviews.filter(review => review._id !== action.meta.arg.reviewId);
        state.pagination.totalReviews -= 1;
        // Clear current review if it was deleted
        if (state.currentReview && state.currentReview._id === action.meta.arg.reviewId) {
          state.currentReview = null;
        }
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Mark helpful
      .addCase(markReviewHelpful.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(review => review._id === action.payload.data._id);
        if (index !== -1) {
          state.reviews[index].helpfulCount = action.payload.data.helpfulCount;
        }
      })

      // Report review
      .addCase(reportReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(review => review._id === action.payload.data._id);
        if (index !== -1) {
          state.reviews[index].reportedCount = action.payload.data.reportedCount;
          state.reviews[index].isApproved = action.payload.data.isApproved;
        }
      })

      // Fetch user review history
      .addCase(fetchUserReviewHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserReviewHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userReviews = action.payload.data;
      })
      .addCase(fetchUserReviewHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearReviews, clearError, setCurrentPage } = reviewSlice.actions;

export default reviewSlice.reducer;