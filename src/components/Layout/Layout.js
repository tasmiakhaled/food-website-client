import React, { useState } from "react";
import './layout.css'

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routers from "../../routes/Routers.js";

import Carts from "../UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
import DropDown from "../dropdown/DropDown.jsx";

const Layout = () => {
  const [dropdown, setDropdown] = useState(false)
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const handleDrop = (state) => {
    console.log("d d handled", state)
  }
  return (
    <div style={{backgroundColor: "#FFE5B4"}}>
      <Header
        dropdown={dropdown}
        setDropdown={setDropdown}
      />
      {dropdown && <div className="dd-container">
        <DropDown
          dropdown={dropdown}
          setDropdown={setDropdown} />
      </div>}

      {showCart && <Carts />}

      <div>
        <Routers />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
