import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";
import { AuthContext } from '../contexts/UserContext';
import CommentSection from './CommentSection';
import StarRating from './StarRating';

const FoodDetails = () => {

    const [tab, setTab] = useState("desc");
    const [foodInfo, setFoodInfo] = useState([]);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [lastLikeClickTime, setLastLikeClickTime] = useState(0);
    const [lastDislikeClickTime, setLastDislikeClickTime] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://localhost:5000/foods/${id}`)
            .then(res => res.json())
            .then(foodInfo => {
                setFoodInfo(foodInfo);
                setLikeCount(foodInfo.likes);
                setDislikeCount(foodInfo.dislikes);
            })
            .catch(error => console.error(error))

        // Check if the user liked the food item
        const userLiked = localStorage.getItem(`liked-${id}`);
        if (userLiked === 'true') {
            setLiked(true);
        }

        // Check if the user disliked the food item
        const userDisliked = localStorage.getItem(`disliked-${id}`);
        if (userDisliked === 'true') {
            setDisliked(true);
        }
    }, [id]);

    //for showing average rating of all ratings
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then((res) => res.json())
            .then((reviews) => {
                setReviews(reviews);

                // Calculate total rating
                const totalRating = reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
                const average = reviews.length > 0 ? totalRating / reviews.length : 0;
                setAverageRating(Number(average.toFixed(1)));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [reviews]);

    const { user } = useContext(AuthContext);
    console.log('context', user);

    const submitHandler = (e) => {
        e.preventDefault();

        // console.log(enteredName, enteredEmail, reviewMsg);
    };

    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id,
                // title,
                // image01,
                // price,
            })
        );
    };

    const handleLikeBtn = () => {
        setLiked(!liked);
        const currentTime = Date.now();

        if (!liked) {
            setLikeCount(likeCount + 1);
            localStorage.setItem(`liked-${id}`, 'true');
            setLiked(true);
            if (disliked) {
                setDisliked(false);
                setDislikeCount(dislikeCount - 1);
                localStorage.removeItem(`disliked-${id}`);
            }
        } else if (currentTime - lastLikeClickTime < 10000) {
            // User double-clicked the like button
            setLikeCount(likeCount - 1);
            localStorage.removeItem(`liked-${id}`);
            setLiked(false);
        } else {
            // User clicked the like button once
            setLikeCount(likeCount + 1);
            localStorage.setItem(`liked-${id}`, 'true');
            setLiked(true);
        }

        // Update the last click time
        setLastLikeClickTime(currentTime);

        fetch(`http://localhost:5000/foods/${id}/like`, {
            method: 'PUT',
        })
            .then((res) => res.json())
            .then((updatedProduct) => {
                // setFoodInfo(updatedProduct);
                console.log('Like request successful:', updatedProduct);
            })
            .catch((error) => console.error(error));

    };

    const handleDislikeBtn = () => {
        setDisliked(!disliked);
        const currentTime = Date.now();

        if (!disliked) {
            setDislikeCount(dislikeCount + 1);
            localStorage.setItem(`disliked-${id}`, 'true');
            setDisliked(true);
            if (liked) {
                setLiked(false);
                setLikeCount(likeCount - 1);
                localStorage.removeItem(`liked-${id}`);
            }
        } else if (currentTime - lastDislikeClickTime < 10000) {
            // User double-clicked the dislike button
            setDislikeCount(dislikeCount - 1);
            localStorage.removeItem(`disliked-${id}`);
            setDisliked(false);
        } else {
            // User clicked the dislike button once
            setDislikeCount(dislikeCount + 1);
            localStorage.setItem(`disliked-${id}`, 'true');
            setDisliked(true);
        }

        // Update the last click time
        setLastDislikeClickTime(currentTime);

        fetch(`http://localhost:5000/foods/${id}/dislike`, {
            method: 'PUT',
        })
            .then((res) => res.json())
            .then((updatedProduct) => {
                // Handle the response if needed
                // setFoodInfo(updatedProduct);
                console.log('Dislike request successful:', updatedProduct);
            })
            .catch((error) => console.error(error));
    };
    return (
        <Helmet title="Product-details">
            <CommonSection title={foodInfo.title} />
            <section>
                <Container>
                    <Row>
                        <Col lg="4" md="4">
                            <div className="product__main-img">
                                <img src={foodInfo.image01} alt="" className="w-100" />
                            </div>
                        </Col>
                        <Col lg="6" md="6">
                            <div className="single__product-content">
                                <h2 className="product__title mb-3">{foodInfo.title}</h2>
                                {averageRating &&
                                    (<p className="rating">Rating: <span className='text-warning'>{averageRating} out of 5</span></p>
                                    )}
                                <p className="product__price">
                                    {" "}
                                    Price: <span>${foodInfo.price}</span>
                                </p>
                                <p className="category">
                                    Category: <span>{foodInfo.category}</span>
                                </p>

                                <div className="hero__btns d-flex align-items-center gap-2 mt-3">
                                    <button onClick={handleLikeBtn} className={`like-btn d-flex align-items-center justify-content-between ${liked ? 'active' : ''
                                        }`}>
                                        {liked ? <i class="ri-thumb-up-fill" /> : <i class="ri-thumb-up-line" />}
                                        <span className='ms-1'>{likeCount}</span>
                                    </button>

                                    <button onClick={handleDislikeBtn} className={`dislike-btn ${disliked ? 'active' : ''}`}>
                                        {disliked ? <i class="ri-thumb-down-fill" /> : <i class="ri-thumb-down-line" />}
                                        <span className='ms-1 text-center'>{dislikeCount}</span>
                                    </button>
                                </div>
                                <button onClick={addToCart} className="addTOCart__btn">
                                    Add to Cart
                                </button>
                            </div>
                        </Col>

                        <Col lg="12">
                            <div className="tabs d-flex align-items-center gap-5 py-3">
                                <h6
                                    className={` ${tab === "desc" ? "tab__active" : ""}`}
                                    onClick={() => setTab("desc")}
                                >
                                    Description
                                </h6>
                                <h6
                                    className={` ${tab === "rev" ? "tab__active" : ""}`}
                                    onClick={() => setTab("rev")}
                                >
                                    Review
                                </h6>
                            </div>

                            {tab === "desc" ? (
                                <div className="tab__content">
                                    <p>{foodInfo.desc}</p>
                                </div>
                            ) : (
                                <div className="tab__form mb-3">
                                    <CommentSection />
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default FoodDetails;