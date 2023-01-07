const express = require('express');
const router = express.Router();
const OrderController = require('../app/controllers/OrderController');

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getOrders);
router.delete('/', OrderController.deleteAllOrders);
router.get('/:id', OrderController.getOrderById);

module.exports = router;
