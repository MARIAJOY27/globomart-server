const wishes = require("../model/wishlistModel")


exports.addToWishlistController = async(req,res)=>{
  const {id,title,price,description,category,image,rating} = req.body
  const userId = req.payload

  try {
    const existingProduct = await wishes.findOne({id,userId})
    if(existingProduct){
      res.status(406).json('Product already in your wishlist')
    }
    else{
      const newProduct = new wishes({
        id,title,price,description,category,image,rating,userId
      })
      await newProduct.save()
      res.status(200).json(newProduct)
    }
    
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.getWishlistController = async(req,res)=>{
  const userId = req.payload
  try {
    const allWishlistItem = await wishes.find({userId})
    if(allWishlistItem){
      res.status(200).json(allWishlistItem)
    }
    else{
      res.status(406).json('Your wishlist is empty')
    }
    
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.removeWishlistItemController = async(req,res)=>{
  const {id} = req.params
  try {
    const product = await wishes.findByIdAndDelete({_id:id})
    res.status(200).json(product)
    
  } catch (error) {
    res.status(401).json(error)
  }
}