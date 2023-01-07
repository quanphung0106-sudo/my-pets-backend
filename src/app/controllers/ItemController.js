const Item = require('../models/Item');

//create an item
//[POST]: /api/item/
const createItem = async (req, res) => {
  try {
    const products = await Item.create(req.body);
    console.log('created new item: ', products);
    res.status(201).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all items
//[GET]: /api/item/
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get an item
//[GET]: /api/item/:id
const getItem = async (req, res) => {
  try {
    const items = await Item.findById({ _id: req.params.id });
    if (!items) {
      res.status(404).json('Lỗi');
    } else {
      res.status(200).json(items);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//update an item
//[PUT]: /api/item/:id
const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
    );
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete all items
//[DELETE]: /api/items
const deleteAllItems = async (req, res) => {
  try {
    const items = await Item.remove();
    res.status(200).json('All item are deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete all items
//[DELETE]: /api/items
const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json('The item is deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteAllItems,
  getItem,
  deleteItem,
};
