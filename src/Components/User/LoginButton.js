import React from "react";
import "../../Styles/loginButton.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const LoginButton = () => {
  return (
    <>
      <button className="log-in">
        <Link to="/login" className="login-button">
          <FontAwesomeIcon icon={faRightFromBracket} />Se connecter
        </Link>
      </button>
    </>
  );
};

export default LoginButton;
