import express from "express";
import Stripe from "stripe";
import {v4 as uuidv4, v4} from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  let error;
  let status;

  try{
    const {panier, token} = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })
    const key = uuidv4();
    const charge = await stripe.charges.create({
      amount: panier.totalPrice * 100,
      currency: "usd",
      customer: customer.id,
      description: panier.name,
      receipt_email: token.email,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip
        }
      }
    }, {idempotencyKey: key})
    status = "success";
  }catch(error){
    console.log(error);
    status = "failure";
  }
  res.json({status});
});

export default router;
