import api from "./api";
import type { Vendor, CreateVendorPayload } from "../types/vendor.types";

export const createVendorService = async (
  payload: CreateVendorPayload
): Promise<Vendor> => {
  const res = await api.post("/api/v1/vendors", payload);
  return res.data.data;
};

export const getAllVendorsService = async (): Promise<Vendor[]> => {
  const res = await api.get("/api/v1/vendors");
  return res.data.data;
};

export const getVendorByIdService = async (
  vendorId: string
): Promise<Vendor> => {
  const res = await api.get(`/api/v1/vendors/${vendorId}`);
  return res.data.data;
};

export const deactivateVendorService = async (
  vendorId: string
): Promise<Vendor> => {
  const res = await api.patch(`/api/v1/vendors/${vendorId}/deactivate`);
  return res.data.data;
};
