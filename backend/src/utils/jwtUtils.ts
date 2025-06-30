import jwt from 'jsonwebtoken';

const generateToken=(userId:string,role:string)=>{
    const payload={userId,role};
    const token=jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:'30d'});
    return token;
}

export default generateToken;