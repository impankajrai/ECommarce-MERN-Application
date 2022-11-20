const Cart = require("../models/cart");
const { verifyToken } = require("../utils/VerifyToken");

// add to cart ====================================================================================================================
module.exports.addToCart = async (req, res) => {
  const {productId } = req.body;
  const {token}=req.cookies


if (!token) {
  return res.status(501).json({success:false,message:"Please login"})
}
  const encoded = verifyToken(token);
  if(encoded.error){
    return res.status(401).json({success:false,message:"login again"})
  }

  const cartProduct = await Cart.find({ user: encoded.data.id, product: productId });
  if (cartProduct.length) {
    return res
      .status(200)
      .json({ success: false, message:"Product is already Exist"});
  } else {
   try{ const response = await Cart.create({
      user: encoded.data.id,
      product: productId
    })
        if ( response ){
            return res.status(200).json({success:true,message:"product added to cart",product:response})
        }
    } catch{
            return res.status(501).json({success:false,message:"product not added to cart"})
    }
  }
};

// remove to cart =================================================================================================
module.exports.removeToCart = async (req, res) => {
  const { productId } = req.body;
  const {token}=req.cookies
  const user = verifyToken(token);

  //check product exist or not in user's cart
  const ProductExist= await Cart.find({user:user.data.id,product:productId})
  if(!ProductExist.length)
    {
        return res.status(400).json({success:false,message:"Product is not exist in your cart"})
    }
     //delete from db
    const response= await Cart.findOneAndDelete({product:productId,user:user.data.id})
    if(response){
        return res.status(200).json({success:true,message:"product deleted from cart"})
    }else{
        return res.status(400).json({success:false,message:"product is not deleted"})
    }
};

// get product from cart ========================================================================================
module.exports.getFromCart = async (req, res) => {
  // const token = req.body.token;
  const token=req.cookies.token
  if (!token) {
    return res.status(404).json({ success: false, message: "Please login" });
  }
  const encoded = verifyToken(token);
  if (encoded?.error) {
    encoded.error.message === "jwt expired"
      ?  res
          .status(401)
          .json({ success: false, message: "session end, login again !" })
      : res
          .status(401)
          .json({
            success: false,
            message: "logged in user error, login again !",
          });
  } else {
    const products = await Cart.find({ user: encoded.data.id }).populate({
      path: 'product',
      options: {strictPopulate: false}
    });

    if (!products) {
      return res
        .status(200)
        .json({ success: true, message: "Not Product found" });
    } else {
      return res
        .status(200)
        .json(products);
    }
  }
};

// update quantity =============================================================================================
module.exports.updateQuantity=async (req,res)=>{
  const {productId,quantity}=req.body;

  if(!(productId||quantity)){
    return res.status(501).json({success:false,message:"Product details and quantity is needed"})
  }

  const update = await Cart.updateOne({product:productId,user:req.user._id},{quantity})
  if (update.modifiedCount) {
    res.status(200).json({success:true,message:"Quantity is updated"})    
  }else{
    res.status(401).json({success:false,message:"something is wrong"})
  }
}

//clear cart ===================================================================================================
module.exports.clearCart=async (req,res) => {
  const {token}=req.cookies
  const user = verifyToken(token);
  
  if (!user) {
    return res.status(400).json({success:false,message:"Please login"})
  }

  const encoded=verifyToken(token)
  if (encoded?.error) {
    encoded.error.message === "jwt expired"
      ?  res
          .status(401)
          .json({ success: false, message: "session end, login again !" })
      : res
          .status(401)
          .json({
            success: false,
            message: "logged in user error, login again !",
          });
  } else {
      const deleteAll=await Cart.deleteMany({user:encoded.data.id})
    if (deleteAll.deletedCount) {
      return res.status(200).json({success:true,message:"Cart cleared"})
    }else{
      return res.status(400).json({success:false,message:"Your wishlist is empty"})
    }
  }
}
