import React, { useEffect, useState } from "react";

import { TimelineLite, Power3 } from 'gsap';

import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import heroImg from "../assets/images/front.png";
import "../styles/hero-section.css";

import { Link } from "react-router-dom";

import Category from "../components/UI/category/Category.jsx";

import "../styles/home.css";

import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";

// import whyImg from "../assets/images/page3.jpg";

import networkImg from "../assets/images/network.png";

import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";
import DropDown from "../components/dropdown/DropDown.jsx";

// const featureData = [
//   {
//     title: "Quick Search",
//     imgUrl: featureImg01,
//     desc: "Hurry up to find your food",
//   },

//   {
//     title: "Easy Checkout",
//     imgUrl: featureImg02,
//     desc: "checkout easily from anywhere.",
//   },
//   {
//     title: "Resourceful",
//     imgUrl: featureImg03,
//     desc: "Variety of food collection.",
//   },
// ];

const Home = () => {

  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    const tl = new TimelineLite({ delay: 0.3 });
    tl.from('.hero__img', { duration: 0.7, opacity: 0, y: 15, delay: 0.5 })
    tl.from('.hero__content', { duration: 0.7, opacity: 0, y: 15, delay: 0.5 })
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/featuredData')
      .then(res => res.json())
      .then(data => setFeaturedData(data))
  }, []);

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h5 className="mb-3">Easy way to choose your food </h5>
                <h1 className="mb-4 hero__title">
                  <span>HUNGRY?</span> Find Your Desired <br />
                  <span> Food Here</span>
                </h1>

                <p className="paragraph">
                  Live, love, eat
                </p>

                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    <Link to="/foods">Order now <i class="ri-arrow-right-s-line"></i></Link>

                  </button>

                  <button className="all__foods-btn">
                    <Link to="/foods">See all foods</Link>
                  </button>
                </div>

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-car-line"></i>
                    </span>{" "}
                    Hassle free
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-shield-check-line"></i>
                    </span>{" "}
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Category />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">What we serve</h5>
              <h2 className="feature__title">Just sit back at home </h2>
              <h2 className="feature__title">
                we will <span>take care</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                Enjoy your food with joy
              </p>
              <p className="feature__text">
                lets have a break and eat food {" "}
              </p>
            </Col>
            {featuredData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
                  <img
                    src={item.img}
                    alt="feature-img"
                    className="w-25 mb-3"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="why__choose-us">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="ratio ratio-16x9">
                <iframe src="https://www.youtube.com/embed/tJlzIJaokVY" title="YouTube video" allowfullscreen></iframe>
              </div>
              {/* <img src={whyImg} alt="why-tasty-treat" className="w-100" /> */}
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span> Food's Mood?</span>
                </h2>
                <p className="tasty__treat-desc">

                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-4">
                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i>Find Fresh and tasty
                      foods
                    </p>
                    <p className="choose__us-desc">
                      to serve best and fresh food
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-4">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i> Quality support
                    </p>
                    <p className="choose__us-desc">
                      find quality support
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-4">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i>Check from any
                      location{" "}
                    </p>
                    <p className="choose__us-desc">
                      detect from any location
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5 ">
              <h2>Hot Pizza</h2>
            </Col>

            {hotPizza.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section> */}

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h5 className="testimonial__subtitle mb-4"> Inspiration </h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__desc">
                As customer service personnel, they occasionally have the power to handle complaints, grievances, and unusual demands. They reply to these inquiries since retaining clients is crucial for a business to thrive.
                </p>

                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
