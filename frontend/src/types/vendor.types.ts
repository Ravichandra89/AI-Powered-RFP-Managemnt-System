export interface Vendor {
  _id: string;
  name: string;
  email: string;
  category?: string;
  phone?: string;
  address?: string;
  active: boolean;
  created_at?: string;
}

export interface CreateVendorPayload {
  name: string;
  email: string;
  category?: string;
  phone?: string;
  address?: string;
}
