import React from "react";
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { usePanier } from "../Context/PanierContext";

const SommairePrixPanier = ({ cartProducts }) => {
  const navigate = useNavigate();
  const { deletePanierCollection } = usePanier();

  //const stripePbKey = loadStripe(process.env.REACT_APP_STRIPE_KEY);

  //Calcule le nombre de produits dans le panier
  const qty = cartProducts.map((product) => {
    return product.quantity;
  });
  const reducerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;
  const totalQty = qty.reduce(reducerOfQty, 0);
  //console.log(totalQty);

  //Calcule le prix total du panier
  const price = cartProducts.map((product) => {
    return product.total;
  });
  const reducerOfPrice = (accumulator, currentValue) =>
    accumulator + currentValue;
  const totalPrice = price.reduce(reducerOfPrice, 0);
  //console.log(totalPrice);

  //chargement du paiement
  const handleToken = async (token) => {
    //console.log(token);
    const panier = { name: "Achat de produits", totalPrice };

    const response = await axios.post(
      "http://localhost:5000/backend/checkout",
      {
        token,
        panier,
      }
    );
    //console.log(response);
    let { status } = response.data;
    console.log("Status:", status);
    if (status === "success") {
      navigate("/");

      //delete la collection du panier de l'utilisateur
      deletePanierCollection();
      
    } else {
      console.log("Erreur de paiement");
    }
  };

  return (
    <>
      <section className="section-sommaire">
        <div className="sommaire-prix">
          <div className="prix-pan">
            <div>Sous-Total</div>
            <span>${totalPrice}</span>
          </div>
          <div className="btn-pass-com">
            <StripeCheckout
              stripeKey="pk_test_51MCbSuItG9cEy4PLdj1ASBeq6pZRhql6Sw7NxUE7Vyfd0hCwx9QExdqzV8WQn0ZtoqCTDe1P59UrBovrR5NObLrR00Xo34LBDq"
              token={handleToken}
              billingAddress
              shippingAddress
              name="Achat de produits"
              amount={totalPrice * 100}
              className="link"
            ></StripeCheckout>
          </div>
        </div>
      </section>
    </>
  );
};

export default SommairePrixPanier;
