import { Request, Response } from "express";
import {
  parseAndCreateProposal,
  getProposalsByRfpId,
} from "../services/proposal.service";
import { ApiResponse } from "../utils/apiResponse";

export const createProposalFromEmailController = async (
  req: Request,
  res: Response
) => {
  try {
    const { rfpId, vendorEmail, emailBody, emailMessageId } = req.body;

    if (!rfpId || !vendorEmail || !emailBody) {
      return ApiResponse(
        res,
        400,
        false,
        "rfpId, vendorEmail and emailBody are required"
      );
    }

    const proposal = await parseAndCreateProposal({
      rfpId,
      vendorEmail,
      emailBody,
      emailMessageId,
    });

    return ApiResponse(
      res,
      201,
      true,
      "Proposal parsed and stored successfully",
      proposal
    );
  } catch (error: any) {
    return ApiResponse(
      res,
      500,
      false,
      error.message || "Failed to parse vendor proposal"
    );
  }
};

export const getProposalsForRfpController = async (
  req: Request,
  res: Response
) => {
  try {
    const { rfpId } = req.params;

    if (!rfpId) {
      return ApiResponse(res, 400, false, "rfpId is required");
    }

    const proposals = await getProposalsByRfpId(rfpId);

    return ApiResponse(
      res,
      200,
      true,
      "Proposals fetched successfully",
      proposals
    );
  } catch (error: any) {
    return ApiResponse(
      res,
      500,
      false,
      error.message || "Failed to fetch proposals"
    );
  }
};
