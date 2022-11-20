const { verifyToken } = require("../utils/VerifyToken");
const Order= require("../models/order");


module.exports.placeOrder= async(req,res)=>{
    let {products,status,shippingDetails,paymentDetails}=req.body;
   
    //validate required fields
   if(!(products&&status&&shippingDetails&&paymentDetails)){
    return res.status(401).json({ success: false, message: "Enter all the required fields." });
   }

    try {
        const db_response=await Order.create({
           user:req.user._id,
           products,
           status,
           shippingDetails,
           paymentDetails
        })

        if(!(db_response.products&&db_response.status&&db_response.shippingDetails&&db_response.paymentDetails)){
            return res.status(401).json({ success: false, message: "Data not inserted" });
           }

        return res.status(200).json({ success:true,message:"Order placed successfully.",order:db_response}); 
    
    } catch (error) {
        res.status(500).send({success:false,message:"Internal Server Error"})
    }
}


//get all orders ===============================================================================
module.exports.getOrders= async (req, res) => {
    
    const order = await Order.find({user:req.user._id}).populate({
        path: 'products',
        options: {strictPopulate: false},
        populate:{ path: 'product',model:"product"} 
    })


    if (!order) {
        res.status(404).send({success:false,message:"Order not found"}) 
    }
    
    res.status(200).json({success:true,order});
}

//cancel order ==================================================================================
module.exports.cancelOrder= async (req, res) => {
    const {orderId}=req.body
    if (!orderId) {
        return res.status(404).send({success:false,message:"Order id not found"}) 
    }
    const orderExist = await Order.findOne({user:req.user._id,_id:orderId})
    if (!orderExist) {
        return res.status(404).send({success:false,message:"Order not found"}) 
    }

    if ((orderExist.status==="Cancelled") || (orderExist.status==="Rejected") || (orderExist.status==="Shipped")) {
        return res.status(404).send({success:false,message:"Cancelled,rejected or shipped order cannot be cancelled"})
    }

    const update = await Order.updateOne({user:req.user._id},{status:"Cancelled"})

    if (!update.modifiedCount) {
        res.status(200).send({success:true,message:"Order cancelled"})
    }
    

}