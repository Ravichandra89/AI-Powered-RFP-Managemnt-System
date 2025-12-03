import { Request, Response } from "express";
import {
  createVendor,
  getVendors,
  getVendorById,
  deactivateVendor,
} from "../services/vendor.service";
import { ApiResponse } from "../utils/apiResponse";

export const createVendorController = async (req: Request, res: Response) => {
  try {
    const vendor = await createVendor(req.body);
    return ApiResponse(res, 201, true, "Vendor created successfully", vendor);
  } catch (error: any) {
    return ApiResponse(
      res,
      500,
      false,
      error.message || "Failed to create vendor"
    );
  }
};

export const getVendorListController = async (_req: Request, res: Response) => {
  try {
    const vendors = await getVendors();
    return ApiResponse(res, 200, true, "Vendors fetched successfully", vendors);
  } catch (error: any) {
    return ApiResponse(
      res,
      500,
      false,
      error.message || "Failed to fetch vendors"
    );
  }
};

export const getVendorByIdController = async (req: Request, res: Response) => {
  try {
    const { vendorId } = req.params;
    const vendor = await getVendorById(vendorId);

    return ApiResponse(res, 200, true, "Vendor fetched successfully", vendor);
  } catch (error: any) {
    return ApiResponse(
      res,
      500,
      false,
      error.message || "Failed to fetch vendor"
    );
  }
};

export const deactivateVendorController = async (
  req: Request,
  res: Response
) => {
  try {
    const { vendorId } = req.params;
    const vendor = await deactivateVendor(vendorId);

    return ApiResponse(
      res,
      200,
      true,
      "Vendor deactivated successfully",
      vendor
    );
  } catch (error: any) {
    return ApiResponse(
      res,
      500,
      false,
      error.message || "Failed to deactivate vendor"
    );
  }
};
