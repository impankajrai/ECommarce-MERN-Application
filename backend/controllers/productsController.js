const Product = require("../models/product");
const getFileURL = require("../utils/getFileURL");

module.exports.addProduct = async (req, res) => {
  // function for send response
  const sendResponse = (dbResponse) => {
    if (dbResponse) {
      res.status(200).json({
        success: true,
        message: "product saved successful",
        products: dbResponse,
      });
    } else {
      res.status(401).json({ success: false, message: "Item is not added" });
    }
  };
  const {
    name,
    price,
    description,
    category,
    photos,
    services,
    ratting,
    brand,
    stock,
  } = req.body;

  if (!(name && price && description && category && brand && stock)) {
    res.status(501).json({
      success: false,
      message:
        "name,price,description,category,brand and stock are required field !",
    });
  } else {
    const dbResponse = await Product.create({
      name,
      price,
      description,
      category,
      brand,
      ratting,
      services: services ? services : [],
      stock: stock ? stock : 0,
      photos: photos ? photos : [],
    });

    if (dbResponse) {
      res.status(200).json({
        success: true,
        message: "product saved successful",
        products: dbResponse,
      });
    } else {
      res.status(401).json({ success: false, message: "Item is not added" });
    }
  }
};

// Get all product api ====================================================================================================
module.exports.getAllProduct = async (req, res) => {
  const products = await Product.find();
  const hash = products.reduce((previous, current) => {
    return (
      previous[current.category]
        ? previous[current.category].push(current)
        : (previous[current.category] = [current]),
      previous
    );
  }, {});

  const newData = Object.keys(hash).map((key) => ({ [key]: hash[key] }));
  return res.status(200).json(newData);
};

// get category ==============================================================================================================
module.exports.getCategories = async (req, res) => {
  let Category = (await Product.find({}, "category")).map(
    (data) => data.category
  );
  Category = new Set(Category);

  if (Category) {
    res.status(200).json({
      success: true,
      message: "product category fetch success",
      Categories: Array.from(Category),
    });
  } else
    res.status(400),
      json({ success: false, message: "unable to find product categories" });
};

//Product by category ========================================================================================================
module.exports.productByCategory = async (req, res) => {
  const { category } = req.body;
  if (!category) {
    res.status(501).json({ success: false, message: "Please enter category" });
  } else {
    const products = await Product.find({ category });
    if (products) {
      res.status(200).json({ success: true, products });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  }
};


//get product by category ==================================================================================================

module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.find({ _id: id });
  if (product) {
    res
      .status(200)
      .json({ success: true, message: "Product fetch success", product });
  } else {
    res
      .status(500)
      .json({ success: false, message: "Product fetch unsuccess" });
  }
};


//product search api
module.exports.searchProducts=async (req,res)=>{
if (!req?.query?.key) {
  return res.status(401).json({success:false,message:"Enter Key parameter"})
}

const product= await Product.find({$or:[
  {name:RegExp(req.query.key,'i')},
  {description:RegExp(req.query.key,'i')},
  {category:RegExp(req.query.key,'i')},
  {brand:RegExp(req.query.key,'i')},
]})


return product.length&& res.status(200).json({success:true,message:"fetch success",product})
}
