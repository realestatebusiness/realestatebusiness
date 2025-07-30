import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import propertyReducer from "../features/property/propertySlice"
import filterReducer from '../features/Filters/filterSlice';
import typeOfPropertyReducer from '../features/PropertyType/typeOfPropertySlice';
import constructionstatusandbedroomfilterReducer from '../features/constructionstatusandbedroomfilter/constructionstatusandbedroomfilterSlice';




export const store = configureStore({
   reducer: {
      auth: authReducer,
      property: propertyReducer,
      filters: filterReducer,
      typeOfProperty: typeOfPropertyReducer,
      constructionstatusandbedroomfilter: constructionstatusandbedroomfilterReducer,
   }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch