import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faX } from "@fortawesome/free-solid-svg-icons";
import { usePanier } from "../Context/PanierContext";
import Modal from "../Modal/Modal";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPanier = ({ product, cartProductIncrease, cartProductDecrease }) => {
  const { deleteArticle, getPanier, panier, deletePanierCollection } = usePanier();
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Supprimer");
  const [modalContent, setModalContent] = useState(
    "Voulez-vous vraiment supprimer cet article ?"
  );

  function handleCartProductIncrease() {
    cartProductIncrease(product);
  }

  function handleCartProductDecrease() {
    cartProductDecrease(product);
  }

  function handleCartProductDelete() {
    const handleDelete = async () => {
      await deleteArticle(product._id);
      getPanier();
    };
    return handleDelete();
  }

  return (
    <>
      <div className="article-case" key={product._id}>
        <div className="article-img">
          <Link to={`/presentationArticle/${product._id}`}>
            <img src={product.image1} alt={product.name} />
          </Link>
        </div>
        <div className="article-info-panier">
          <div className="nom-prix">
            <h3>{product.name}</h3>
            <h4>{product.prix}$</h4>
          </div>

          <div className="quantity-box">
            <span
              className="action-btns minus"
              onClick={handleCartProductDecrease}
            >
              -
            </span>
            <div className="num">{product.quantite}</div>
            <span
              className="action-btns plus"
              onClick={handleCartProductIncrease}
            >
              +
            </span>
          </div>
          <div className="delete-button">
            <div className="btn-grand-ecran">
              <a
                className="noselect"
                onClick={() => setOpenModal(true)}
                href="#popup1"
              >
                <span className="text">Supprimer</span>
                <span className="icon">
                  <FontAwesomeIcon icon={faX} className="icon-x" />
                </span>
              </a>
            </div>

            <div className="btn-petit-ecran">
              <a
                className="button"
                onClick={() => setOpenModal(true)}
                href="#popup1"
              >
                <FontAwesomeIcon icon={faTrashCan} className="iconTrash" />
              </a>
            </div>

            {openModal && (
              <Modal
                closeModal={setOpenModal}
                handleSubmit={handleCartProductDelete}
                modalTitle={modalTitle}
                modalContent={modalContent}
              />
            )}
          </div>
        </div>
        <ToastContainer transition={Flip} limit={2} />
      </div>
    </>
  );
};

export default UserPanier;
