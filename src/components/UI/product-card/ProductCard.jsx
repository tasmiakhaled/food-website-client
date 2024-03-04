import React from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const ProductCard = (props) => {
  const { _id, title, image01, price } = props.item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        _id,
        title,
        image01,
        price,
      })
    );
  };

  return (
    <div className="product__item" style={{ width: "250px", height: "300px" }}>
      <div className="product__img" style={{ width: "100%", height: "70%" }}>
        <Link to={`/foods/${_id}`}>
          <img src={image01} alt="product-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Link>
      </div>

      <div className="product__content" style={{ width: "100%", height: "30%" }}>
        <h5>{title}</h5>
        <div className="d-flex align-items-center justify-content-between">
          <span className="product__price" style={{marginTop: "-0.8rem"}}>৳{price}</span>
          <button className="addTOCart__btn" onClick={addToCart} style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", marginTop: "-1.2rem" }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>

  );
};

export default ProductCard;
