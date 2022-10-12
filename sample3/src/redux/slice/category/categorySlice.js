import {createAsyncThunk,createSlice,createAction} from '@reduxjs/toolkit'

import axios from 'axios'
import baseUrl from '../../../utils/baseUrl'

//action to redirect
const resetEditAction=createAction('category/reset')
const resetDeleteAction=createAction('category/delete-reset')
const resetCategoryAction=createAction('category/add-reset')



//action
export const createCategoryAction=createAsyncThunk(
    'category/create',async(category,{rejectWithValue,getState,dispatch})=>{
        //get user token
        console.log(category);
        // console.log(getState());
        const user=getState()?.users
        const {userAuth}=user
        // console.log(userAuth?.token);
        // console.log(getState());
        const config={
            headers:{
                Authorization:`Bearer ${userAuth?.token}`
            }
        }
        //http call
        
        try {
            
            const {data}=await axios.post(`${baseUrl}/api/category/`,{
                title:category?.title
            },
            config
            )
             dispatch(resetCategoryAction())
            // console.log(data);
            return data
        } catch (error) {
            if(!error?.response){
                
                throw error
            }
            return rejectWithValue(error?.response?.data)
        }
    })
//fetch all categories
    export const fetchCategoriesAction=createAsyncThunk(
        'category/fetch',async(category,{rejectWithValue,getState,dispatch})=>{
            //get user token
            const user=getState()?.users
            const {userAuth}=user
            // console.log(userAuth?.token);
            // console.log(getState());
            const config={
                headers:{
                    Authorization:`Bearer ${userAuth?.token}`
                }
            }
            //http call
            
            try {
                
                const {data}=await axios.get(`${baseUrl}/api/category/getcategories`,
                config
                )
    
                // console.log(data);
                return data
            } catch (error) {
                if(!error?.response){
                    
                    throw error
                }
                return rejectWithValue(error?.response?.data)
            }
        })

        //update categories

        export const updateCategoriesAction=createAsyncThunk(
            'category/update',async(category,{rejectWithValue,getState,dispatch})=>{
                console.log(category);
                //get user token
                const user=getState()?.users
                const {userAuth}=user
                // console.log(userAuth?.token);
                // console.log(getState());
                const config={
                    headers:{
                        Authorization:`Bearer ${userAuth?.token}`
                    }
                }
                //http call
                
                try {
                    
                    const {data}=await axios.put(`${baseUrl}/api/category/updatecategory/${category?.id}`,
                    {
                      title:category?.title
                    },
                    config
                    )
                    //dispatch action to reset the updated data
                    dispatch(resetEditAction())
                    // console.log(data);
                    return data
                } catch (error) {
                    if(!error?.response){
                        
                        throw error
                    }
                    return rejectWithValue(error?.response?.data)
                }
            })

            //delete
            export const deleteCategoriesAction=createAsyncThunk(
                'category/delete',async(id,{rejectWithValue,getState,dispatch})=>{
                    //get user token
                    const user=getState()?.users
                    const {userAuth}=user
                    // console.log(userAuth?.token);
                    // console.log(getState());
                    const config={
                        headers:{
                            Authorization:`Bearer ${userAuth?.token}`
                        }
                    }
                    //http call
                    
                    try {
                        
                        const {data}=await axios.delete(`${baseUrl}/api/category/deletecategory/${id}`,
                        config
                        )
                        dispatch(resetDeleteAction())
                        // console.log(data);
                        return data
                    } catch (error) {
                        if(!error?.response){
                            
                            throw error
                        }
                        return rejectWithValue(error?.response?.data)
                    }
                })

                //fetch details
                export const fetchCategoryAction=createAsyncThunk(
                    'category/details',async(id,{rejectWithValue,getState,dispatch})=>{
                        //get user token
                        const user=getState()?.users
                        const {userAuth}=user
                        // console.log(userAuth?.token);
                        // console.log(getState());
                        const config={
                            headers:{
                                Authorization:`Bearer ${userAuth?.token}`
                            }
                        }
                        //http call
                        
                        try {
                            
                            const {data}=await axios.get(`${baseUrl}/api/category/getsinglecategory/${id}`,
                            config
                            )
                
                            // console.log(data);
                            return data
                        } catch (error) {
                            if(!error?.response){
                                
                                throw error
                            }
                            return rejectWithValue(error?.response?.data)
                        }
                    })
    
    

    //slices

   

    const categorySlices=createSlice({
        name:'category',
        initialState:{},
        extraReducers:(builder)=>{
            //create
            builder.addCase(createCategoryAction.pending,(state,action)=>{
                state.loading=true
            })
            //dispatch action
            builder.addCase(resetCategoryAction,(state,action)=>{
                state.isCreated=true
            })
            builder.addCase(createCategoryAction.fulfilled,(state,action)=>{
                console.log(state);  
                state.category=action?.payload
                state.isCreated=false
                state.loading=false
               state.appErr=undefined
               state.serverErr=undefined
            })
            builder.addCase(createCategoryAction.rejected,(state,action)=>{    
                state.loading=false
                state.appErr=action?.payload?.message
                state.serverErr=action?.error?.message
            })
            //fetch all
            builder.addCase(fetchCategoriesAction.pending,(state,action)=>{
                state.loading=true
            })
            builder.addCase(fetchCategoriesAction.fulfilled,(state,action)=>{
                state.categoryList=action?.payload
                state.loading=false
                state.appErr=undefined
                state.serverErr=undefined

            })
            builder.addCase(fetchCategoriesAction.rejected,(state,action)=>{    
                state.loading=false
                state.appErr=action?.payload?.message
                state.serverErr=action?.error?.message
            })
            //update
            builder.addCase(updateCategoriesAction.pending,(state,action)=>{
                state.loading=true
            })
            //dispatch action
            builder.addCase(resetEditAction,(state,action)=>{
                state.isEdited=true
            })
            builder.addCase(updateCategoriesAction.fulfilled,(state,action)=>{
                state.updatedCategory=action?.payload
                state.isEdited=false
                state.loading=false
                state.appErr=undefined
                state.serverErr=undefined

            })
            builder.addCase(updateCategoriesAction.rejected,(state,action)=>{       
                state.loading=false
                state.appErr=action?.payload?.message
                state.serverErr=action?.error?.message
            })
            //delete
            builder.addCase(deleteCategoriesAction.pending,(state,action)=>{
                state.loading=true
            })
            //dispatch action
            builder.addCase(resetDeleteAction,(state,action)=>{
                state.isDeleted=true
            })
            builder.addCase(deleteCategoriesAction.fulfilled,(state,action)=>{
                
                state.deletedCategory=action?.payload
                state.isDeleted=false
                state.loading=false
                state.appErr=undefined
                state.serverErr=undefined

            })
            builder.addCase(deleteCategoriesAction.rejected,(state,action)=>{       
                state.loading=false
                state.appErr=action?.payload?.message
                state.serverErr=action?.error?.message
            })
            //fetch details

            builder.addCase(fetchCategoryAction.pending,(state,action)=>{
                state.loading=true
            })
            builder.addCase(fetchCategoryAction.fulfilled,(state,action)=>{
                state.category=action?.payload
                state.loading=false
                state.appErr=undefined
                state.serverErr=undefined

            })
            builder.addCase(fetchCategoryAction.rejected,(state,action)=>{       
                state.loading=false
                state.appErr=action?.payload?.message
                state.serverErr=action?.error?.message
            })
        }
    })

    export default categorySlices.reducer

