const express=require('express')
const { userRegistr, userLogin, profilePhotoUploadCtrlr, fetchAllUsers } = require('../../controllers/users/usrCtrlr')
const authMiddleware = require('../../middlewares/auth/authMiddleware')
const { photoUpload, profilePhotoResize } = require('../../middlewares/uploads/photoUpload')

const userRoutes=express.Router()    

userRoutes.post('/register',userRegistr)
userRoutes.post('/login',userLogin)
userRoutes.get('/fetchusers',fetchAllUsers)
userRoutes.put('/profilephoto-upload',authMiddleware,photoUpload.single('image'),profilePhotoResize,profilePhotoUploadCtrlr)       

module.exports=userRoutes      