export interface User {
  name: string;
  email: string;
  role: string[]; 
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: UserProfile;
  statusCode?: number;

}
export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  role:string;
  phoneNumber: string;
}
export interface LoginFormData {
  email: string;
  password: string;
  phoneNumber:string;
}

export interface UserProfile {
  token: string;
  userId: string;
  user: {
    isActive: boolean;
    role: string[];
    name: string;
    email: string;
    phoneNumber: string;
  };
}