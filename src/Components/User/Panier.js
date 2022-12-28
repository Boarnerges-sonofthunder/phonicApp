import React, { useEffect } from "react";
import "../../Styles/panier.css";
import ListeArticlePanier from "./ListeArticlePanier";
import SommairePrixPanier from "./SommairePrixPanier";
import { usePanier } from "../Context/PanierContext";
import { useArticle } from "../Context/ArticleContext";

const Panier = () => {
  const { getPanier, panier, updateArticleQuantite, productQuantity } = usePanier();
  const { updateArticle } = useArticle();

  useEffect(() => {
    getPanier();
  }, []);

  //Diminue la quantité de l'article dans le panier
  let Product;
  const cartProductDecrease = (cartProduct) => {
    Product = cartProduct;

    if (Product.quantite > 1) {
      Product["quantite"] = Product.quantite - 1;
      Product["total"] = Product.quantite * Product.prix;
      Product = {
        _id: Product._id,
        quantite: Product.quantite,
        total: Product.quantite * Product.prix,
      };
      updateArticleQuantite(Product._id, Product);
    }
  };

  //Augmente la quantité de l'article dans le panier
  const cartProductIncrease = (cartProduct) => {
    Product = cartProduct;
    Product["quantite"] = Product.quantite + 1;
    Product["total"] = Product.quantite * Product.prix;
    Product = {
      _id: Product._id,
      quantite: Product.quantite,
      total: Product.quantite * Product.prix,
    };
    updateArticleQuantite(Product._id, Product);
  };

  return (
    <>
      <main className="main-panier">
        {panier.length > 0 && (
          <div>
            <section className="sectionPanier">
              <ListeArticlePanier
                cartProducts={panier}
                cartProductDecrease={cartProductDecrease}
                cartProductIncrease={cartProductIncrease}
              />
            </section>

            <section className="section-sommaire">
              <SommairePrixPanier cartProducts={panier} />
            </section>
          </div>
        )}

        {panier.length < 1 && (
          <div className="container-fluid">
            Vous n'avez pas d'article dans votre panier.{" "}
          </div>
        )}
      </main>
    </>
  );
};

export default Panier;
