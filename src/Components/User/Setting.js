import React, { useState, useRef, useEffect } from "react";
import "../../Styles/setting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faUser,
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Firebase/AuthContext";
import axios from "axios";

const Setting = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const { currentUser, updateEmail, updatePassword, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //console.log(currentUser);
  const handleClick = () => {
    navigate(-1);
  };

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

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Les mots de passe ne correspondent pas");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (usernameRef.current.value !== currentUser.displayName) {
      promises.push(updateProfile(usernameRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate(-1);
      })
      .catch(() => {
        setError("Impossible de mettre à jour le profil");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <section className="section-parametre">
        <div className="sous-titre-param">
          <Link onClick={handleClick}>
            <FontAwesomeIcon icon={faCaretLeft} />
          </Link>
          <span>Paramètres</span>
        </div>

        <span>Vous pouvez modifier vos informations personnelles ici.</span>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              id="name"
              placeholder="Entrez votre nom"
              ref={usernameRef}
              defaultValue={currentUser.displayName}
            />
            <i className="icon">
              <FontAwesomeIcon icon={faUser} />
            </i>
          </div>
          <div className="input-field">
            <input
              type="email"
              id="email"
              placeholder="Entrez votre mail"
              ref={emailRef}
              defaultValue={currentUser.email}
            />
            <i className="icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </i>
          </div>
          <div className="input-field">
            <input
              type={type}
              id="password"
              placeholder="Mot de passe"
              ref={passwordRef}
            />
            <i>
              <FontAwesomeIcon icon={faLock} />
            </i>
            <i className="showHidePw" onClick={handleToggle}>
              <FontAwesomeIcon icon={icon} />
            </i>
          </div>
          <div className="input-field">
            <input
              type={type}
              id="password-confirme"
              placeholder="Confirmez votre mot de passe"
              ref={passwordConfirmRef}
            />
            <i>
              <FontAwesomeIcon icon={faLock} />
            </i>
            <i className="showHidePw">
              <FontAwesomeIcon icon={icon} />
            </i>
          </div>
          <div className="submit-button">
            <button type="submit" disabled={loading}>
              Modifier
            </button>
          </div>
          <div className="cancel-button">
            <Link to="/monprofile" className="link">
              Annuler
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default Setting;
