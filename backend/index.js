const express=require('express');
require('dotenv').config();
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors')
const connectWithDB = require('./config/db');

//import all the routes here
const userRoutes= require('./routes/userRoutes');
const productRoutes= require('./routes/productRoutes');
const cartRoutes=require('./routes/cartRoutes')
const wishlistRoutes=require('./routes/wishlistRoute')
const orderRoutes=require('./routes/orderRoutes')

//connect with database
connectWithDB()

//regular middleware
app.use(cors({origin:'http://localhost:3000', credentials:true,optionSuccessStatus:200}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+'/uploads'))

//cookies and file middleware
app.use(cookieParser())
// app.use(fileUpload())

//use router middlewares here
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/product",productRoutes)
app.use("/api/v1/cart",cartRoutes)
app.use("/api/v1/wishlist",wishlistRoutes)
app.use("/api/v1/order",orderRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})
