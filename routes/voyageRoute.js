const express = require('express');
const { createVoyage, getAllVoyages } = require('../services/voyageService');

const router = express.Router();

// Route pour créer un voyage
router.post('/', createVoyage);
// Route pour récupérer tous les voyages (GET)
router.get('/', getAllVoyages);

module.exports = router;
