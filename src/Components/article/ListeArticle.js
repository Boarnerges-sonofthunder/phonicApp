import React, { useEffect, useState } from "react";
import "../../Styles/ListeArticle.css";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ListeArticle = ({ articles, searchTerm }) => {
  const [pageNumber, setPageNumber] = useState(0); //un state qui indique dans quel page nous sommes
  const articleParPage = 5; //nombre d'article par page
  const pageVisite = pageNumber * articleParPage; //nombre de page visité
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const pageCount = Math.ceil(articles.length / articleParPage); //nombre de page total

  //On affiche le nombre d'article voulue par page
  const afficherArticle = articles
    .filter((product) => {
      if (searchTerm === "") {
        return product;
      } else if (
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return product;
      } else {
        return null;
      }
    })
    .slice(pageVisite, pageVisite + articleParPage)
    .map((product) => {
      return (
        <div className="article-case" key={product._id}>
          <div className="article-img">
            <Link to={`/presentationArticle/${product._id}`} className="link">
              <img src={product.image1} alt="article" />
            </Link>
          </div>
          
          <div className="article-info">
            <h3>{product.name}</h3>
            <span className="description">{product.description[4]}</span>
            <h4>{product.prix}$</h4>
            <Link
              to={`/catalogue/editionArticle/${product._id}`}
              className="link"
            >
              Modifier
            </Link>
          </div>
        </div>
      );
    });

  return (
    <>
      <section className="section-catalogue">
        {afficherArticle}
        <ReactPaginate
          previousLabel={"Précédent"}
          nextLabel={"Suivant"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </section>
    </>
  );
};

export default ListeArticle;
