const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports.sendEmail= async ({to,subject,html})=>{

    return sgMail.send({
        to,
        from: 'rai12091997@gmail.com', 
        subject,
        html

    })
    .then(() => {
      return {success:true,message:"email sent successfully"}
    })
    .catch((error) => {
      return {success:false,error}
    })

}


