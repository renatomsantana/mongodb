const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, userController.createUser);
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
