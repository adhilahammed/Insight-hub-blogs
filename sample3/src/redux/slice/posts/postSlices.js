import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
//Create Post action

 const postCreatedAction=createAction('post')
 const resetPostEdit = createAction("post/reset");
 const resetPostDelete = createAction("post/delete");

export const createpostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    console.log(post);
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category);
      formData.append("image", post?.image);
      const { data } = await axios.post(`${baseUrl}/api/posts`, formData, config);
      dispatch(postCreatedAction())
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update
export const updatePostAction = createAsyncThunk(
  "post/updated",
  async (post, { rejectWithValue, getState, dispatch }) => {
    console.log(post);
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.put(
        `${baseUrl}/api/posts/${post?.id}`,
        post,
        config
      );
      //dispatch
      dispatch(resetPostEdit());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


//Delete
export const deletePostAction = createAsyncThunk(
  "post/delete",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.delete(
        `${baseUrl}/api/posts/remove/${postId}`,
        config
      );
      //dispatch
      dispatch(resetPostDelete());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all posts
//fetch all posts
export const fetchPostsAction = createAsyncThunk(
  "post/list",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/posts/fetch?category=${category}`
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch Post details
export const fetchPostDetailsAction = createAsyncThunk(
  "post/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/posts/fetchById/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


//likes
export const likeAction=createAsyncThunk('post/likes',
async(postId,{ rejectWithValue, getState, dispatch })=>{
console.log(postId);
  try {
    const user=getState()?.users
    const {userAuth}=user
    console.log(userAuth);
    const config={
      headers:{
        Authorization:`Bearer ${userAuth?.token}`
      }
    }
    const {data}=await axios.put(`${baseUrl}/api/posts/likes`,
    {postId},
    config,
    
    )
    
    console.log('kkk');

    return data  

  } catch (error) {
    if (!error?.response) throw error;
    return rejectWithValue(error?.response?.data);
  }
})

//dislikes
export const dislikeAction=createAsyncThunk('post/dislikes',  
async(postId,{ rejectWithValue, getState, dispatch })=>{
  try {
    const user=getState()?.users
    const {userAuth}=user

    const config={
      headers:{
        Authorization:`Bearer ${userAuth?.token}`
      }
    }

    const {data}=await axios.put(`${baseUrl}/api/posts/dislikes`,
    {postId},
    config
    )
    return data
  } catch (error) {
    if (!error?.response) throw error;
    return rejectWithValue(error?.response?.data);
  }
})


//slice

const postSlice = createSlice({
  name: "post",
  initialState: {  },
  extraReducers: builder => {
    builder.addCase(createpostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postCreatedAction, (state, action) => {
      state.isPosted = true;
    });
    builder.addCase(createpostAction.fulfilled, (state, action) => {
      state.postCreated = action?.payload;
      state.isPosted = false
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createpostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Update post
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetPostEdit, (state, action) => {
      state.isUpdated = true;
    });

    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isUpdated = false;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Delete post
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostDelete, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload;
      state.isDeleted = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    
     //fetch posts
     builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.postLists = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

     //fetch post Details
     builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.postDetails = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //likes
    builder.addCase(likeAction.pending,(state,action)=>{
      state.loading=true
    })

    builder.addCase(likeAction.fulfilled,(state,action)=>{
     state.loading=false
     state.likes=action?.payload
     state.appErr = undefined;
    state.serverErr = undefined;
     
    })
    builder.addCase(likeAction.rejected,(state,action)=>{
     state.loading=false
     state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })

    //dislikes
    builder.addCase(dislikeAction.pending,(state,action)=>{
   state.loading=true
    })
    builder.addCase(dislikeAction.fulfilled,(state,action)=>{
      state.loading=false
      state.dislikes=action?.payload
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    builder.addCase(dislikeAction.rejected,(state,action)=>{
      state.loading=false
      state.appErr = action?.payload?.message;
       state.serverErr = action?.error?.message;
    })
  },
});

export default postSlice.reducer;
