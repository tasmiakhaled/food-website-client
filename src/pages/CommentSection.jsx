import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/UserContext';
import StarRating from './StarRating';

const CommentSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);

  const { user } = useContext(AuthContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const reviewData = {
      name: name || user?.displayName,
      email: email || user?.email,
      rating: rating,
      review: reviewText,
    };

    const formData = new FormData();
    formData.append('name', name || user?.displayName);
    formData.append('email', email || user?.email);
    formData.append('rating', rating);
    formData.append('review', reviewText);
    formData.append('image', imageFile);
    formData.append('reviewData', JSON.stringify(reviewData));

    fetch('http://localhost:5000/addReview', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((newReview) => {
        // Reset form after successful submission
        setRating(0);
        setReviewText('');
        setImageFile(null);

        // Add the new review to the reviews state
        addReview(newReview);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetch('http://localhost:5000/reviews')
      .then((res) => res.json())
      .then((reviews) => {
        setReviews(reviews);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [reviews]);

  return (
    <div>
      {/* <p>Average Rating: {averageRating} out of 5</p> */}
      {/* Display the reviews */}
      {reviews.map((review, index) => (
        <div key={index} className="review pt-5">
          <p className="user__name mb-0">{review.name}</p>
          <p className="user__email mb-0 text-success">{review.email}</p>
          {review.rating && (
            <StarRating value={review.rating} readonly cancel={false} />)}
          <p className="feedback__text">{review.review}</p>
          {review.image && (
            <div>
              <img src={`http://localhost:5000/${review.image}`} alt="" className="w-30" />
            </div>
          )}
        </div>
      ))}

      <form className="form mt-3" onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="form__group">
          <input
            type="text"
            name="name"
            value={name || user?.displayName}
            onChange={handleNameChange}
            placeholder="Enter Your Name"
            readOnly
          />
        </div>

        <div className="form__group">
          <input
            type="text"
            name="email"
            value={email || user?.email}
            onChange={handleEmailChange}
            placeholder="Enter Your Email Address"
            readOnly
          />
        </div>

        <div className="form__group">
          <StarRating value={rating} cancel={false} onChange={handleRatingChange} />
        </div>

        <div className="form__group">
          <textarea
            rows={2}
            type="text"
            name="review"
            value={reviewText}
            onChange={handleReviewTextChange}
            placeholder="Write your review"
            required
          />
        </div>

        <div className="form__group">
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit" className="addTOCart__btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
