const User = require("../models/User");

//create an user
//[POST]: /api/item/
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get all users
//[GET]: /api/item/
const getAllUsers = async (req, res) => {
  const totalData = await User.countDocuments();

  try {
    const users = await User.find();
    return res.status(200).json({ users, totalData });
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete all users
//[DELETE]: /api/users/
const deleteAllUsers = async (req, res) => {
  try {
    const users = await User.remove();
    return res.status(200).json("Deleted all users");
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete an user
//[DELETE]: /api/users/:id
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("The account has been deleted.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  deleteAllUsers,
  deleteUser,
};
