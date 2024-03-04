import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { useRef, useEffect } from "react";
import '../styles/contact.css';
const Contact = () => {

  return (
    <Row className="sec_sp d-flex justify-content-between">
      <Col lg="5" className="mb-5 ms-5 mt-3">
        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d8777.520822979499!2d91.82192483621863!3d22.335013168241865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20map!5e0!3m2!1sen!2sbd!4v1684263173053!5m2!1sen!2sbd" height="400vh" width="600vw" box-sizing="border-box" allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </Col>
      <Col lg="5" className="d-flex justify-content-end me-5">
        <form className="contact__form w-70">
          <Row>
            <Col lg="8">
              <h3 className="display-4 mb-2">Contact Me</h3>
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
            <Col lg="6" className="form-group">
              <input
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                type="text"
                required
              />
            </Col>
            <Col lg="6" className="form-group">
              <input
                className="form-control rounded-0"
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                required
              />
            </Col>
          </Row>
          <textarea
            className="form-control rounded-0"
            id="message"
            name="message"
            placeholder="Message"
            rows="5"
            required
          ></textarea>
          <br />
          <Row>
            <Col lg="12" className="form-group">
              <button className="submit__btn" type="submit">
                Send
              </button>
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  )
};

export default Contact;
