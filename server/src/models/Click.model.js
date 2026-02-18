import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      index: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true },
);

const Click = mongoose.model("Click", clickSchema);

export default Click;
