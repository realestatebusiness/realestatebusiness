export interface JwtPayload {
    userId: string;
    role:string;
  }
  declare global{
    namespace Express{
        interface Request{
            user?:UserPayload;
            userId: string;
            userRole: string;
        }
    }
}