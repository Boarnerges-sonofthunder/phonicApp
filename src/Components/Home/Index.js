import React, { useEffect, useState } from "react";
import "../../Styles/index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useAuth } from "../Firebase/AuthContext";

const Index = () => {
  const [articles, setArticles] = useState([]);
  const [singleArticle, setSingleArticle] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    getArticles();
    getOneArticle();
    getUserInfosForTidio();
  }, []);

  const getUserInfosForTidio = () => {
    if (currentUser) {
      document.tidioIdentify = {
        name: currentUser.displayName,
        email: currentUser.email,
        distinct_id: currentUser.uid,
      };
    } else {
      return;
    }
  };

  const getArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/backend/article");
      //console.log(response.data);
      if (response.data) {
        setArticles(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getOneArticle = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/backend/article/63864414af22b9f1eb3e0dc7"
      );
      //console.log(response.data);
      if (response.data) {
        setSingleArticle(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <main>
        <section className="section-index">
          <div className="titre">
            <h3>
              Découvrez une éventaile de téléphone intelligent à votre goût
            </h3>
            <Link className="link" to="catalogue">
              Magasiner
              <FontAwesomeIcon className="caret" icon={faCaretRight} />
            </Link>
            <img
              src="https://cdn.dxomark.com/wp-content/uploads/medias/post-90166/MicrosoftTeams-image-7.jpg"
              alt="img-index"
            />
          </div>
        </section>

        <section className="section-index">
          <div className="nouveauArticle">
            <h4>Notre dernière nouveauté</h4>
            <span>{singleArticle.name}</span>
            <Link to={`/presentationArticle/${singleArticle._id}`} className="link">
              <img src={singleArticle.image1} alt="phone" />
            </Link>
          </div>
        </section>

        <section className="section-index">
          <div className="articlePhare">
            <h4>Les vedettes</h4>
            <Swiper
              slidesPerView={3}
              breakpoints={{
                640: { slidesPerView: 4, spaceBetween: 25 },
                768: { slidesPerView: 5, spaceBetween: 40 },
                1024: { slidesPerView: 6, spaceBetween: 50 },
              }}
              spaceBetween={25}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="swiperArticlePhare"
            >
              {articles
                .map((product) => (
                  <SwiperSlide className="swiper-slide" key={product._id}>
                    <Link
                      to={`/presentationArticle/${product._id}`}
                      className="link-phone"
                    >
                      <span>{product.name}</span>
                      <img src={product.image1} alt="phone" />
                    </Link>
                  </SwiperSlide>
                ))
                .slice(5, 11)}
            </Swiper>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
