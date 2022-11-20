const express=require('express')
const { addToCart, getFromCart, removeToCart, clearCart, updateQuantity } = require('../controllers/cartController')
const authanticate = require('../middlewares/authanticate')
const router=express.Router()


router.route('/add').post(addToCart)
router.route('/').get(getFromCart)
router.route('/remove').post(removeToCart)
router.route('/clear').post(clearCart)
router.route('/updatequantity').post(authanticate.userAuth,updateQuantity)


module.exports=router