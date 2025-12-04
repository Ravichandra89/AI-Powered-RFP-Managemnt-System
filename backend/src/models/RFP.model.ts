import { Schema, model, Document, Types } from "mongoose";

export interface rfpItem {
  item_id: string;
  name: string;
  quantity: number;
  specs: Record<string, string>;
}

export interface rfpDocument extends Document {
  title: string;
  description?: string;
  budget: number;
  delivery_timeline_days: number;
  payment_terms: string;
  warranty_min_years: number;
  status: "OPEN" | "CLOSED" | "CANCELLED";
  created_at: Date;
  items: rfpItem[];
}

/** RFP ITEM SCHEMA */
const rfpItemSchema = new Schema<rfpItem>(
  {
    item_id: {
      type: String,
      default: () => new Types.ObjectId().toString(), // 🟢 FIXED
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    specs: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  { _id: false }
);

/** RFP SCHEMA */
const rfpSchema = new Schema<rfpDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    budget: {
      type: Number,
      required: true,
    },
    delivery_timeline_days: {
      type: Number,
      required: true,
    },
    payment_terms: {
      type: String,
      required: true,
    },
    warranty_min_years: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "CLOSED", "CANCELLED"],
      default: "OPEN",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    items: {
      type: [rfpItemSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export const RFPModel = model<rfpDocument>("Rfp", rfpSchema);
