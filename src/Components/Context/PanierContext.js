import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Firebase/AuthContext";

const PanierContext = React.createContext();

export const usePanier = () => useContext(PanierContext);

export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);
  const [productQuantity, setProductQuantity] = useState();
  const [totalProducts, setTotalProducts] = useState(0);
  const { currentUser } = useAuth();

  //const userUid = currentUser.uid;

  //fonction pour recuperer les articles dans le panier
  const getPanier = async () => {
    try {
      const res = await axios.get("http://localhost:5000/backend/panier", {
        headers: {
          uid: currentUser.uid,
          name: currentUser.displayName,
        },
      });
      //console.log(res.data);
      setPanier(res.data);
      setTotalProducts(res.data.length);
    } catch (err) {
      console.log(err.message);
    }
  };

  //fonction pour effacer un article dans le panier
  const deleteArticle = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/backend/panier/${id}`,
        {
          headers: {
            uid: currentUser.uid,
            name: currentUser.displayName,
          },
        }
      );
      if (res.data) {
        toast.success("Article supprimé du panier", {
          toastId: "success1",
          autoClose: 2000,
        });
      }
      //console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  //fonction pour ajouter un article dans le panier
  const addPanier = async (product) => {
    const token = await currentUser.getIdToken(true);
    try {
      const res = await axios.post("http://localhost:5000/backend/panier/", {
        product,
        headers: {
          uid: currentUser.uid,
          name: currentUser.displayName,
        },
      });
      if (res.data) {
        setPanier(res.data);
        toast.success("Article ajouté au panier", {
          toastId: "success1",
          autoClose: 2000,
        });
      } else {
        console.log(
          "Vous devez être connecté pour ajouter un article au panier"
        );
      }
      //console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  //fonction pour delete la collection du panier de l'utilisateur
  const deletePanierCollection = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/backend/panier`,{
        headers: {
          uid: currentUser.uid,
          name: currentUser.displayName,
        }
      });
      //console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  //update article panier
  const updateArticleQuantite = async (id, product) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/backend/panier/${id}`,
        product,
        {
          headers: {
            uid: currentUser.uid,
            name: currentUser.displayName,
          },
        }
      );
      const qty = panier.map((item) => {
        return item.quantite;
      });
      setProductQuantity(qty);
      //console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const value = {
    panier,
    productQuantity,
    totalProducts,
    updateArticleQuantite,
    getPanier,
    deleteArticle,
    addPanier,
    deletePanierCollection,
  };

  return (
    <PanierContext.Provider value={value}>{children}</PanierContext.Provider>
  );
};
