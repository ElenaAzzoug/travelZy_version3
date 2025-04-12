const User = require("../models/UserModel"); // Assure-toi que le chemin est correct

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
router.put("/me",protect, async (req, res) => {
  try {
    let userData = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password:req.body.password
    };
    const result = await updateUser(req.user.id, userData);
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
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



// get all users for admin
router.get("/",protect, async (req, res) => {
    try {
      if(!req.user.isAdmin){
        return res.status(403).json({success:false,message:'Unothorized'})
    }
      const users = await User.find({_id: {$ne: req.user.id}}).select('-password')
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});


// update user by id ( admin )
router.get("/:id",protect, async (req, res) => {
    try {
      if(!req.user.isAdmin){
        return res.status(403).json({success:false,message:'Unothorized'})
    }
      const user = await User.findById(req.params.id).select('-password')
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});


// delete user by id ( admin )
router.delete("/:id",protect, async (req, res) => {
    try {
      if(!req.user.isAdmin){
        return res.status(403).json({success:false,message:'Unothorized'})
    }
      const user = await User.findByIdAndDelete(req.params.id)
        res.json({success:true,message:'utilisateur supprimé avec success'});
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
