import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Button } from "../../ui/button";
import { SlidersHorizontal } from 'lucide-react';

const ReviewFilters = ({
  filters,
  onFiltersChange,
  totalReviews,
  className = ""
}) => {
  const handleSortChange = (value) => {
    onFiltersChange({ sortBy: value });
  };

  const handleRatingChange = (value) => {
    onFiltersChange({ rating: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      sortBy: 'newest',
      rating: 'all'
    });
  };

  const hasActiveFilters = filters.sortBy !== 'newest' || filters.rating !== 'all';

  return (
    <div className={`flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="highest">Highest Rating</SelectItem>
              <SelectItem value="lowest">Lowest Rating</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter by Rating */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Rating:</span>
          <Select value={filters.rating} onValueChange={handleRatingChange}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="h-8 text-xs"
        >
          <SlidersHorizontal className="w-3 h-3 mr-1" />
          Reset Filters
        </Button>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {totalReviews > 0 && (
          <span>{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</span>
        )}
      </div>
    </div>
  );
};

export default ReviewFilters;