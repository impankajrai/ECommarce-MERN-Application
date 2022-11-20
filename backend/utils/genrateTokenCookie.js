module.exports.getTokenCookie=(user,response,successMessage)=>{

        //get jwt token
        const token=user.getJwtToken()
    
        //set cookie options
        const options ={
            expires:new Date(
                Date.now()+10*24*60*60*1000 //cookie expires in 10 days
            ),
            httpOnly:true
        }
        
        user.password=undefined //for not show password in response

        //send cookie to users browser
        response.status(200).cookie("token",token,options).json({ //send json also because when frontend developer use this api in android ios and other plateform they store token to some another place instead of cookie 
            success:true,
            message:successMessage,
            token,
            user
        })
}