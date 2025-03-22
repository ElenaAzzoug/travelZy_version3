const User = require("../models/userModel"); // Assure-toi que le chemin est correct

const express = require("express");
const { createUser, getUserInfo, updateUser, deleteUser } = require("../services/userService");

const router = express.Router();

// Route pour créer un compte
router.post("/register", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour récupérer les informations du compte (avec email + password)
router.post("/me", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await getUserInfo(email, password);
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour mettre à jour le compte (avec email + password)
router.put("/me", async (req, res) => {
  try {
    const { email, password, updateData } = req.body;
    const result = await updateUser(email, password, updateData);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour supprimer le compte (avec email + password)
router.delete("/me", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await deleteUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclure le champ password pour la sécurité
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

module.exports = router;
