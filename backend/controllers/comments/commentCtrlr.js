const expressAsyncHandler = require("express-async-handler");
const Comment=require('../../model/comment/Comment')

const commentCtrlr=expressAsyncHandler(async(req,res)=>{
const user=req.user
const {postId,description}=req.body
    try {
        const comments=await Comment.create({
            user,
            post:postId,
            description
        })
        res.json(comments)
    } catch (error) {
        res.json(error)
    }
   
})

const fetchCommentCtrlr=expressAsyncHandler(async(req,res)=>{

    try {
        const fetchComments=await Comment.find({}).sort('-createdAt')
        res.json(fetchComments)
    } catch (error) {
        res.json(error)
    }
})

const fetchSingleComment=expressAsyncHandler(async(req,res)=>{

    const {id}=req.params
    try {
        const single=await Comment.findById(id)
        res.json(single)
    } catch (error) {
        res.json(error)
        
    }
})

//update post
const updateComment=expressAsyncHandler(async(req,res)=>{

    const {id}=req.params
    try {
        
        const updateComment=await Comment.findByIdAndUpdate(id,{
            post:req?.body?.postId,
            user:req?.user,
            description:req?.body?.description
        },{
            new:true,
            runValidators:true
        })
        res.json(updateComment)
      
    } catch (error) {
        res.json(error)
    }

})

module.exports={commentCtrlr,fetchCommentCtrlr,fetchSingleComment,updateComment}