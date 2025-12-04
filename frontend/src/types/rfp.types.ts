export interface RfpItem {
  item_id: string;
  name: string;
  quantity: number;
  specs: Record<string, string>;
}

export interface Rfp {
  _id: string;
  title: string;
  description?: string;
  budget: number;
  delivery_timeline_days: number;
  payment_terms: string;
  warranty_min_years: number;
  status: "OPEN" | "SENT" | "CLOSED";
  items: RfpItem[];
  created_at?: string;
}

export interface RfpCreatePayload {
  description: string;
}

export interface ParsedRfpPayload {
  title: string;
  budget: number;
  delivery_timeline_days: number;
  payment_terms: string;
  warranty_min_years: number;
  items: RfpItem[];
}
