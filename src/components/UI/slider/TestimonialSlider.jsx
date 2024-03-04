import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import "../../../styles/slider.css";

const TestimonialSlider = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('/reviews')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);

  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {comments.map((comment, index) => (
        <div key={index}>
          <p className="review__text">{comment.review}</p>
          <div className="slider__content d-flex align-items-center gap-3">
            <img src={comment.image} alt="avatar" className="rounded" />
            <h6>{comment.name}</h6>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TestimonialSlider;
