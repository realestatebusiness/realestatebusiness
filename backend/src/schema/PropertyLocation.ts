import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  address: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
});

// ✅ Explicitly create geospatial index
PropertySchema.index({ location: "2dsphere" });

export default mongoose.model("Property", PropertySchema);
