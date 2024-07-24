const express = require('express')
const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const wishlistController = require('./controllers/wishlistController')
const cartController = require('./controllers/cartController')
const jwt = require('./middleware/jwtMiddleware')

const routes = new express.Router()


//path to get all products
routes.get('/all-products', productController.getAllProductController)

//path to register
routes.post(`/register`,userController.registerController)

//path to login
routes.post('/login', userController.loginController)

routes.post('/add-wishlist',jwt,wishlistController.addToWishlistController)

routes.get('/get-wishlistitem',jwt,wishlistController.getWishlistController)

routes.delete('/delete-wishlistItem/:id',wishlistController.removeWishlistItemController)

routes.get('/view-product/:id',productController.getAProductController)

routes.post('/add-cart',jwt,cartController.addToCartController)

routes.get('/get-cartItem',jwt,cartController.getAllCartProductController)

routes.delete('/remove-cartItem/:id',cartController.removeItemfromCart)

routes.delete('/empty-cart',jwt,cartController.emptyCartController)

routes.get('/cart/increment/:id',cartController.incrementController)

routes.get('/cart/decrement/:id',cartController.decrementController)



module.exports = routes 

// sb-evign31761866@business.example.com - email paypal

// Ncj@b1PF - password paypal