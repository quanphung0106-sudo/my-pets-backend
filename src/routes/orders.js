const express = require("express");
const router = express.Router();
const OrderController = require("../app/controllers/OrderController");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.delete("/", verifyAdmin, OrderController.deleteAllOrders);
router.delete("/:id", verifyAdmin, OrderController.deleteAnOrder);
router.get("/:id", OrderController.getOrderById);
router.get("/user/:id", verifyUser, OrderController.getOrderByUserId);
router.put("/:id", verifyAdmin, OrderController.updateStatus);

module.exports = router;
