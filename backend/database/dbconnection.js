import mongoose from "mongoose";

export const dbConnect = async() => {
    try {
        const connetionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`, {
            dbName: "MERN_STACK_BLOG_DATA"
        })
        console.log(`MongoDB connected !! DB HOst : ${connetionInstance.connection.host}`);

    } catch (error) {
        console.log("MongoDB connection error at dbConnection.js file : ", error);
    }
}