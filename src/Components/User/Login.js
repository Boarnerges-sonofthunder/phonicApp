import React, { useState, useRef } from "react";
import "../../Styles/login-register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Firebase/AuthContext";
import PasswordToggle from "./PasswordToggle";
import axios from "axios";

const Login = () => {
  const { currentUser, login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const [passwordRef, setPasswordRef] = useState("");
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
        setError("");
        setLoading(true);
        await login(emailRef.current.value, passwordRef);
        const token = await currentUser.getIdToken(true);
        const response = await axios.get("http://localhost:5000/backend/user", {
          headers: {
            authorization: `Bearer ${token}`,
            AccessControlAllowOrigin: "Allow",
          },
        });
        //console.log(response.data);
        
        setUser(response.data);
        navigate("/");
      } catch (error) {
        console.log(error);
        setError("Mot de passe ou email incorrect☹️");
      }
  
      setLoading(false);
  }

  return (
    <>
      <div className="parent-div">
        <div className="forms">
          {/* Formulaire de connexion */}
          <div className="form login">
            <p className={"errormsg"} aria-live="assertive">
              {error}
            </p>
            <span className="title">Login</span>
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
              <PasswordToggle password={setPasswordRef} />
              <div className="checkbox-text">
                <div className="checkbox-content">
                  <input type="checkbox" id="logCheck" />
                  <label htmlFor="logCheck" className="text">
                    Se souvenir de moi
                  </label>
                </div>

                <Link to="/motDePasseOubliee" className="text">
                  Mot de passe oublié?
                </Link>
              </div>
              <div className="input-field button">
                <button type="submit" disabled={loading}>
                  Se connecter
                </button>
              </div>
              <div className="login-signup">
                <span className="text">
                  Vous n'avez pas de compte?{" "}
                  <Link to="register" className="text signup-text">
                    S'inscrire
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

export default Login;
