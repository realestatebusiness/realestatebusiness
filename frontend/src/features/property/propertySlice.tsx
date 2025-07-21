import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { VillaProperty } from "../../types/propertyInterface.";


interface PropertyState {
    properties:VillaProperty[]
    loading:boolean;
    error:string |null;

}
const initialState: PropertyState={
    properties:[],
    loading:false,
    error:null
};

const propertySlice=createSlice({

    name:'property',
    initialState,
    reducers:{
       fetchPropertiesStart(state){
        state.loading=true;
        state.error=null;
       },
       fetchPropertiesSuccess(state,action:PayloadAction<VillaProperty[]>){
        state.properties=action.payload;
        state.loading=false;
       },
       fetchPropertiesFailure(state,action:PayloadAction<string>){
        state.error=action.payload;
        state.loading=false;
       }
    }
})

export const{ fetchPropertiesStart,fetchPropertiesSuccess,fetchPropertiesFailure}=propertySlice.actions;
export default propertySlice.reducer;