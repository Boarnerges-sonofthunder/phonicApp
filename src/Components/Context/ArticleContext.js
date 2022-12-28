import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const ArticleContext = React.createContext();

export const useArticle = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [images, setImages] = useState([]);

  //fonction pour recuperer tous les articles de la base de données
  const getArticles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/backend/article");
      setArticles(res.data);
      //console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  //fonction pour recuperer un article de la base de données
  const getArticle = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/backend/article/${id}`
      );
      setCurrentArticle(res.data);
      setDescriptions(res.data.description);
      setImages(res.data.images);
      //console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  //fonction pour update un article dans la base de donnée
  const updateArticleBd = async (id, name, marque, modele, prix) => {
    
    try {
      const res = await axios.put(
        `http://localhost:5000/backend/article/${id}`,{
          name: name,
          marque: marque,
          modele: modele,
          prix: parseInt(prix),
        }
      );
      if(res.data){
        toast.success("Article modifié", {
          toastId: "success1",
          autoClose: 2000,
        })
      }
      //console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const value = {
    articles,
    currentArticle,
    descriptions,
    images,
    getArticles,
    getArticle,
    updateArticleBd,
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};
