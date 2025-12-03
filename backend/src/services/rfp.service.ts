import { RFPModel } from "../models/RFP.model";
import { VendorModel } from "../models/Vendor.model";
import { parseRfpFromDescription } from "../llm/parser";
import { sendRfpEmail } from "./email.service";
import { ProposalModel } from "../models/Proposal.model";
import { compareProposals } from "../llm/comparison";

export const parseRfpDescription = async (description: string) => {
  if (!description || description.trim() === "") {
    throw new Error("RFP description cannot be empty");
  }

  return await parseRfpFromDescription(description);
};

export const createRfp = async (payload: any) => {
  const rfp = await RFPModel.create(payload);
  return rfp;
};

export const getRfps = async () => {
  return RFPModel.find().sort({ createdAt: -1 });
};

export const getRfpById = async (rfpId: string) => {
  const rfp = await RFPModel.findById(rfpId);
  if (!rfp) throw new Error("RFP not found");
  return rfp;
};

export const sendRfpToVendors = async (rfpId: string, vendorIds: string[]) => {
  if (!vendorIds || vendorIds.length === 0) {
    throw new Error("No vendors selected for sending RFP");
  }

  const rfp = await RFPModel.findById(rfpId);
  if (!rfp) throw new Error("RFP not found");

  const vendors = await VendorModel.find({
    _id: { $in: vendorIds },
    active: true,
  });

  if (vendors.length === 0) throw new Error("No valid vendors found");

  for (const vendor of vendors) {
    await sendRfpEmail({ rfp, vendor });
  }

  await RFPModel.findByIdAndUpdate(rfpId, { status: "SENT" });

  return { message: `RFP sent to ${vendors.length} vendors` };
};

export const getProposalsForRfp = async (rfpId: string) => {
  const proposals = await ProposalModel.find({ rfp_id: rfpId })
    .populate("vendor_id", "name email")
    .lean();

  return proposals;
};

export const compareRfpProposals = async (rfpId: string) => {
  const rfp = await RFPModel.findById(rfpId).lean();
  if (!rfp) throw new Error("RFP not found");

  const proposals = await ProposalModel.find({ rfp_id: rfpId }).lean();

  if (proposals.length === 0) {
    throw new Error("No proposals submitted for this RFP");
  }

  const comparisonResult = await compareProposals(rfp, proposals);

  return comparisonResult;
};
