const expressAsyncHandler=require('express-async-handler')
const fs=require('fs')
const Post=require('../../model/post/post');
const cloudinaryUploadImg = require('../../utils/cloudinary');
const validateMongodbId=require('../../utils/validateMongodbId')

const createPostCtrlr=expressAsyncHandler(async (req,res)=>{
   // console.log(req.file);
   // console.log(req.user);
  
   const {_id}=req.user
// console.log(req.body.user);
   
   // validateMongodbId(req.body.user)
// console.log(req.body);

 //1.get the oath to img
 const localPath=`public/images/posts/${req.file.filename}`
 //2.upload to cloudinary
 const imgUploaded=await cloudinaryUploadImg(localPath)
 
   try {
    const post=await Post.create({...req.body,
   
   user:_id,
   image:imgUploaded?.url
   
   })
   

    
    res.json(imgUploaded)
    //remove uploaded img
   //  fs.unlinkSync(localPath)
   } catch (error) {
    res.json(error)
   }
})


//fetch all posts
const fetchController=expressAsyncHandler(async(req,res)=>{
   const hasCategory=req.query.category
try {
   if(hasCategory){
   const posts=await Post.find({category:hasCategory}).populate('user').populate('comments').sort('-createdAt')
   console.log(posts);
   res.json(posts)
}else{
   const posts=await Post.find({}).populate('user').populate('comments').sort('-createdAt')
   res.json(posts)
}
} catch (error) {
   
}
  
})

//fetch single post
// const fetchById=expressAsyncHandler(async(req,res)=>{
//    console.log(req.params);
//    const param=await Post.findById(req.params.id)
//    res.json(param)
// })
const fetchPostCtrlr=expressAsyncHandler(async(req,res)=>{
   const {id}=req.params
   validateMongodbId(id)
   try {
      
      const post=await Post.findById(id).populate('user').populate('likes').populate('disLikes').populate('comments')
//update number of views
      await Post.findByIdAndUpdate(id,{   
         $inc:{numViews:1}
      },{new:true})

   res.json(post)
   } catch (error) {
      res.json(error)
   }
   
})

//update post
   const updatePostCtrl=expressAsyncHandler(async(req,res)=>{
      const {id}=req.params
      validateMongodbId(id)

      try{

         const post=await Post.findByIdAndUpdate(id,
            {...req.body,
            user:req?.user?._id
            },
            {
               new:true
            })
            res.json(post)
      }catch(error){

      }
   })

  // delete post controller
   const deleteController=expressAsyncHandler(async(req,res)=>{

      const {id}=req.params
      validateMongodbId(id)
      try {
         const deleted=await Post.findByIdAndDelete(id)
         res.json(deleted)
      } catch (error) {
         res.json(error)
      }
     
   })

   //like posts
   const likePostCtrlr=expressAsyncHandler(async(req,res)=>{   
 //1.Find the post to be liked
 const { postId } = req.body;
 const post = await Post.findById(postId);
 //2. Find the login user
 const loginUserId = req?.user?._id;
 //3. Find is this user has liked this post?
 const isLiked = post?.isLiked;
 //4.Chech if this user has dislikes this post
 const alreadyDisliked = post?.disLikes?.find(
   userId => userId?.toString() === loginUserId?.toString()
 );
 //5.remove the user from dislikes array if exists
 if (alreadyDisliked) {
   const post = await Post.findByIdAndUpdate(
     postId,
     {
       $pull: { disLikes: loginUserId },
       isDisLiked: false,
     },
     { new: true }
   );
   res.json(post);
 }
 //Toggle
 //Remove the user if he has liked the post
 if (isLiked) {
   const post = await Post.findByIdAndUpdate(
     postId,
     {
       $pull: { likes: loginUserId },
       isLiked: false,
     },
     { new: true }
   );
   res.json(post);
 } else {
   //add to likes
   const post = await Post.findByIdAndUpdate(     
     postId,
     {
       $push: { likes: loginUserId },
       isLiked: true,
     },
     { new: true }
   );
   res.json(post);
 }
   })

   const toggleAddDislikeToPostCtrl = expressAsyncHandler(async (req, res) => {
      //1.Find the post to be disLiked
      const { postId } = req.body;
      const post = await Post.findById(postId);
      //2.Find the login user
      const loginUserId = req?.user?._id;
      //3.Check if this user has already disLikes
      const isDisLiked = post?.isDisLiked;
      //4. Check if already like this post
      const alreadyLiked = post?.likes?.find(
        userId => userId.toString() === loginUserId?.toString()  
      );
      //Remove this user from likes array if it exists
      if (alreadyLiked) {
        
        const post = await Post.findByIdAndUpdate(    
          postId,
          {
            $pull: { likes: loginUserId },      
            isLiked: false,    
          },
          { new: true }
        );
        res.json(post);
      }
      //Toggling
      //Remove this user from dislikes if already disliked
      if (isDisLiked) {
        const post = await Post.findByIdAndUpdate(
          postId,
          {
            $pull: { disLikes: loginUserId },
            isDisLiked: false,
          },
          { new: true }
        );
        res.json(post);
      } else {
        const post = await Post.findByIdAndUpdate(
          postId,
          {
            $push: { disLikes: loginUserId },
            isDisLiked: true,
          },
          { new: true }
        );
        res.json(post);
      }
    });
    



module.exports={createPostCtrlr,fetchController,fetchPostCtrlr,updatePostCtrl,deleteController,likePostCtrlr,toggleAddDislikeToPostCtrl}






