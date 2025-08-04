import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import propertyReducer from "../features/property/propertySlice"
import filterReducer from '../features/Filters/filterSlice';
import typeOfPropertyReducer from '../features/PropertyType/typeOfPropertySlice';
import constructionstatusandbedroomfilterReducer from '../features/constructionstatusandbedroomfilter/constructionstatusandbedroomfilterSlice';
import userProfileReducer from "../features/userProfile/userProfileSlice"; 
import areaAndAmenitiesFilterReducer from "../features/areaAndAmenitiesFilter/areaAndAmenitiesFilterSlice";

export const store = configureStore({
   reducer: {
      auth: authReducer,
      property: propertyReducer,
      filters: filterReducer,
      typeOfProperty: typeOfPropertyReducer,
      constructionstatusandbedroomfilter: constructionstatusandbedroomfilterReducer,
       userProfile: userProfileReducer,
       areaAndAmenitiesFilter: areaAndAmenitiesFilterReducer,
   }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch