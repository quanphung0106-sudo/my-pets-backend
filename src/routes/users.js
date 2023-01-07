const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const { verifyAdmin } = require('../utils/verifyToken');

router.post('/', verifyAdmin, UserController.createUser);
router.get('/', verifyAdmin, UserController.getAllUsers);
router.delete('/', verifyAdmin, UserController.deleteAllUsers);
router.delete('/:id', verifyAdmin, UserController.deleteUser);

module.exports = router;
