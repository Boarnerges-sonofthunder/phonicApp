import React, { useEffect, useState } from "react";
import "../../Styles/profile.css";
import { useAuth } from "../Firebase/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await currentUser.getIdToken(true);
        //console.log(token);
        const response = await axios.get("http://localhost:5000/backend/user", {
          headers: {
            authorization: `Bearer ${token}`,
            AccessControlAllowOrigin: "Allow",
          },
        });
        //console.log(response.data);
        if (response.data) {
          setUser(response.data);
          setLoadingUser(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, []);

  return (
    <>
      <main>
        {loadingUser ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <h1>Profile</h1>
            <section>
              <div className="setting">
                <h3>Bonjour, {currentUser.displayName}</h3>
                <div className="icon-gear">
                  <Link to="setting" className="setting-icon">
                  <FontAwesomeIcon icon={faGear} />
                </Link>
                </div>
                
              </div>
            </section>

            <section className="section-infos">
              <h3>Vos informations:</h3>
              <div className="infos">
                <span>Nom: {currentUser.displayName}</span>
                <span>Email: {currentUser.email}</span>
              </div>
              <div className="boutton-nav">
                <Link to="/panier" className="link">
                  <FontAwesomeIcon icon={faShoppingCart} className="icon" />
                  <p>Panier</p>
                </Link>
              </div>
            </section>
          </div>
        )}
      </main>
    </>
  );
};

export default Profile;
