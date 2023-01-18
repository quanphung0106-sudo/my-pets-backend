const express = require('express');
const router = express.Router();
const ItemController = require('../app/controllers/ItemController');
const { verifyAdmin } = require('../utils/verifyToken');

router.post('/', verifyAdmin, ItemController.createItem);
router.get('/', ItemController.getItems);
router.get('/find/:id', ItemController.getItem);
router.put('/:id', verifyAdmin, ItemController.updateItem);
router.delete('/', verifyAdmin, ItemController.deleteAllItems);
router.delete('/:id', verifyAdmin, ItemController.deleteItem);

module.exports = router;
