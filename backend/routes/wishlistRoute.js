const express=require('express')
const { addToWishlist, getFromWishlist, removeToWishlist, removeAll, addManyToWishlist } = require('../controllers/wishlistController')
const authanticate = require('../middlewares/authanticate')
const router=express.Router()

router.route('/add').post(addToWishlist)
router.route('/').post(getFromWishlist)
router.route('/remove').post(removeToWishlist)
router.route('/clear').post(removeAll)
router.route('/addmany').post(authanticate.userAuth,addManyToWishlist)

module.exports=router