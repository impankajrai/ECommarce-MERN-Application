const { verify } = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Wishlist = require("../models/wishlist");
const { verifyToken } = require("../utils/VerifyToken");

// add to wishlist  ====================================================================================================================
module.exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const { token } = req.cookies;

  if (!token) {
    return res.status(501).json({ success: false, message: "Please login" });
  }
  const encoded = verifyToken(token);
  if (encoded.error) {
    return res.status(401).json({ success: false, message: "login again" });
  }

  const wishlistProduct = await Wishlist.find({
    user: encoded.data.id,
    product: productId,
  });
  if (wishlistProduct.length) {
    return res
      .status(200)
      .json({ success: false, message: "Product is already Exist" });
  } else {
    try {
      const response = await Wishlist.create({
        user: encoded.data.id,
        product: productId,
      });
      if (response) {
        return res
          .status(200)
          .json({
            success: true,
            message: "product added to wishlist",
            product: response,
          });
      }
    } catch {
      return res
        .status(501)
        .json({ success: false, message: "product not added to wishlist" });
    }
  }
};


// add many to wishlist  ====================================================================================================================
module.exports.addManyToWishlist = async (req, res) => {
  const { ids } = req.body;

  //check already existing data
  let wishlistProduct = await Wishlist.find({
    user: req.user.id,
    product: { $in: ids },
  });
  wishlistProduct = wishlistProduct.map((data) => data.product);
  console.log("wishlist>>>>",wishlistProduct)

  // get unique keys from existing key
  const uniqueKeys = ids.filter((data) => {
    if (!wishlistProduct.toString().includes(data)) return data;
  })

  //new object create from unique keys-
  const uniqueObject=uniqueKeys.map((data)=>{ 
    if (!wishlistProduct.includes(data)){
      return { user: req.user.id,product: data}
    }
  })

  console.log("unique>>>",uniqueObject)
  //unique product list from ids for response
  const uniqueProducts = await Wishlist.find({
    user: req.user.id,
    product: { $in: uniqueKeys },
  })
  // .populate({
  //   path: "product",
  //   options: { strictPopulate: false },
  // });


  console.log("unique keys>>>>",uniqueKeys)
  console.log("unique products>>>>",uniqueProducts)


  if (!uniqueObject.length) {
    return res.status(501).json({success:false,message:"All items are already exist"})
  }

   try{
     let response = await Wishlist.insertMany(uniqueObject);
        if ( response.length){

            return res.status(200).json({success:true,message:"product added to wishlist",uniqueProducts})
        }
    } catch{
            return res.status(501).json({success:false,message:"product not added to wishlist"})
    }
};

// remove to wishlist =================================================================================================
module.exports.removeToWishlist = async (req, res) => {
  const { productId } = req.body;
  const { token } = req.cookies;
  const user = verifyToken(token);

  //check product exist or not in user's wishlist
  const ProductExist = await Wishlist.find({
    user: user.data.id,
    product: productId,
  });
  if (!ProductExist.length) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Product is not exist in your wishlist",
      });
  }
  //delete from db
  const response = await Wishlist.findOneAndDelete({
    product: productId,
    user: user.data.id,
  });
  if (response) {
    return res
      .status(200)
      .json({ success: true, message: "product deleted from wishlist" });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "product is not deleted" });
  }
};

// get product from wishlist ========================================================================================
module.exports.getFromWishlist = async (req, res) => {
  // const token = req.body.token;
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json({ success: false, message: "Please login" });
  }
  const encoded = verifyToken(token);
  if (encoded?.error) {
    encoded.error.message === "jwt expired"
      ? res
          .status(401)
          .json({ success: false, message: "session end, login again !" })
      : res.status(401).json({
          success: false,
          message: "logged in user error, login again !",
        });
  } else {
    const products = await Wishlist.find({ user: encoded.data.id }).populate({
      path: "product",
      options: { strictPopulate: false },
    });

    if (!products) {
      return res
        .status(200)
        .json({ success: true, message: "Not Product found" });
    } else {
      return res.status(200).json(products);
    }
  }
};

//remove all items from wishlist
module.exports.removeAll = async (req, res) => {
  const { token } = req.cookies;
  // const {token}=req.body
  const user = verifyToken(token);

  if (!user) {
    return res.status(400).json({ success: false, message: "Please login" });
  }

  const encoded = verifyToken(token);
  if (encoded?.error) {
    encoded.error.message === "jwt expired"
      ? res
          .status(401)
          .json({ success: false, message: "session end, login again !" })
      : res.status(401).json({
          success: false,
          message: "logged in user error, login again !",
        });
  } else {
    const deleteAll = await Wishlist.deleteMany({ user: encoded.data.id });
    if (deleteAll.deletedCount) {
      return res
        .status(200)
        .json({ success: true, message: "wishlist cleared" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Your wishlist is empty" });
    }
  }
};
