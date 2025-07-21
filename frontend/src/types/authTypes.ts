export interface User {
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
  role: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  city: string;
  address: string;
  landline: string;
  state: string;
  promoMails: boolean;
  token: string;
  userId: string;
  user: {
    isActive: boolean;
    role: string[];
    name: string;
    email: string;
    phoneNumber: string;
    address?: string;
    city?: string;
    landline?: string;
    profilePhoto?: string;
    companyLogo?: string;
  };
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: (string | null)[];
    favoriteProducts: any[]; // Replace `any` with the actual type if known
    status: string;
    version: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
