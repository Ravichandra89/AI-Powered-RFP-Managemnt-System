import api from "./api";
import type { ParsedRfpPayload, Rfp } from "../types/rfp.types";
import type { ComparisonResult } from "@/types/comparison.types";

export const parseRfpFromTextService = async (
  description: string
): Promise<ParsedRfpPayload> => {
  const res = await api.post("/api/v1/rfps/parse", { description });
  return res.data.data;
};

export const createRfpService = async (
  payload: ParsedRfpPayload
): Promise<Rfp> => {
  const res = await api.post("/api/v1/rfps", payload);
  return res.data.data;
};

export const getAllRfpsService = async (): Promise<Rfp[]> => {
  const res = await api.get("/api/v1/rfps");
  return res.data.data;
};

export const getRfpByIdService = async (rfpId: string): Promise<Rfp> => {
  const res = await api.get(`/api/v1/rfps/${rfpId}`);
  return res.data.data;
};

export const compareRfpProposalsService = async (
  rfpId: string
): Promise<ComparisonResult> => {
  const res = await api.post(`/api/v1/rfps/${rfpId}/compare`);
  return res.data.data as ComparisonResult;
};

export const sendRfpToVendorsService = async (
  rfpId: string,
  vendorIds: string[]
) => {
  const res = await api.post(`/api/v1/rfps/${rfpId}/send`, { vendorIds });
  return res.data.message;
};
