const express=require('express')

const dotenv=require('dotenv')   
const cors=require('cors')
dotenv.config()
const dbConnect=require('./config/db/dbConnect')
const userRoutes = require('./route/users/userRoutes')  
const postRoute=require('./route/post/postRoute')
const { errorHandler, notFound } = require('./middlewares/errors/ErrorHandler')
const categoryRoute = require('./route/category/categoryRoute')
const commentRouter = require('./route/comment/commentRoute')

const app=express()

dbConnect()

app.use(express.json())     
app.use(cors())

//users route
app.use('/api/users',userRoutes)
//post route
app.use('/api/posts',postRoute)
//category route
app.use('/api/category',categoryRoute)
//comment route
app.use('/api/comments',commentRouter)
//error handler
app.use(notFound)
app.use(errorHandler)




const PORT=process.env.PORT||5000
app.listen(PORT,console.log(`server started on ${PORT}`))     

//XGPeaf9uhFRfHNU9