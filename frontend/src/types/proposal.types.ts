export interface ProposalItem {
  rfpItemId: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface ParsedAiJson {
  title?: string;
  totalPrice?: number;
  deliveryDays?: number;
  warrantyYears?: number;
  paymentTerms?: string;
  complianceScore?: number;
  summary?: string;
  items?: Array<Record<string, unknown>>;
}

export interface Proposal {
  id: string;
  rfpId: string;
  vendorId: string;
  submittedAt: string;
  emailMessageId?: string;
  totalPrice: number;
  deliveryDays: number;
  warrantyYears: number;
  paymentTerms: string;
  complianceScore: number;
  summary?: string;
  items: ProposalItem[];
  rawEmailText?: string;
  parsedAiJson?: ParsedAiJson;
}

export interface ParseProposalPayload {
  rfpId: string;
  vendorEmail: string;
  emailBody: string;
  emailMessageId?: string;
}
