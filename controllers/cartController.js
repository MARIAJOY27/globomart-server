const carts = require("../model/cartModel")


exports.addToCartController = async(req,res)=>{
    const {id,title,price,description,category,image,rating,quantity} = req.body
  const userId = req.payload

  try {
    const existingProduct = await carts.findOne({id,userId})
    if(existingProduct){
      res.status(406).json('Product already in your cart')
    }
    else{
      const newProduct = new carts({
        id,title,price,description,category,image,rating,quantity,grandTotal:price,userId
      })
      await newProduct.save()
      res.status(200).json(newProduct)
    }
    
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.getAllCartProductController = async(req,res)=>{
    const userId = req.payload
    try {
        const allProduct = await carts.find({userId})
        res.status(200).json(allProduct)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.removeItemfromCart = async(req,res)=>{
    const {id} = req.params
    try {
        await carts.deleteOne({_id:id})
        res.status(200).json('Deleted successfully')
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.emptyCartController = async(req,res)=>{
  const userId = req.payload

  try {
    await carts.deleteMany({userId})
    res.status(200).json('Cart deleted successfully')
    
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.incrementController = async(req,res)=>{
  const {id} = req.params
  try {
    const selectedItem = await carts.findOne({_id:id})
    if(selectedItem){
      selectedItem.quantity+=1
      selectedItem.grandTotal = selectedItem.price*selectedItem.quantity
      await selectedItem.save()
      res.status(200).json(selectedItem)
    }
    
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.decrementController = async(req,res)=>{
  const {id} = req.params
  try {
    const selectedItem = await carts.findOne({_id:id})
    if(selectedItem){
      selectedItem.quantity-=1
      if(selectedItem.quantity==0){
        await carts.deleteOne({_id:id})
        res.status(200).json('Item removed successfully')
      }
      else{
        selectedItem.grandTotal = selectedItem.price*selectedItem.quantity
        await selectedItem.save()
        res.status(200).json(selectedItem)

      }
    }
    else{
      res.status(401).json('No such product')
    }
    
  } catch (error) {
    res.status(401).json(error)
  }
}