const express = require('express');
const router = express.Router();
const {createReservation,
    getAllReservations,
    getReservationCountByPeriod,
  getPopularDestinations,
  getTotalClientsByPeriod,   
    getTotalRevenueByPeriod,      
    getTotalBalance,
    deleteReservation
} = require('../services/reservationService');

router.post("/", createReservation); // Route pour ajouter une réservation

// Route pour récupérer toutes les réservations (GET)
router.get("/", getAllReservations);

// Route pour obtenir le nombre de réservations sur une période donnée
// Exemple : GET /api/v1/reservations/stats/reservations?startDate=2025-01-01&endDate=2025-03-01
router.get('/stats/reservations', getReservationCountByPeriod);

// Route pour obtenir les destinations les plus réservées
router.get('/stats/popular-destinations', getPopularDestinations);


router.get('/stats/totalClientsByPeriod', getTotalClientsByPeriod);//Invoke-RestMethod -Uri "http://localhost:9000/api/v1/reservations/stats/totalClientsByPeriod?startDate=2025-01-01&endDate=2025-03-30" -Method Get | ConvertTo-Json -Depth 10


router.get('/stats/totalRevenueByPeriod', getTotalRevenueByPeriod);
//Invoke-RestMethod -Uri "http://localhost:9000/api/v1/reservations/stats/totalRevenueByPeriod?startDate=2025-01-01&endDate=2025-03-30" -Method Get | ConvertTo-Json -Depth 10

router.get('/stats/total-balance', getTotalBalance);
router.delete("/:reservationId", deleteReservation);


module.exports = router;
