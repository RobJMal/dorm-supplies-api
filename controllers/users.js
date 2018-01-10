const User = require('../models/schemas/user')

/*
*-----CRUD Controllers-----
*/

// Adds new user to database 
exports.createUser = (req, res, next) => {
    if (!req.body.email) {
    	return res.status(400).send("Must provide email")
    }
    if (!req.body.password){
    	return res.status(400).send("Must provide password")
    }
    if (!req.body.name){
    	return res.status(400).send("Must provide name")
    }
    if (!req.body.address){
    	return res.status(400).send("Must provide address (dorm and room number)")
    }
    if (!req.body.classYear){
    	return res.status(400).send("Must provide class year")
    }
    const userData = {
    	email: req.body.email,
    	name : req.body.name,
    	hash: req.body.password,
    	address : req.body.address,
    	classYear : req.body.classYear
    }

    const newUser = new User(userData)
    newUser.save( (err) => {		
    	if (err) return next(err)
    		return res.json(newUser)
    })
}

// Retrieves all users from database 
exports.getAllUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) return next(err)
        return res.json(users)
    })
}

// Deletes single user from database 
exports.deleteUser = (req, res, next) => {
	User.findByIdAndRemove(req.params.userId, (err, user) => {
		if (err) return next(err)
		if (!user) return res.status(404).send('Could not find user ' + req.params.userId)
		return res.json(user)
	})
}

// Retrieves user by id
exports.getUserById = (req, res, next) => {
	User.findById(req.params.userId, (err, user) => {
		if (err) return next(err)
		if (!user) return res.sendStatus(404).send('Could not find user ' + req.params.userId)
		return res.json(user)
	})
} 

// Updates user information 
exports.updateUserInfo = (req, res, next) => {
	User.findOneAndUpdate({ _id : req.params.userId }, req.body, {}, (err, user) => {
		if (err) return next(err)
		if (!user) return res.sendStatus(404).send('Could not find user ' + req.params.userId)
		return res.json(user) 
	})
} 

// Retrives user by email 
exports.getUserByEmail = (req, res, next) => {
	User.findOne({ email: req.params.email }, (err, user) => {
	    if (err) return next(err)
	    if (!user) return res.status(404).send('No user with email: ' + req.params.email)
	    return res.json(user)    
  	})
} 

// Retrives users by classYear 
exports.getUsersByClassYear = (req, res, next) => {
	User.find({ classYear: req.body.classYear }, (err, user) => {
	    if (err) return next(err)
	    if (!user) return res.status(404).send('No one with this class year found')
	    return res.json(user)    
  	})
} 

// Retrives users by address  
exports.getUsersByAddress = (req, res, next) => {
	User.find({ address : req.body.address }, (err, user) => {
	    if (err) return next(err)
	    if (!user) return res.status(404).send('No admins found')
	    return res.json(user)    
  	})
} 

// Retrives admin users 
exports.getAdminUsers = (req, res, next) => {
	User.find({ isAdmin: true }, (err, user) => {
	    if (err) return next(err)
	    if (!user) return res.status(404).send('No admins found')
	    return res.json(user)    
  	})
} 
	
// Purchases item 
exports.purchaseItem = (req, res, next) => {
    // Check the items quantity 
    Item.findById(req.params.itemId, (err, item) => {
        if (err) return next(err)
        if (item.quantity <= 0) return res.send("Sorry, we are out of stock.") 

        // Change the items quantity 
        item.quantity = item.quantity - req.body.quantityPurchased 
        item.save()
    })

    // Add item to user's array 
    User.findOneAndUpdate({ _id : req.params.userId }, req.body, {}, (err, user) => {
        if (err) return next(err)
        if (!user) return res.sendStatus(404).send('Could not find user ' + req.params.userId)
        user.orders.push(item.itemId)
        user.save()
    })
}

// Check if item is avaliable
// Find the user
// User.purchases.push into user's array 
// Mark modified 
// User.save 

// mark.Modified 