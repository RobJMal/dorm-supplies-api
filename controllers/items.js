const Item = require('../models/schemas/item')

/*
------CRUD Controllers--------
*/

// Adds item to database 
exports.addNewItem = (req, res, next) => {
	if (!req.body.name) {
    	return res.status(400).send("Must provide name of item")
    }
    if (!req.body.price){
    	return res.status(400).send("Must provide price of item")
    }
    if (!req.body.quantity){
    	return res.status(400).send("Must provide quantity of item")
    }
    if (!req.body.description){
    	return res.status(400).send("Must provide description of item")
    }
    if (!req.body.picture){
    	return res.status(400).send("Must provide link to picture")
    }
    const itemData = {
    	name : req.body.name,
    	price : req.body.price, 
    	quantity : req.body.quantity, 
    	description : req.body.description,
    	picture : req.body.picture 
    }

    const newItem = new Item(itemData)
    newItem.save( (err) => {		
    	if (err) return next(err)
    		return res.json(newItem)
    })
}

// Retrieves all items and data from database 
exports.getAllItems = (req, res, next) => {
    Item.find({}, (err, item) => {
        if (err) return next(err)
        return res.json(item)
    })
}

// Retrieves single item information 
exports.getItemById = (req, res, next) => {
    Item.findById(req.params.itemId, (err, item) => {
        if (err) return next(err)
        if (!item) return res.sendStatus(404).send('Could not find item ' + req.params.itemId)
        return res.json(item)
    })
} 

// Updates quantity of an item 
// Need to include the incrementing operator 
exports.updateItemQuantity = (req, res, next) => {
    Item.findOneAndUpdate({ _id : req.params.itemId }, req.body, {}, (err, item) => {
        if (err) return next(err)
        if (!item) return res.sendStatus(404).send('Could not find item ' + req.params.itemId)
        return res.json(item) 
    })
}
