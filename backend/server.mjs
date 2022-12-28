import db from "./db.mjs";
import userRouter from "./user.mjs";
import articleRouter from "./article.mjs";
import panierRouter from "./panier.mjs";
import express from "express";
import cors from "cors";
import stripeRouter from "./stripe.mjs";

const app = express();
const port = process.env.PORT || 5000;
db("mongodb://127.0.0.1:27017/", app)

app.use(cors({ origin: true }));
app.use(express.json())
app.use("/backend/user", userRouter);
app.use("/backend/article", articleRouter);
app.use("/backend/panier", panierRouter);
app.use("/backend/checkout", stripeRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
