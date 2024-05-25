// create redux store 
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// make http request using redux thunk middleware
export const userAuthorLoginThunk = createAsyncThunk('user-author-login',async (userCredObj,thunkApi)=> {
    try{
        if(userCredObj.userType==='user') 
        {
            const res = await axios.post('http://localhost:40001/user-api/login',userCredObj)
            if(res.data.message==='login success'){
                // store token in local/session storage
                localStorage.setItem('token',res.data.token)
            
                //return data   
                return res.data;
            }
            else {
                return thunkApi.rejectWithValue(res.data.message)
            }
        }
        if(userCredObj.userType==='author')
        {
            const res = await axios.post('http://localhost:40001/author-api/login',userCredObj)
            if(res.data.message==='login success'){
                // store token in local/session storage
                localStorage.setItem('token',res.data.token)
                
                //return data   
                return res.data;
            }
            else {
                return thunkApi.rejectWithValue(res.data.message)
            }    
        }
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
        
} )


export const userAuthorSlice =  createSlice({
    name:'user-author-login',
    initialState:{
        isPending : false, //partial loading where loader are placed
        loginUserStatus: false,
        currentUser : {},
        errOccured : false,
        errMsg : ''
    },
    // to deal with the local state
    reducers:{
        resetState : (state,action)=> {
            state.isPending = false;
            state.loginUserStatus = false;
            state.currentUser = {};
            state.errOccured = false;
            state.errMsg = ''
        }
    },
    // to deal with the external state
    extraReducers: builder => builder
    // to deal with the pending state
    .addCase(userAuthorLoginThunk.pending,(state,action)=>{
        state.isPending = true;
        state.loginUserStatus = false;
        state.errOccured = true;
        state.errMsg = action.payload;
    })
    // to deal with the fulfilled state
    .addCase(userAuthorLoginThunk.fulfilled,(state,action)=>{
        state.isPending = false;
        state.currentUser = action.payload.user ;
        state.loginUserStatus = true;
        state.errMsg = '';
        state.errOccured = false ;
    })
    // to deal with the rejected state
    .addCase(userAuthorLoginThunk.rejected,(state,action)=>{
        state.isPending = false;
        state.currentUser = {};
        state.loginUserStatus = false;
        state.errMsg = action.payload;
        state.errOccured = true;
    })
})


// export action creator functions
export const {resetState}=userAuthorSlice.actions

// export root reducer of this slice
export default userAuthorSlice.reducer


