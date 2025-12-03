export interface RfpItemType {
  name: string;
  quantity: number;
  specs: Record<string, string>;
}

export interface RfpCreateDTO {
  title: string;
  description?: string;
  budget: number;
  delivery_timeline_days: number;
  payment_terms: string;
  warranty_min_years: number;
  items: RfpItemType[];
}

export interface ParsedRfp extends RfpCreateDTO {} // from LLM
