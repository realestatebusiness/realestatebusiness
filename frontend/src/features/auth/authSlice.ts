import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/authTypes";


interface AuthState{
   user:User |null;
   token:string |null;
   loading:boolean;
   error:string |null;

}
const initialState:AuthState={
    user:null,
    token:null,
    loading:false,
    error:null
}

const authSlice=createSlice({
  name:'auth',
  initialState,
  reducers:{
    login:(state,action:PayloadAction<{user:User;token:string}>)=>{
        state.loading=false;
        state.user=action.payload.user;
        state.token=action.payload.token;

    },
    logout:state=>{
        state.user=null;
        state.token=null;
    },
     setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  }  
})

export const {login,logout,setToken}=authSlice.actions;
export default authSlice.reducer;