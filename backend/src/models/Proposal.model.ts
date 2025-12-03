import { Schema, Document, model, Types } from "mongoose";

export interface proposalItem {
  rpf_item_id: string;
  unit_price: number;
  qty: number;
  total: number;
}

export interface proposalDocument extends Document {
  rfp_id: Types.ObjectId;
  vendor_id: Types.ObjectId;
  submitted_at: Date;
  email_message_id?: string;
  total_price: number;
  delivery_days: number;
  warranty_years: number;
  payment_terms: string;
  compilance_score: number;
  summary?: string;
  items: proposalItem[];
  raw_email_text?: string;
  parsed_ai_json?: any;
}

/** ProposalItemSchema */
const proposalItemSchema = new Schema<proposalItem>(
  {
    rpf_item_id: {
      type: String,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

/** ProposalSchema */
const proposalSchema = new Schema<proposalDocument>(
  {
    rfp_id: {
      type: Schema.Types.ObjectId,
      ref: "Rfp",
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
    email_message_id: {
      type: String,
    },
    total_price: {
      type: Number,
      required: true,
    },
    delivery_days: {
      type: Number,
      required: true,
    },

    warranty_years: {
      type: Number,
      required: true,
    },

    payment_terms: {
      type: String,
      required: true,
    },

    compilance_score: {
      type: Number,
      required: true,
    },

    summary: {
      type: String,
    },

    items: {
      type: [proposalItemSchema],
      required: true,
    },

    raw_email_text: {
      type: String,
    },

    parsed_ai_json: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export const ProposalModel = model<proposalDocument>(
  "Proposal",
  proposalSchema
);
