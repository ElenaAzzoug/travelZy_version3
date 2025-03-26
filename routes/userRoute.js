const User = require("../models/userModel"); // Assure-toi que le chemin est correct

const express = require("express");
const { createUser, getUserInfo, updateUser, deleteUser, changePassword,resetPassword ,requestPasswordReset,loginUser } = require("../services/userService");
const { protect } = require("../middleware/authMiddleware");
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

// Login Route
router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body.email,req.body.password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour récupérer les informations du compte (avec email + password)
router.get("/me", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const userInfo = await getUserInfo(userId);
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
// Route pour changer le mot de passe
router.put("/change-password", async (req, res) => {
    try {
      const { email, oldPassword, newPassword } = req.body;
      const result = await changePassword(email, oldPassword, newPassword);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



// Route to request password reset
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await requestPasswordReset(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const result = await resetPassword(token, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
  
module.exports = router;
