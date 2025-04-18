const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
const generateToken = require('../middleware/jwtMiddleware')   
const transporter = require("./emailService"); // si c'est dans le même dossier (services/)


// Création d'un utilisateur
const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, password, profilePicture } = userData;

    // Vérifier si l'email est déjà utilisé
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use.");
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Générer un token d’activation
    const activationToken = crypto.randomBytes(32).toString("hex");

    // Créer l'utilisateur
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture,
      isAdmin:false,
      activationToken
    });
     
     

    //  Sauvegarder l'utilisateur avec le token
         await newUser.save();


     //  Envoyer l'email avec le lien d’activation
     const activationLink = `${process.env.CLIENT_URL}/activate-account/${activationToken}`;
     await transporter.sendMail({
      to: newUser.email,
     from: process.env.EMAIL_USER,
     subject: "Activate Your Account",
      text: `Hello ${newUser.firstName}.Click this link to activate your account: ${activationLink}`,
});


    return { message: "User created successfully.Activation link sent to email.", email: newUser.email };
  } catch (error) {
    throw error;
  }
};

const activateAccount = async (token) => {
  try {
    const user = await User.findOne({ activationToken: token });

    if (!user) {
      throw new Error("Invalid or expired activation token.");
    }

    // Activer le compte
    user.isActive = true;
    user.activationToken = null; // Supprimer le token pour sécurité

    await user.save();

    return { message: "Account successfully activated." };
  } catch (error) {
    throw error;
  }
};
const deactivateUser = async (userId, password) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password.");
    }

    user.isActive = false;
    await user.save();

    return { message: "Account deactivated successfully." };
  } catch (error) {
    throw error;
  }
};


//Login User
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }

    if (!user.isActive) {
      throw new Error("Please activate your account first.");
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password.");
    }
    const token = generateToken(user._id, user.isAdmin)

    // Ne pas renvoyer le mot de passe
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      token
    };
  } catch (error) {
    throw error;
  }
};


//Get me
const getUserInfo = async (id) => {
  try {
    const user = await User.findById(id)
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      isAdmin:user.isAdmin
    };
  } catch (error) {
    throw error;
  }
};

// Mise à jour du compte utilisateur
const updateUser = async (id, userData) => {
  try {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(id, { ...userData }, { new: true })
    return { updatedUser };
  } catch (error) {
    throw error;
  }
};

// Suppression du compte utilisateur
const deleteUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found.");
    }

    // Vérifier le mot de passe avant suppression
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password.");
    }

    await User.deleteOne({ email });
    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};
// Changer le mot de passe d'un utilisateur
const changePassword = async (email, oldPassword, newPassword) => {
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new Error("User not found.");
      }
  
      // Vérifier l'ancien mot de passe
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        throw new Error("Invalid old password.");
      }
  
      // Hacher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Mettre à jour le mot de passe
      user.password = hashedPassword;
      await user.save();
  
      return { message: "Password changed successfully." };
    } catch (error) {
      throw error;
    }
  };


   


// Request password reset
const requestPasswordReset = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration

    await user.save();

    // Send email
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      text: `Click this link to reset your password: ${resetLink}`,
    });

    return { message: "Password reset link sent to email" };
  } catch (error) {
    throw error;
  }
};

// Reset password with token
const resetPassword = async (token, newPassword) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid or expired token.");
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return { message: "Password reset successful" };
  } catch (error) {
    throw error;
  }
};
  

module.exports = { createUser, getUserInfo, updateUser, deleteUser, changePassword,requestPasswordReset,resetPassword,loginUser,activateAccount,deactivateUser };
