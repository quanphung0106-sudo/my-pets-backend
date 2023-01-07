const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');
const { verifyAdmin } = require('../utils/verifyToken');

router.post('/login', AuthController.userLogin);
router.post('/register', AuthController.userRegister);
router.post('/logout', AuthController.logout);
router.post("/refresh-token", AuthController.refreshToken);
router.get('/tokens', AuthController.getToken);
router.post('/token', AuthController.activeAccount);
router.delete('/tokens', verifyAdmin, AuthController.deleteTokens);

module.exports = router;
