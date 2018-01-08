# dorm-supplies-api Schema

### Basic Objects

#### Users
```js
{
  id, 
  name : String, 
  hash : String,
  email : String, 
  isAdmin : Boolean,
  address : String, 
  classYear : Number,
  orders : [{
    items : [{
      itemId : String, 
      quantity : Number,
      price : Number, 
    }]     
    purchasedDate : Date, 
    deliveryDate : Date, 
    isPaid : Boolean, 
  }]
}
```

#### Item
```js
{
  id,
  name : String,
  price : Number, 
  description : String, 
  quantity : Number, 
  picture : String
}
```


