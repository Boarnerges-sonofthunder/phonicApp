import React, {useEffect, useState } from "react";
import ListeArticle from "./ListeArticle";
import SearchBar from "../Nav/SearchBar";
import axios from "axios";

const Catalogue = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/backend/article"
        );
        //console.log(response.data);
        if (response.data) {
          setArticles(response.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getArticles();
  }, []);
  
  return (
    <>
      <main className="main-cataloque">
        <SearchBar articles={articles} setSearchTerm={setSearchTerm} />
        <ListeArticle articles={articles} searchTerm={searchTerm} />
      </main>
    </>
  );
};

export default Catalogue;
