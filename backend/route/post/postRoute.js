const express=require('express')

const postRoute=express.Router()

const {createPostCtrlr, fetchController, fetchById, fetchPostCtrlr, updatePostCtrl, deleteController, likePostCtrlr, toggleAddDislikeToPostCtrl} =require('../../controllers/post/postCtrlr')
const authMiddleware=require('../../middlewares/auth/authMiddleware')
const { photoUpload,postImgResize } = require('../../middlewares/uploads/photoUpload')


postRoute.post('/',authMiddleware,photoUpload.single('image'),postImgResize,createPostCtrlr)  

postRoute.get('/fetch',fetchController)
postRoute.get('/fetchbyid/:id',fetchPostCtrlr)
postRoute.put('/likes',authMiddleware,likePostCtrlr)
postRoute.put('/dislikes',authMiddleware,toggleAddDislikeToPostCtrl)

postRoute.put('/:id',authMiddleware,updatePostCtrl)

postRoute.delete('/remove/:id',authMiddleware,deleteController)




module.exports=postRoute