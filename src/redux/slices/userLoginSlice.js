import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

export const  userLoginThunk=createAsyncThunk('userLogin',async(personCred,thunkApi)=>{
    let res;
    res=  await axios.post('http://localhost:4000/person-api/login',personCred)
    
    if(res.data.message==='Login success'){
        //store jwt token in local/session storage
        sessionStorage.setItem('token',res.data.token)
        return res.data;
    }else{
        return thunkApi.rejectWithValue(res.data.message)
    }
})





export const userLoginSlice=createSlice({
    name:'user-login-slice',
    initialState:{isPending:false,currentUser:{},errorStatus:false,errorMessage:"",loginStatus:false},
    reducers:{
        resetState:(state,payload)=>{
            state.isPending=false;
            state.currentUser={};
            state.errorStatus=false;
            state.errorMessage="";
            state.loginStatus=false;
        }
    },
    extraReducers:builder=>builder
    .addCase(userLoginThunk.pending,(state,action)=>{
        state.isPending=true;

    })
    .addCase(userLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        state.currentUser=action.payload.user;
        state.errorStatus=false;
        state.errorMessage=""
        state.loginStatus=true;
    })
    .addCase(userLoginThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentUser={};
        state.errorStatus=true;
        state.errorMessage=action.payload;
        state.loginStatus=false;
    })
})


//export root reducer of userLoginSlice
export default userLoginSlice.reducer;
//export action cretor functors
export const {resetState}=userLoginSlice.actions;