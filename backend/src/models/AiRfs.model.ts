import { Schema, model, Document } from "mongoose";

export interface AiRfpItem {
  name: string;
  quantity: number;
  specs: Record<string, string>;
}

export interface AiRfpDocument extends Document {
  title: string;
  budget: number;
  delivery_timeline_days: number;
  payment_terms: string;
  warranty_min_years: number;
  items: AiRfpDocument[];
}

const AiRfpItemSchema = new Schema<AiRfpItem>(
  {
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
  {
    _id: false,
  }
);

const AiRfpSchema = new Schema<AiRfpDocument>(
  {
    title: {
      type: String,
      required: true,
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
    items: {
      type: [AiRfpItemSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AiRfpModel = model<AiRfpDocument>("AI_RFP", AiRfpSchema);
