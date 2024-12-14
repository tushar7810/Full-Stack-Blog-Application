import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dbConnect } from './database/dbconnection.js'
import { errorMiddleware } from './middlewares/error.js'
import userRouter from './Routes/userRouter.js'
import fileUpload from 'express-fileupload'
import blogRouter from './Routes/blogRouter.js'

const app = express()
dotenv.config({
    path: ".env"
})
app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials : true
}))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use("/user", userRouter)
app.use("/blog", blogRouter)

dbConnect()
app.use(errorMiddleware)


export default app