const express=require('express')
const { commentCtrlr, fetchCommentCtrlr, fetchSingleComment, updateComment } = require('../../controllers/comments/commentCtrlr')

const authMiddleware = require('../../middlewares/auth/authMiddleware')

const commentRouter=express.Router()

commentRouter.post('/create',authMiddleware,commentCtrlr)
commentRouter.get('/',authMiddleware,fetchCommentCtrlr)
commentRouter.get('/:id',authMiddleware,fetchSingleComment)
commentRouter.put('/update/:id',authMiddleware,updateComment)




module.exports=commentRouter