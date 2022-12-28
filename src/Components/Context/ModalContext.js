import React, { useContext, useState } from "react";

const MondalContext = React.createContext();

export const useModal = () => useContext(MondalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
    console.log("open");
  };

  const closeModal = () => {
    setModal(false);
  };

  const value = {
    modal,
    openModal,
    closeModal,
  };
  return (
    <MondalContext.Provider value={value}>{children}</MondalContext.Provider>
  );
};
