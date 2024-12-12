const express = require('express')
const router = express.Router();

// methods in our user controller
const {getAllUsers, createUsers, getUserByid, updateUserByid, deleteUserByid} = require('../controllers/userController')

router.get('/', getAllUsers);
router.post('/', createUsers);
router.get('/:id', getUserByid);
router.put('/:id', updateUserByid)
router.delete('/:id', deleteUserByid)

module.exports = router 