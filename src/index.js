import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

import store from "./store/store";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import UserContext from "./contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
      <UserContext>
        <Router>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
      </UserContext>
  </React.StrictMode >,
  document.getElementById("root")
);
