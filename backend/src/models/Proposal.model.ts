import { Schema, Document, model, Types } from "mongoose";

export interface ProposalItem {
  rfp_item_id: string;
  unit_price: number;
  qty: number;
  total: number;
}

export interface ProposalDocument extends Document {
  rfp_id: Types.ObjectId;
  vendor_id: Types.ObjectId;
  submitted_at: Date;
  email_message_id?: string;
  total_price: number;
  delivery_days: number;
  warranty_years: number;
  payment_terms: string;
  compliance_score: number; // FIXED spelling
  summary?: string;
  items: ProposalItem[];
  raw_email_text?: string;
  parsed_ai_json?: any;
}

/** ProposalItemSchema */
const ProposalItemSchema = new Schema<ProposalItem>(
  {
    rfp_item_id: {
      // FIXED name
      type: String,
      required: true,
    },
    unit_price: { type: Number, required: true },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false }
);

/** ProposalSchema */
const ProposalSchema = new Schema<ProposalDocument>(
  {
    rfp_id: {
      type: Schema.Types.ObjectId,
      ref: "RFP", // FIXED model reference
      required: true,
    },
    vendor_id: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    submitted_at: {
      type: Date,
      default: Date.now,
    },
    email_message_id: String,

    total_price: { type: Number, required: true },
    delivery_days: { type: Number, required: true },
    warranty_years: { type: Number, required: true },
    payment_terms: { type: String, required: true },

    compliance_score: {
      // FIXED spelling
      type: Number,
      required: true,
      default: 0,
    },

    summary: String,

    items: {
      type: [ProposalItemSchema],
      required: true,
    },

    raw_email_text: String,
    parsed_ai_json: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const ProposalModel = model<ProposalDocument>(
  "Proposal",
  ProposalSchema
);
