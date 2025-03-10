const express = require("express");
const {
    createCoupon,
    getCouponById,
    getAllCoupons,
    deleteCouponByID
} = require("../services/promoController");

const router = express.Router();


router.post("/", createCoupon); // ➤ Ajouter un coupon
router.get("/:id", getCouponById); // ➤ Récupérer un coupon par ID
router.get("/", getAllCoupons); // ➤ Récupérer tous les coupons
router.delete("/:id", deleteCouponByID); // ➤ Supprimer un coupon par ID

module.exports = router;
