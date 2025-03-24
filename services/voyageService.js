const asyncHandler = require('express-async-handler');
const VoyageModel = require('../models/VoyageModel'); // Vérifie bien que le fichier existe

// Fonction pour créer un voyage
exports.createVoyage = asyncHandler(async (req, res) => {
    const { name, category, price, description } = req.body;

    if (!name || !category || !price || !description) {
        return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
    }

    const voyage = await VoyageModel.create({
        name,
        category,
        price,
        description
    });

    res.status(201).json({ success: true, data: voyage });
});
// Fonction pour récupérer tous les voyages
exports.getAllVoyages = asyncHandler(async (req, res) => {
    const voyages = await VoyageModel.find().populate('category'); // Récupère les voyages avec leurs catégories
    res.status(200).json({ success: true, count: voyages.length, data: voyages });
});