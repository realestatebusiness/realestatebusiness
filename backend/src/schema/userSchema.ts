import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
    Admin = 'admin',
    Buyer = 'buyer',
    Owner = 'owner',
    Tenant = 'tenant',
    Agent = 'agent',
    Builder = 'builder'
}
export enum Status {
    Active = 'active',
    InActive = 'inactive',
    Deleted = 'deleted',
}
interface User extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: UserRole[];
    favoriteProducts: mongoose.Types.ObjectId[];
    status: Status;
    version: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: mongoose.Schema.Types.ObjectId;
    updatedBy?: mongoose.Schema.Types.ObjectId;
    isActive: boolean;
    

}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: [String], enum: Object.values(UserRole), requred: true },
    favoriteProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    }],
    status: { type: String, enum: Object.values(Status), default: Status.Active },
    version: { type: Number, default: 1 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
},
{
    timestamps:true
});

const UserModel=mongoose.model<User>('User',userSchema);

export default UserModel;