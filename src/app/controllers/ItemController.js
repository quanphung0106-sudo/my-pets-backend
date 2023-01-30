const Item = require("../models/Item");

//create an item
//[POST]: /api/item/
const createItem = async (req, res) => {
  try {
    const products = await Item.create(req.body);
    console.log("created new item: ", products);
    return res.status(201).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get all items
//[GET]: /api/item/
const getItems = async (req, res) => {
  const { min, max, sort, page, limit, ...others } = req.query;
  const totalData = await Item.countDocuments();

  try {
    const items = await Item.find({
      ...others,
      cheapestPrice: { $gte: min | 0, $lte: max || 9999 },
    })
      .sort(
        sort && {
          cheapestPrice: sort === "highest" ? "descending" : "ascending",
        }
      )
      .skip(page && parseInt(page) * parseInt(limit))
      .limit(limit && parseInt(limit));
    if (items.length === 0) {
      return res.status(204).json("The item you looking for is not found.");
    } else {
      return res.status(200).json({ items, totalData });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get an item
//[GET]: /api/item/:id
const getItem = async (req, res) => {
  try {
    const items = await Item.findById({ _id: req.params.id });
    if (!items) {
      return res.status(404).json("Lỗi");
    } else {
      return res.status(200).json(items);
    }
  } catch (err) {
    return res.status(500).json(err);
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
      }
    );
    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete all items
//[DELETE]: /api/items
const deleteAllItems = async (req, res) => {
  try {
    await Item.remove();
    return res.status(200).json("All item are deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete an item
//[DELETE]: /api/items/:id
const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    return res.status(200).json("The item has been deleted");
  } catch (err) {
    return res.status(500).json(err);
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
