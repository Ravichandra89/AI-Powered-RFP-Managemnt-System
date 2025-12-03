import { Schema, model, Document } from "mongoose";

export interface VendorDocument extends Document {
  name: string;
  email: string;
  category?: string;
  phone?: string;
  address?: string;
  active: boolean;
  created_at: Date;
}


const VendorSchema = new Schema<VendorDocument>(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      trim: true
    },

    category: {
      type: String,
      default: "General"
    },

    phone: {
      type: String
    },

    address: {
      type: String
    },

    active: {
      type: Boolean,
      default: true
    },

    created_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true 
  }
);


export const VendorModel = model<VendorDocument>("Vendor", VendorSchema);
