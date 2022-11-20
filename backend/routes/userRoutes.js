const express=require('express')
const router=express.Router()
const { signUp, signIn, isAuthanticated,logout, forgetPassRequest, validateResetPassURL, resetPassword, changePassword, updateUser, UpdatePassword } = require('../controllers/usersController')


router.route('/signup').post(signUp)
router.route('/signin').post(signIn)
router.route('/logout').post(logout)
router.route('/isauthanticate').post(isAuthanticated)

//forget password route =======================================================================================
router.route('/forgetpassword/request').post(forgetPassRequest)
router.route('/forgetpassword/validate').post(validateResetPassURL) 
router.route('/resetpassword').post(resetPassword)



//update user =======================================================================================

//intialize file upload middleware
const { fileUpload } = require('../utils/fileUpload')
const upload=fileUpload('./uploads/user',"photo")

router.route('/changepassword').post(changePassword)
router.route('/update').post(upload,updateUser)
router.route('/updatepassword').post(UpdatePassword)


module.exports=router