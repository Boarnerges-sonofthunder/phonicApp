import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

//Get all articles
router.get("/", async (req, res) => {
  const resultArray = [];
  const article = await req.app.locals.db.collection("articles").find();
  await article.forEach((doc) => {
    resultArray.push(doc);
  });

  if (resultArray.length === 0) {
    return res.status(404).json({ message: "Aucun article trouvé" });
  }
  res.status(200).json(resultArray);
});

//Get one article
router.get("/:id", async (req, res) => {
  const articleId = req.params.id;
  //console.log(articleId);
  const article = await req.app.locals.db
    .collection("articles")
    .findOne({ _id: ObjectId(articleId) });

  if (!article) {
    return res.status(404).json({ message: "Article non trouvé" });
  }
  res.status(200).json(article);
});

//Update one article
router.put("/:id", async (req, res) => {
  const articleId = req.params.id;
  const article = await req.app.locals.db
    .collection("articles")
    .findOne({ _id: ObjectId(articleId) });
  if (!article) {
    return res.status(404).json({ message: "Article non trouvé" });
  }
  const updatedArticle = await req.app.locals.db
    .collection("articles")
    .updateOne(
      { _id: ObjectId(articleId) },
      {
        $set: {
          name: req.body.name,
          marque: req.body.marque,
          modele: req.body.modele,
          prix: req.body.prix,
        },
      }
    );
  res.status(200).json(updatedArticle);
});

export default router;
