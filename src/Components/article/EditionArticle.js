import React, { useState, useEffect, useRef } from "react";
import "../../Styles/EditionArticle.css";
import { useParams, useNavigate } from "react-router-dom";
import { useArticle } from "../Context/ArticleContext";
import { usePanier } from "../Context/PanierContext";
import Modal from "../Modal/Modal";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditionArticle = () => {
  const { articleId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const nameRef = useRef();
  const marqueRef = useRef();
  const modelelRef = useRef();
  const prixRef = useRef();
  const { getArticle, currentArticle, updateArticleBd, getArticles } =
    useArticle();
  const { updateArticlePanier } = usePanier();
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Modifier");
  const [modalContent, setModalContent] = useState(
    "Voulez-vous vraiment modifier cet article ?"
  );

  useEffect(() => {
    getArticle(articleId);
  }, []);

  useEffect(() => {
    getArticles();
  }, [currentArticle]);

  // const openModalBox = () => {
  //   setOpenModal(true);
  //   console.log("open");
  // };

  async function handleSubmit(e) {
    setLoading(true);
    updateArticleBd(
      articleId,
      nameRef.current.value,
      marqueRef.current.value,
      modelelRef.current.value,
      prixRef.current.value
    );
    navigate(-1);

    // let product = currentArticle
    // product ={
    //   _id: product._id,
    //   name: product.name,
    //   marque: product.marque,
    //   modele: product.modele,
    //   prix: product.prix,
    // }

    //updateArticlePanier( articleId, product)
    setLoading(false);
  }

  return (
    <>
      <main>
        <section className="sectionEditionArticle">
          <span>Vous pouvez modifier les informations de l'article ici.</span>
          <div className="caseArticle">
            <img src={currentArticle.image1} alt="article" />
            <form onSubmit={handleSubmit}>
              <span>Nom:</span>
              <div className="input-field">
                <input
                  type="text"
                  id="name"
                  placeholder="Entrez le nom de l'article"
                  ref={nameRef}
                  defaultValue={currentArticle.name}
                />
              </div>
              <span>Marque:</span>
              <div className="input-field">
                <input
                  type="text"
                  id="marque"
                  placeholder="Entrez la marque de l'article"
                  ref={marqueRef}
                  defaultValue={currentArticle.marque}
                />
              </div>
              <span>Modèle:</span>
              <div className="input-field">
                <input
                  type="text"
                  id="modele"
                  placeholder="Entrez le modèle de l'article"
                  ref={modelelRef}
                  defaultValue={currentArticle.modele}
                />
              </div>
              <span>Prix:</span>
              <div className="input-field">
                <input
                  type="text"
                  id="prix"
                  placeholder="Entrez le prix de l'article"
                  ref={prixRef}
                  defaultValue={currentArticle.prix}
                />
              </div>
            </form>
          </div>
          <div className="btn-Modal">
            <a
              className="button"
              onClick={() => setOpenModal(true)}
              href="#popup1"
              disabled={loading}
            >
              Enregistrer
            </a>
          </div>
          {openModal && (
            <Modal
              closeModal={setOpenModal}
              handleSubmit={handleSubmit}
              modalTitle={modalTitle}
              modalContent={modalContent}
            />
          )}
        </section>
        <ToastContainer transition={Flip} limit={2}/>
      </main>
    </>
  );
};

export default EditionArticle;
