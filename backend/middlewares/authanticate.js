const User = require("../models/user");
const { verifyToken } = require("../utils/VerifyToken");

const authanticate={
    userAuth: async(req,res,next)=>{
        const {token}=req.cookies;
        // let {token}=req.body;
        if(!token){
            return res.status(401).json({success:false, message: 'please login first'})
        }
        const {data}= verifyToken(token);
        if(!data){
            return res.status(401).json({success:false, message: 'invalid user'})
        }
        //user check in database
        const user=await User.findOne({_id:data.id,email:data.email})
        if (user.name&&user.email) {
            req.user=user
            next()
        }else{
            return res.status(401).json({success:false, message: 'invalid user'})
        }
    }
}

module.exports=authanticate;