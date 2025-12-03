import { Request, Response } from "express";
import {
  parseRfpDescription,
  createRfp,
  getRfps,
  getRfpById,
  sendRfpToVendors,
  compareRfpProposals,
} from "../services/rfp.service";
import { ApiResponse } from "../utils/apiResponse";

export const parseRfpFromText = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;

    if (!description) {
      return ApiResponse(res, 400, false, "RFP description is required");
    }

    const structuredRfp = await parseRfpDescription(description);

    return ApiResponse(
      res,
      200,
      true,
      "RFP parsed successfully",
      structuredRfp
    );
  } catch (error: any) {
    return ApiResponse(res, 500, false, error.message || "Failed to parse RFP");
  }
};

export const createRfpController = async (req: Request, res: Response) => {
  try {
    const rfp = await createRfp(req.body);

    return ApiResponse(res, 201, true, "RFP created successfully", rfp);
  } catch (error: any) {
    return ApiResponse(
      res,
      500,
      false,
      error.message || "Failed to create RFP"
    );
  }
};

export const getAllRfps = async (_req: Request, res: Response) => {
  try {
    const rfps = await getRfps();
    return ApiResponse(res, 200, true, "RFPs fetched successfully", rfps);
  } catch (error: any) {
    return ApiResponse(
      res,
      500,
      false,
      error.message || "Failed to fetch RFPs"
    );
  }
};

export const getRfpController = async (req: Request, res: Response) => {
  try {
    const { rfpId } = req.params;
    const rfp = await getRfpById(rfpId);

    return ApiResponse(res, 200, true, "RFP fetched successfully", rfp);
  } catch (error: any) {
    return ApiResponse(res, 500, false, error.message || "Failed to fetch RFP");
  }
};

export const sendRfpToSelectedVendors = async (req: Request, res: Response) => {
  try {
    const { rfpId } = req.params;
    const { vendorIds } = req.body;

    if (!vendorIds || !Array.isArray(vendorIds) || vendorIds.length === 0) {
      return ApiResponse(res, 400, false, "vendorIds array is required");
    }

    const result = await sendRfpToVendors(rfpId, vendorIds);

    return ApiResponse(res, 200, true, "RFP sent successfully", result);
  } catch (error: any) {
    return ApiResponse(res, 500, false, error.message || "Failed to send RFP");
  }
};

export const compareRfpController = async (req: Request, res: Response) => {
  try {
    const { rfpId } = req.params;
    const comparison = await compareRfpProposals(rfpId);

    return ApiResponse(
      res,
      200,
      true,
      "Vendor comparison successful",
      comparison
    );
  } catch (error: any) {
    return ApiResponse(
      res,
      500,
      false,
      error.message || "Failed to compare proposals"
    );
  }
};
