import React, { useEffect, useState } from "react";
import "../../Styles/presentationArticle.css";
import { useParams } from "react-router-dom";
import { Pagination, Navigation, FreeMode, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAuth } from "../Firebase/AuthContext";
import { RelatedProducts } from "@algolia/recommend-react";
import algoliarecommend from "@algolia/recommend";
import { Link } from "react-router-dom";
import { useArticle } from "../Context/ArticleContext";
import { usePanier } from "../Context/PanierContext";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PresentationArticle = () => {
  const { currentUser } = useAuth();
  const { articleId } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const {
    getArticles,
    articles,
    getArticle,
    descriptions,
    images,
    currentArticle,
  } = useArticle();
  const { addPanier, getPanier, panier, updateArticlePanier, addQuantite } =
    usePanier();

  //const recommendClient = algoliarecommend("3LXZMKPEZR", "737d4620869e9197bb00c6c548b67fef");

  useEffect(() => {
    getArticles();
    getArticle(articleId);
  }, []);

  const checkPanier = async () => {
    // Use a Map to store the products in the panier
    const panierMap = new Map(panier.map((item) => [item._id, item]));
    const product = panierMap.get(articleId);
    if (product) {
      // Increment the quantite and update the total
      product.quantite += 1;
      product.total = product.quantite * product.prix;
      addPanier(product);
      getPanier();
    } else {
      addToCart();
    }
  };

  const addToCart = async () => {
    const product = { ...currentArticle };
    product.quantite = 1;
    product.total = product.quantite * product.prix;
    addPanier(product);
    getPanier();
  };

  //Fontion pour afficher les articles recommandés
  const recommend = articles
    .filter(
      (article) =>
        article.marque === currentArticle.marque ||
        article.prix <= currentArticle.prix
    )
    .map((product) => {
      return (
        <SwiperSlide className="swiper-slide" key={product._id}>
          <Link
            to={`/presentationArticle/${product._id}`}
            className="link-phone"
          >
            <span>{product.name}</span>
            <img src={product.image1} alt="article" />
            <h4>{product.prix}$</h4>
          </Link>
        </SwiperSlide>
      );
    });

  return (
    <>
      <main>
        <div className="visuel-article">
          <section className="sectionDetailsArticle">
            <div className="caseImage">
              <div>
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  navigation
                  spaceBetween={50}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  modules={[Pagination, Navigation, FreeMode, Thumbs]}
                  slidesPerView={1}
                  className="topSwiper"
                >
                  {images.map((image) => (
                    <SwiperSlide className="slideTopImage" key={image}>
                      <img src={image} alt="img" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="bottomSwiper"
                >
                  {images.map((image) => (
                    <SwiperSlide className="slideBottomImage" key={image}>
                      <img src={image} alt="img" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>

          <section className="sectionInfos">
            <div className="infos">
              <h2>{currentArticle.name}</h2>
              <span>Marque: {currentArticle.marque}</span>
              <span>Modèle: {currentArticle.modele}</span>
              <h3>{currentArticle.prix}$</h3>
              <div className="boutton-ajout">
                {/* {panier.find((item) => item._id === articleId) ? (
                  <button type="button" disabled>Article dans votre panier</button>
                ) : ( */}
                <button type="button" onClick={checkPanier}>
                  Ajouter au panier
                </button>
                {/* )} */}
              </div>
            </div>
          </section>
        </div>

        <section className="sectionRecommendation">
          <div className="articleRecommande">
            <h2>Article recommendé pour vous</h2>
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
              className="swiperArticleRecommande"
            >
              {recommend}
            </Swiper>
          </div>
        </section>

        <section className="sectionDescriptions">
          <div className="description">
            <h3>Description de l'article:</h3>
            <ul>
              {descriptions.map((desc) => (
                <li key={desc}>{desc}</li>
              ))}
            </ul>
          </div>
        </section>
        <ToastContainer transition={Flip} limit={2} />
      </main>
    </>
  );
};

export default PresentationArticle;
