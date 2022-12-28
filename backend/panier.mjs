import express from "express";
import firebaseAdmin from "./firebase-config.mjs";
import authenticate from "./authenticate.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

//Create document
router.post("/", async (req, res) => {

  if (
    !req.body.headers.uid ||
    typeof req.body.headers.uid !== "string" ||
    req.body.headers.uid.length > 128
  ) {
    return res.status(400).send({ error: "Invalid UID" });
  }
  
  const collection = `panier ${req.body.headers.name} ${req.body.headers.uid}`;
  const article = await req.app.locals.db
    .collection(collection)
    .insertOne(req.body.product);
  res.status(201).json(article);
});

//Get all documents
router.get("/", async (req, res) => {
  if (
    !req.headers.uid ||
    typeof req.headers.uid !== "string" ||
    req.headers.uid.length > 128
  ) {
    return res.status(400).send({ error: "Invalid UID" });
  }
  
  const collection = `panier ${req.headers.name} ${req.headers.uid}`;
  const resultArray = [];
  const article = await req.app.locals.db.collection(collection).find();
  await article.forEach((doc) => {
    resultArray.push(doc);
  });

  if (resultArray.length === 0) {
    return res.status(404).json({ message: "Aucun article trouvé" });
  }
  res.status(200).json(resultArray);
});

//delete document
router.delete("/:id", async (req, res) => {
  if (
    !req.headers.uid ||
    typeof req.headers.uid !== "string" ||
    req.headers.uid.length > 128
  ) {
    return res.status(400).send({ error: "Invalid UID" });
  }
  
  const collection = `panier ${req.headers.name} ${req.headers.uid}`;
  const article = await req.app.locals.db
    .collection(collection)
    .deleteOne({ _id: req.params.id });
  res.status(200).json(article);
});


//delete collection
router.delete("/", async (req, res) => {
  if (
    !req.headers.uid ||
    typeof req.headers.uid !== "string" ||
    req.headers.uid.length > 128
  ) {
    return res.status(400).send({ error: "Invalid UID" });
  }
  
  try {
    const collection = `panier ${req.headers.name} ${req.headers.uid}`;
    const article = await req.app.locals.db.collection(collection).drop();
    res.status(200).json(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update document
router.put("/:id", async (req, res) => {
  if (
    !req.headers.uid ||
    typeof req.headers.uid !== "string" ||
    req.headers.uid.length > 128
  ) {
    return res.status(400).send({ error: "Invalid UID" });
  }

  const collection = `panier ${req.headers.name} ${req.headers.uid}`;
  const article = await req.app.locals.db
    .collection(collection)
    .updateOne({ _id: req.params.id }, {  $set: req.body });
  res.status(200).json(article);
});

export default router;
