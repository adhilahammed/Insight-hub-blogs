const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/category");

const createCategoryCtrlr=expressAsyncHandler(async(req,res)=>{
    try {
        console.log('sfd');
        const category=await Category.create({
            user:req.user._id,
            title:req.body.title
        })
        res.json(category)
    } catch (error) {
        res.json(error)
    }
})

const fetchCategoriesCtrl=expressAsyncHandler(async(req,res)=>{
    try {
        const categories=await Category.find({}).populate('user')
        .sort('-createdAt')
        res.json(categories)
    } catch (error) {
        res.json(error)
    }
   
})

const fetchSingleCategoryCtrlr=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params
    try {
        const singeCategory=await Category.findById(id).populate('user')
        .sort('-createdAt')
        res.json(singeCategory)
    } catch (error) {
        res.json(error)
    }
})

//update category
const updateCategoryCtrlr=expressAsyncHandler(async(req,res)=>{

    try {
        
        const updatedCategory=await Category.findByIdAndUpdate(req.params.id,{
            ...req.body,
            user:req.user._id
        },{
            new:true,
            runValidators:true
        })
        res.json(updatedCategory)
    } catch (error) {
        res.json(error)
    }
   
})

//delete category
const deleteCategoryCtrlr=expressAsyncHandler(async(req,res)=>{
    try {
        const deletedCategory=await Category.findByIdAndDelete(req.params.id)
        res.json(deletedCategory)
    } catch (error) {
        res.json(error)
    }
})
module.exports={createCategoryCtrlr,fetchCategoriesCtrl,fetchSingleCategoryCtrlr,updateCategoryCtrlr,deleteCategoryCtrlr}