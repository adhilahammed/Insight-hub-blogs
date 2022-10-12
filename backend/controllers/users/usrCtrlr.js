
const expressAsyncHandler=require('express-async-handler');
const createToken = require('../../config/token/token');
const User=require('../../model/user/user');
const cloudinaryUploadImg = require('../../utils/cloudinary');




const userRegistr=expressAsyncHandler(async(req,res)=>{
  console.log(req.body);   
  const userExist=await User.findOne({email:req?.body?.email})
  if(userExist) throw new Error('user already exist')
  try {
    const user=await  User.create({
      firstName:req?.body?.firstName,
      lastName:req?.body?.lastName,
      email:req?.body?.email,
      password:req?.body?.password  
    }) 
    res.json(user)
  } catch (error) {
      res.json(error)
  }
  })

  const userLogin=expressAsyncHandler(async (req,res)=>{

    const {email,password}=req.body
    const userFound=await User.findOne({email})
    console.log(userFound);
   if(userFound && (await userFound.isPasswordMatch(password))){
    res.json({
      _id:userFound?._id,
      firstName:userFound?.firstName,
      lastName:userFound?.lastName,
      email:userFound?.email,
      profilePhoto:userFound?.profilePhoto,
      isAdmin:userFound?.isAdmin,
      token:createToken(userFound?._id)
    })
   }else{
    res.status(401)
    throw new Error('invalid login credentials')
   }
  })

  const fetchAllUsers=expressAsyncHandler(async(req,res)=>{

    const users=await User.find({}).populate('posts')
    res.json(users)
  }

  )

  //profile photo upload
  const profilePhotoUploadCtrlr=expressAsyncHandler(async(req,res)=>{
    //1.get the oath to img
    const localPath=`public/images/profile/${req.file.filename}`
    //2.upload to cloudinary
    const imgUploaded=await cloudinaryUploadImg(localPath)
    
    res.json(localPath)
  })

    module.exports={userRegistr,userLogin,profilePhotoUploadCtrlr,fetchAllUsers}   