import express from "express";
import authenticate from "./authenticate.mjs";
import firebaseAdmin from "./firebase-config.mjs";

const router = express.Router();

//Get user
router.get("/", authenticate, async (req, res) => {
  res.status(200).json(req.user);
  //console.log(req.headers);
});

//sign up route
router.post("/", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res
      .status(400)
      .json({
        message:
          "Invalid request body. Must contain email, password, and name for user.",
      });
  }

  try {
    const newFirebaseUser = await firebaseAdmin.auth.createUser({
      email,
      password,
      displayName: name,
    });

    if (newFirebaseUser) {
      const userCollection = req.app.locals.db.collection("users");
      await userCollection.insertOne({
        email,
        name,
        firebaseId: newFirebaseUser.uid,
      });
    }

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
