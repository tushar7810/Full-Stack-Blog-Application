import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js";
import{ User} from "../models/user.models.js"
import { sendCookieToken } from "../utils/logincookie.js";
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'

export const register = catchAsyncErrors(async(req,res,next) => {
    
    if(!req.files || Object.keys(req.files).length === 0 ){
        return next(new ErrorHandler("User Avatar required", 400))
    }
    const {avatar} = req.files;

    const allowedFormats = ["image/png" , "image/webp" , "image/jpeg" , "image/jpg"]

    if(!allowedFormats.includes(avatar.mimetype)){
        return next(new ErrorHandler(
            "Invalid file type. Please provide your avatar in png ,jpeg, jpg or webp format",
            400)
        )
    }

    const {name,email,password,phone,role,education} = req.body;

    if(!name || !email || !password || !phone || !role || !education || !avatar){
        return next(new ErrorHandler("Please fill all details" , 400))
    }

    let existingUser = await User.findOne( {email} );

    if(existingUser){
        return next(new ErrorHandler("User Already Exist, please try with another email id" , 400))
    }

    const cloudinaryRes = await cloudinary.uploader.upload(
        avatar.tempFilePath
    )

    if(!cloudinaryRes || cloudinaryRes.error) {
        console.log("Cloudinary error", cloudinaryRes.error || "Unknown cloudinary error")
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        role,
        education,
        avatar:{
            public_id: cloudinaryRes.public_id,
            url: cloudinaryRes.secure_url,
        }
    })

    sendCookieToken(user,200,"User register successfully", res)

    res.status(200).json({
        success: true,
        message: "User register successfully"
    })
})

export const login = catchAsyncErrors( async(req,res,next) => {

    const { email , password , role} = req.body ;

    if(!email || !password || !role ){
        return next(new ErrorHandler("Please fill full details" , 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if(!user) return next(new ErrorHandler("Invalid email , please give the valid email id", 400))

    const isPasswordMatched = await bcrypt.compare(password,user.password);

    if(!isPasswordMatched) return next(new ErrorHandler("invalid password , try again", 400))

    if(user.role !== role) {
        return next(new ErrorHandler(`User with provided role ${role} not found `, 400))
    }
    
    sendCookieToken(user,200,"User logged in successfully", res)
})

export const logout = catchAsyncErrors((req,res,next) => {
    res.status(200).cookie('token','', {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success:true,
        message: "User logged out"
    })
})

export const getMyProfile = catchAsyncErrors((req,res,next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    })
})

export const getAllAuthors = catchAsyncErrors(async(req,res,next) => {
    const authors = await User.find({role: "Author"})
    res.status(200).json({
        success: true,
        authors
    })
})

export const updateMyProfile = catchAsyncErrors(async(req,res,next) => {
    const {userId} = req.id;

    const user = await User.findOne(userId).select('-password');
    
    if(!user) return next(new ErrorHandler("User not found", 400))

    if(req.files){

        const {avatar} = req.files;
        const allowedFormats = ["image/png" , "image/webp" , "image/jpeg" , "image/jpg"]
        if(!allowedFormats.includes(avatar.mimetype)){
            return next(new ErrorHandler(
                "Invalid file type. Please provide your avatar in png, jpeg, jpg or webp format", 400)
            )
        }

        if(req.files && avatar){
            const userAvatar = user.avatar.public_id
            await cloudinary.uploader.destroy(userAvatar)
            const newUserAvatarImage = await cloudinary.uploader.upload(avatar.tempFilePath)
            newUserData.avatar = {
                public_id: newUserAvatarImage.public_id,
                url: newUserAvatarImage.secure_url
            }
        }

    }
    
    user = {
        email: req.body.email,
        phone : req.body.phone
    }

    await user.save()

    res.status(200).json({
        success: true,
        message: "User Updated Succesfully",
        user
    })
})

export const deleteMyProfile = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params;
    const user = await User.findById(id)
    if(!user) {
        return next(new ErrorHandler("User not found"), 404)
    }
    await user.deleteOne()
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user
    })
})