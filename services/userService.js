const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

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

    // Créer l'utilisateur
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture
    });

    await newUser.save();
    return { message: "User created successfully", email: newUser.email };
  } catch (error) {
    throw error;
  }
};

// Récupérer les informations de l'utilisateur via email et mot de passe
const getUserInfo = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found.");
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password.");
    }

    // Ne pas renvoyer le mot de passe
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt
    };
  } catch (error) {
    throw error;
  }
};

// Mise à jour du compte utilisateur
const updateUser = async (email, password, updateData) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found.");
    }

    // Vérifier le mot de passe avant la mise à jour
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password.");
    }

    // Mettre à jour uniquement les champs fournis
    Object.assign(user, updateData);

    await user.save();
    return { message: "User updated successfully" };
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

module.exports = { createUser, getUserInfo, updateUser, deleteUser };
