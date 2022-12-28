import React from "react";
import "../../Styles/Modal.css";

const Modal = ({ closeModal, handleSubmit, modalTitle, modalContent }) => {
  

  return (
    <div id="popup1" className="overlay">
      <div className="popup">
        <h2>{modalTitle}</h2>
        <a className="close" href="#" onClick={() => closeModal(false)}>
          &times;
        </a>
        <div className="content">
          <p>{modalContent}</p>
        </div>
        <div className="btns-action">
          <button className="modal__btn" onClick={() => closeModal(false)}>
            Annuler
          </button>
          <button type="submit" onClick={(e) => handleSubmit(e.preventDefault())}>Oui</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
