import React, { useRef } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import app from "../firebase.init";
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/UserContext";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const auth = getAuth(app);

const Login = () => {

  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const {signIn} = useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = event => {
    event.preventDefault();
    setSuccess(false);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setSuccess(true);
      navigate(from, {replace: true});
    })
    .catch (error => {
        console.error('error', error);
      })
  };

  const handleEmailBlur = event => {
    const email = event.target.value;
    setEmail(email);
  }

  const handleForgetPassword = () => {

    if(!email){
      toast.warn('Please enter your email address.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }

    sendPasswordResetEmail(auth, email)
    .then( () => {
      toast.info('Please check your email to reset your password.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
    .catch(error => {
      console.error(error);
    })
  }

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={handleSubmit}>
                <div className="form__group">
                  <input
                    type="email"
                    onBlur={handleEmailBlur}
                    name = "email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    name = "password"
                    placeholder="Password"
                    required
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Login
                </button>
                {success && <p className="text-success mt-3 fw-bold">Successfully Logged In!</p>}
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
              <p>Forget Password?<button type="button" onClick={handleForgetPassword} className="btn btn-link text-dark">Please Reset.</button></p>
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer></ToastContainer>
    </Helmet>
  );
};

export default Login;
