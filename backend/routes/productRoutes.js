const express=require('express')
const { getAllProduct, getCategories, addProduct, productByCategory, getProductById, allProductByCategory, searchProducts } = require('../controllers/productsController')
const { fileUpload } = require('../utils/fileUpload')
const router=express.Router()

const upload=fileUpload('./uploads/products',"photo") //destination path and fieldName


router.route('/').get(getAllProduct)
router.route('/:id').get(getProductById)
router.route('/category').get(getCategories)
router.route('/bycategory').post(productByCategory)
router.route('/search').post(searchProducts)

module.exports=router