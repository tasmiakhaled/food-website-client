import React, { useState } from 'react';
import { Rating } from 'primereact/rating';

const StarRating = ({ value, onChange }) => {
  const [rating, setRating] = useState(value);

  const handleRatingChange = (event) => {
    const newValue = +event.value; // Convert the value to a number
    setRating(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <Rating
        style={{ display: 'flex', alignItems: 'center' }}
        className='text-warning'
        value={rating}
        onChange={handleRatingChange}
        stars={5}
        cancel={false}
      />
    </div>
  );
};

export default StarRating;
