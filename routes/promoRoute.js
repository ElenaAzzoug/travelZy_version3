const express = require("express");
const {
    createCoupon,
    getCouponById,
    getAllCoupons,
    deleteCouponByID
} = require("../services/promoController");

const router = express.Router();

// Route pour tester si l'API fonctionne
router.get("/test", (req, res) => {
    res.json({ message: " Coupon API is working!" });
});

router.post("/create", createCoupon); // ➤ Ajouter un coupon
router.get("/:id", getCouponById); // ➤ Récupérer un coupon par ID
router.get("/", getAllCoupons); // ➤ Récupérer tous les coupons
router.delete("/:id", deleteCouponByID); // ➤ Supprimer un coupon par ID

module.exports = router;
