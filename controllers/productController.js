const products = require("../model/productModel")


exports.getAllProductController = async(req,res)=>{
    try {
        const allProduct = await products.find()
        res.status(200).json(allProduct)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

//controller to get a particular product
exports.getAProductController = async(req,res)=>{
    const {id} = req.params
    try {
        const existingProduct = await products.findOne({id})
        res.status(200).json(existingProduct)
        
    } catch (error) {
        res.status(401).json(error)
    }

}