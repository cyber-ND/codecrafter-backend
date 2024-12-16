const express = require('express')
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

// methods in our user controller
const {getAllUsers, createUsers, getUserByid, updateUserByid, deleteUserByid, loginUsers} = require('../controllers/userController')

router.post('/', createUsers);
router.post('/login', loginUsers);

router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserByid);
router.put('/:id', protect, updateUserByid)
router.delete('/:id', protect, deleteUserByid)

module.exports = router 