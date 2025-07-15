
export interface JwtPayload {
  userId: string;
  role: string;
}
declare global {
  namespace Express {
    interface Request {
      userId?: string; 
      userRole?: string;
    }
  }
}

