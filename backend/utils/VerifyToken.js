const jwt = require('jsonwebtoken')

module.exports.verifyToken=(token)=>{
    const tokenData=jwt.verify(token,process.env.JWT_SECRET,(error,data)=>{
        if(error){
            return {error}
        }
        return {data}
    })
    return tokenData
}