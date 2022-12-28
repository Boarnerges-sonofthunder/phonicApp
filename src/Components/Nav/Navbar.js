import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Navbar.css";
import logo from "../../images/phonic-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faShoppingCart,
  faXmark,
  faBarsStaggered,
  faMobilePhone,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "../User/LogoutButton";
import LoginButton from "../User/LoginButton";
import { useAuth } from "../Firebase/AuthContext";
import { usePanier } from "../Context/PanierContext";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { currentUser } = useAuth();
  const { getPanier, totalProducts, panier } = usePanier();

  useEffect(() => {
    getPanier();
  }, []);

  let domNode = useClickOutside(() => {
    closeMobileMenu();
  });

  return (
    <>
      <nav>
        <Link to="/" className="navbar-logo">
          <img src={logo} className="imgLogo" alt="logo" />
        </Link>
        <div>
          <ul className={click ? "nav-menu active" : "nav-menu"} ref={domNode}>
            <li>
              <Link to="/" className="nav-item" onClick={closeMobileMenu}>
                <div className="icon-item">
                  <FontAwesomeIcon icon={faHome} className="icon" />
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="catalogue"
                className="nav-item"
                onClick={closeMobileMenu}
              >
                <div className="icon-item">
                  <FontAwesomeIcon icon={faMobilePhone} className="icon" />
                  <span>Magasiner</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="monprofile"
                className="nav-item"
                onClick={closeMobileMenu}
              >
                <div className="icon-item">
                  <FontAwesomeIcon icon={faUser} className="icon" />
                  <span>Mon profile</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="panier" className="nav-item" onClick={closeMobileMenu}>
                <div className="icon-item">
                  <FontAwesomeIcon icon={faShoppingCart} className="icon" />
                  <span>Panier</span>
                  <p className="cart-count">{totalProducts}</p>
                </div>
              </Link>
            </li>
            {currentUser ? <LogoutButton /> : <LoginButton />}
          </ul>
        </div>
        <div className="menu-icon" onClick={handleClick}>
          <i>
            {click ? (
              <FontAwesomeIcon icon={faXmark} />
            ) : (
              <FontAwesomeIcon icon={faBarsStaggered} />
            )}
          </i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
