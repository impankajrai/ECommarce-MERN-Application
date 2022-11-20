const express=require('express')
const { placeOrder, getOrders, cancelOrder } = require('../controllers/orderController')
const authanticate = require('../middlewares/authanticate')
const router=express.Router()

// router.route('/').post(fetchOrders)
router.route('/placeorder').post(authanticate.userAuth,placeOrder)
router.route('/').post(authanticate.userAuth,getOrders)
router.route('/cancel').post(authanticate.userAuth,cancelOrder)



module.exports=router