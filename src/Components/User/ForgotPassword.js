import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../Firebase/AuthContext";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Vérifiez votre boîte de réception pour les instructions");
    } catch (error) {
      console.log(error);
      setError("Réinitialisation échouée. Vérifiez votre adresse email");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="parent-div">
        <div className="forms">
          <div className="form login">
            <p className={"errormsg"} aria-live="assertive">
              {error}
            </p>
            <p className="" aria-live="assertive">
              {message}
            </p>
            <span className="title">Réinitialiser le mot de passe</span>
            <p>
              Indiquez votre email pour recevoir un lien de réinitialisation.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  required
                />
                <i className="icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>
              </div>
              <div className="input-field button">
                <button type="submit" disabled={loading}>
                  Soumettre
                </button>
              </div>
              <div className="login-signup">
                <span className="text">
                  <Link to="/login" className="text signup-text">
                    Se connecter
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
