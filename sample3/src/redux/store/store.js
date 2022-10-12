import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slice/users/userSlices'
import categoryReducer from '../slice/category/categorySlice'
import post from '../slice/posts/postSlices'
import comment from '../slice/comments/commentSlices'


const store=configureStore({
    reducer:{
        users:userReducer,
        category:categoryReducer,
        post,
        comment
    }
})

export default store