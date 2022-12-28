import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import PasswordToggle from "./PasswordToggle";
import { Link, useNavigate } from "react-router-dom";
import { AuthErrorCodes } from "firebase/auth";
import axios from "axios";

const Register = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  const [passwordRef, setPasswordRef] = useState("");
  const emailRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(faEye);
    } else {
      setType("password");
      setIcon(faEyeSlash);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef !== passwordConfirmRef.current.value) {
      return setError("Les mots de passe ne correspondent pas");
    }

    try {
      setError("");
      setLoading(true);
      const req = await axios.post("http://localhost:5000/backend/user", {
        email: emailRef.current.value,
        name: usernameRef.current.value,
        password: passwordRef,
      });
      //const message = req.data.success
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      if (error.code === AuthErrorCodes.EMAIL_ALREADY_IN_USE) {
        setError("Cette adresse mail est déjà utilisée");
      }
      if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError("Le mot de passe doit contenir au moins 6 caractères");
      }
      if (error.code === AuthErrorCodes.INVALID_EMAIL) {
        setError("L'adresse mail n'est pas valide");
      }
      if (error.message === "Network Error" && !error.response) {
        setError("Erreur de connexion au serveur");
      } else {
        setError("Inscription échouée");
        console.log(error.message);
      }
    }
    setLoading(false);
  }
  return (
    <>
      <div className="parent-div">
        <div className="form login">
          <p className={"errormsg"} aria-live="assertive">
            {error}
          </p>
          <span className="title">Inscription</span>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                id="name"
                placeholder="Entrez votre nom"
                ref={usernameRef}
                required
              />
              <i className="icon">
                <FontAwesomeIcon icon={faUser} />
              </i>
            </div>
            <div className="input-field">
              <input
                type="email"
                id="email"
                placeholder="Entrez votre email"
                ref={emailRef}
                required
              />
              <i className="icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
            </div>
            <PasswordToggle password={setPasswordRef} />
            <div className="input-field">
              <input
                type={type}
                className="password"
                id="password-confirm"
                placeholder="Confirmer votre mot de passe"
                ref={passwordConfirmRef}
                required
              />
              <i className="icon">
                <FontAwesomeIcon icon={faLock} />
              </i>
              <i className="showHidePw" onClick={handleToggle}>
                <FontAwesomeIcon icon={icon} />
              </i>
            </div>

            <div className="input-field button">
              <button type="submit" disabled={loading}>
                Enregistrer
              </button>
            </div>
            <div className="login-signup">
              <span className="text">
                Vous possedez déjà un compte?{" "}
                <Link to="/login" className="text signup-text">
                  Se connecter
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
