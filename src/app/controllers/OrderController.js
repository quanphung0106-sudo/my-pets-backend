const Order = require("../models/Order");
const User = require("../models/User");

//create an order
//[POST]: /api/item/
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all orders
//[GET]: /api/orders/
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get an order by id
//[GET]: /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.params.id });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all user's orders by userId
//[GET]: /api/order/:userId
const getOrderByUserId = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userOrders = await Order.find({ userId: currentUser._id });
    res.status(200).json(userOrders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete all orders
//[DELETE]: /api/orders/
const deleteAllOrders = async (req, res) => {
  try {
    const orders = await Order.remove();
    res.status(200).json("Deleted all orders");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByUserId,
  deleteAllOrders,
};
