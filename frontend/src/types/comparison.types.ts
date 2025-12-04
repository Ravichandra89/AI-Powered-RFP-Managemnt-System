export interface VendorComparisonScore {
  vendorId: string;
  vendorName: string;
  score: number;
  reasons?: string;
}

export interface ComparisonResult {
  recommendation: string;
  summary?: string;
  scores?: VendorComparisonScore[];
  comparisonTable?: Record<string, Record<string, string | number>>;
  [key: string]: unknown;
}
