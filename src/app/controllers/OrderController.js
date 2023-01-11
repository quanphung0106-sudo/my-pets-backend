const Order = require("../models/Order");
const User = require("../models/User");

//create an order
//[POST]: /api/item/
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.status(201).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get all orders
//[GET]: /api/orders/
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get an order by id
//[GET]: /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.params.id });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get all user's orders by userId
//[GET]: /api/order/user/:userId
const getOrderByUserId = async (req, res) => {
  try {
    const currentUser = await User.findById({ _id: req.params.id });
    const userOrders = await Order.find({ userId: currentUser._id });

    if (userOrders) {
      return res.status(200).json(userOrders);
    } else {
      return res.status(500).json({ msg: '"Invalid"' });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete all orders
//[DELETE]: /api/orders/
const deleteAllOrders = async (req, res) => {
  try {
    const orders = await Order.remove();
    return res.status(200).json("Deleted all orders");
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByUserId,
  deleteAllOrders,
};
