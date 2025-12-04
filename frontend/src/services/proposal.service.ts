import api from "./api";
import type { Proposal, ParseProposalPayload } from "../types/proposal.types";

export const parseProposalFromEmailService = async (
  payload: ParseProposalPayload
): Promise<Proposal> => {
  const res = await api.post("/api/v1/proposals/parse-email", payload);
  return res.data.data;
};

export const getProposalsByRfpIdService = async (
  rfpId: string
): Promise<Proposal[]> => {
  const res = await api.get(`/api/v1/proposals/${rfpId}`);
  return res.data.data;
};

export const getAllProposalsService = async () => {
  const res = await api.get(`/proposals`);
  return res.data.data;
};
