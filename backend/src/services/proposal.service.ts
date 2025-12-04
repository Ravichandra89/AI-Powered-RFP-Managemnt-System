import { ProposalModel } from "../models/Proposal.model";
import { VendorModel } from "../models/Vendor.model";
import { RFPModel } from "../models/RFP.model";
import { parseProposalFromEmail } from "../llm/proposalParser";

export const parseAndCreateProposal = async (params: {
  rfpId: string;
  vendorEmail: string;
  emailBody: string;
  emailMessageId?: string;
}) => {
  const { rfpId, vendorEmail, emailBody, emailMessageId } = params;

  const rfp = await RFPModel.findById(rfpId);
  if (!rfp) throw new Error("RFP not found");

  const vendor = await VendorModel.findOne({ email: vendorEmail });
  if (!vendor) throw new Error("Vendor not registered");

  // Avoid duplicate proposals for same email message
  if (emailMessageId) {
    const exists = await ProposalModel.findOne({
      email_message_id: emailMessageId,
    });
    if (exists) {
      console.log(`⚠ Proposal already exists for messageId: ${emailMessageId}`);
      return exists;
    }
  }

  const parsed = await parseProposalFromEmail(
    emailBody,
    JSON.stringify(rfp.items)
  );

  const proposal = await ProposalModel.create({
    rfp_id: rfp._id,
    vendor_id: vendor._id,
    email_message_id: emailMessageId,
    raw_email_text: emailBody,
    total_price: parsed.total_price ?? 0,
    delivery_days: parsed.delivery_days ?? 0,
    warranty_years: parsed.warranty_years ?? 0,
    payment_terms: parsed.payment_terms ?? "N/A",
    compliance_score: parsed.compliance_score ?? 0,
    summary: parsed.summary ?? "",
    items: parsed.items ?? [],
    parsed_ai_json: parsed,
  });

  return proposal;
};

export const getProposalsByRfpId = async (rfpId: string) => {
  return ProposalModel.find({ rfp_id: rfpId }).populate(
    "vendor_id",
    "name email"
  );
};

export const getAllProposals = async () => {
  return ProposalModel.find().populate("vendor_id", "name email");
};
