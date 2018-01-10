const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({  
    email : { type : String, unique : true}, 
    name : String, 
    hash : String,
    isAdmin : Boolean,
    address : String, 
    classYear : Number,
    orders : [{
      items : [{
        itemId : String, 
        quantity : Number,
        price : Number, 
      }]     
      // purchasedDate : Date, 
      // deliveryDate : Date, 
      // isPaid : Boolean 
    }]
  },
  {
    toObject: { getters: true },
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    },
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;