import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
  Admin = "admin",
  Buyer = "buyer",
  Owner = "owner",
  Tenant = "tenant",
  Agent = "agent",
  Builder = "builder",
}
export enum Status {
  Active = "active",
  InActive = "inactive",
  Deleted = "deleted",
}
interface User extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: UserRole[];
    userlocation:mongoose.Types.ObjectId[];
    favoriteProducts: mongoose.Types.ObjectId[];
    status: Status;
    version: number;
    createdAt: Date;
    updatedAt: Date;
    landline:string;
    address:string;
    profilePhoto:string;
    companyLogo:string;
    location?:mongoose.Schema.Types.ObjectId;
    city:string;
    state:string;
    createdBy?: mongoose.Schema.Types.ObjectId;
    updatedBy?: mongoose.Schema.Types.ObjectId;
    isActive: boolean;
  

}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    role: { type: [String], enum: Object.values(UserRole), required: true },

    favoriteProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
     userlocation :[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
     ],
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.Active,
    },
    version: { type: Number, default: 1 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },

    // fields for profile update

    landline: { type: String },
    address: { type: String },
    profilePhoto: { type: String },

    companyLogo: { type: String },
    city:{type:String},
    state:{type:String},
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
