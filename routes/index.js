const express = require('express')
const router = express.Router()

const users = require('../controllers/users')
const items = require('../controllers/items')

/* 
*-----Routes for users-----
*/
router.route('/users')
	.get(users.getAllUsers) 
	.post(users.createUser)	

router.route('/users/:userId/id')
	.get(users.getUserById)
	.put(users.updateUserInfo)	
	.delete(users.deleteUser)
	
router.route('/users/:email/email')
	.get(users.getUserByEmail)

router.route('/users/:classYear/classyear')
	.get(users.getUsersByClassYear)

router.route('/users/:address/address')
	.get(users.getUsersByAddress)

router.route('/users/admin')
	.get(users.getAdminUsers)

// Handles purchases 
router.route('/users/purchase')
	.put(users.purchaseItem)

/*
------Routes for items-------
*/
router.route('/items')
	.get(items.getAllItems)
	.post(items.addNewItem)

router.route('/items/:quantityPurchased/:itemId/:userId/item')
	.get(items.getItemById)
	.put(items.updateItemQuantity)


module.exports = router 

