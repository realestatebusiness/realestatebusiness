export interface User {
    _id: string;
  name: string;
  email: string;
  // role: string[]; 
  role: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  statusCode?: number;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  phoneNumber: string;
}

export interface UserProfile {
  username?: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: string[]; 
  favoriteProducts: string[]; 
  userlocation: string[]; 
  status: string; 
  version: number;
  createdBy?: string; 
  updatedBy?: string; 
  isActive: boolean;
  landline?: string;
  address?: string;
  profilePhoto?: string;
  city?: string;
  state?: string;
  companyLogo?: string;
  location?: string | { // Add this union type
    _id: string;
    title: string;
    city: string;
    state: string;
    location: {
      type: string;
      coordinates: number[];
    };
    price: number;
    description: string;
    address: string;
    __v: number;
  }; 
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: string[];
    favoriteProducts: string[];
    userlocation: string[];
    status: string;
    version: number;
    createdBy?: string;
    updatedBy?: string;
    isActive: boolean;
    landline?: string;
    address?: string;
    city?: string;
    state?: string;
    profilePhoto?: string;
    companyLogo?: string;
    location?: string | {
      location: {
        type: string;
        coordinates: number[];
      };
      _id: string;
      title: string;
      price: number;
      description: string;
      address: string;
      city: string;
      state: string;
      __v: number;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}