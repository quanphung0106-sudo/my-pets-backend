const express = require("express");
const router = express.Router();
const OrderController = require("../app/controllers/OrderController");
const { verifyAdmin } = require("../utils/verifyToken");

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.delete("/", verifyAdmin, OrderController.deleteAllOrders);
router.get("/:id", OrderController.getOrderById);
router.get("/user/:userId", OrderController.getOrderByUserId);

module.exports = router;
