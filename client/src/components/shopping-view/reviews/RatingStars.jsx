import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({
  rating,
  size = 'sm',
  interactive = false,
  onRatingChange,
  readonly = false,
  className = ""
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const starSize = sizeClasses[size] || sizeClasses.sm;

  const renderStar = (starNumber) => {
    const filled = starNumber <= rating;
    const half = starNumber - 0.5 === rating;

    if (filled) {
      return <FaStar className={`${starSize} ${interactive ? 'cursor-pointer hover:text-amber-400' : ''} text-amber-300 transition-colors`} />;
    } else if (half) {
      return <FaStarHalfAlt className={`${starSize} ${interactive ? 'cursor-pointer hover:text-amber-400' : ''} text-amber-300 transition-colors`} />;
    } else {
      return <FaRegStar className={`${starSize} ${interactive ? 'cursor-pointer hover:text-amber-400' : ''} text-gray-300 transition-colors`} />;
    }
  };

  const handleClick = (starNumber) => {
    if (interactive && !readonly) {
      onRatingChange(starNumber);
    }
  };

  return (
    <div className={`flex gap-0.5 items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <button
          key={starNumber}
          type="button"
          onClick={() => handleClick(starNumber)}
          disabled={readonly || !interactive}
          className={`${interactive && !readonly ? 'cursor-pointer' : 'cursor-default'} focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50 rounded`}
          aria-label={`Rate ${starNumber} stars`}
        >
          {renderStar(starNumber)}
        </button>
      ))}
    </div>
  );
};

export default RatingStars;