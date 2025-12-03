import { VendorModel } from "../models/Vendor.model";

export const createVendor = async (payload: {
  name: string;
  email: string;
  category?: string;
  phone?: string;
  address?: string;
}) => {
  // Check if vendor email already exists
  const existingVendor = await VendorModel.findOne({ email: payload.email });
  if (existingVendor) {
    throw new Error("Vendor with this email already exists");
  }

  const vendor = await VendorModel.create(payload);
  return vendor;
};

export const getVendors = async () => {
  return VendorModel.find({ active: true }).select("-__v");
};

export const getVendorById = async (vendorId: string) => {
  const vendor = await VendorModel.findById(vendorId);
  if (!vendor) throw new Error("Vendor not found");
  return vendor;
};

export const getVendorByEmail = async (email: string) => {
  return VendorModel.findOne({ email });
};

export const deactivateVendor = async (vendorId: string) => {
  const vendor = await VendorModel.findByIdAndUpdate(
    vendorId,
    { active: false },
    { new: true }
  );

  if (!vendor) throw new Error("Vendor not found");
  return vendor;
};
