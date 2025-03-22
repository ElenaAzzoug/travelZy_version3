const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Charger les variables d'environnement en premier

const connectDB = require("./config/databases");

// Importation des routes
const categoryRoute = require("./routes/categoryRoute");
const couponRoute = require("./routes/promoRoute");
const voyageRoute = require("./routes/voyageRoute");
const userRoute = require("./routes/userRoute");

// Importation des middlewares d'erreur
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Création de l'application Express
const app = express();

// Connexion à MongoDB avec gestion des erreurs
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Quitter l'application en cas d'échec
  }
})();

// Vérifier si MongoDB se déconnecte
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected.");
});

// Middlewares
app.use(express.json()); // Parser le JSON des requêtes
app.use(cors()); // Autoriser les requêtes cross-origin

// Logger les requêtes HTTP si en mode développement
const isDev = process.env.NODE_ENV === "development";
if (isDev) {
  app.use(morgan("dev"));
  console.log(`🔧 Running in development mode`);
}

// Montage des routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/coupons", couponRoute);
app.use("/api/v1/voyages", voyageRoute);
app.use("/api/v1/users", userRoute);

// Route par défaut
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Gestion des erreurs
app.use(notFound); // Middleware pour routes inexistantes
app.use(errorHandler); // Middleware global de gestion des erreurs

// Démarrage du serveur
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT} in ${isDev ? "development" : "production"} mode`);
});

