const express=require('express')
const { createCategoryCtrlr, fetchCategoriesCtrl, fetchSingleCategoryCtrlr, updateCategoryCtrlr, deleteCategoryCtrlr } = require('../../controllers/category/categoryCtrlr')

const authMiddleware = require('../../middlewares/auth/authMiddleware')

const categoryRoute=express.Router()

categoryRoute.post('/',authMiddleware,createCategoryCtrlr)
categoryRoute.get('/getcategories',fetchCategoriesCtrl)
categoryRoute.get('/getsinglecategory/:id',authMiddleware,fetchSingleCategoryCtrlr)
categoryRoute.put('/updatecategory/:id',authMiddleware,updateCategoryCtrlr)
categoryRoute.delete('/deletecategory/:id',authMiddleware,deleteCategoryCtrlr)

module.exports=categoryRoute