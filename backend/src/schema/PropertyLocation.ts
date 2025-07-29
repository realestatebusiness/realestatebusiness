import mongoose, { Document, Schema } from "mongoose";

export interface PropertyLocation extends Document {
  title: string;
  price: number;
  description: string;
  address: string;
  city: string;
  state: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
}


const PropertyLocationSchema = new Schema<PropertyLocation>({
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// Geospatial index
PropertyLocationSchema.index({ location: "2dsphere" });

export default mongoose.model<PropertyLocation>("Property", PropertyLocationSchema);
