import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import type { AppDispatch, RootState } from "../store";
import { fetchRfps } from "../store/slices/rfpSlice";
import { fetchVendors } from "../store/slices/vendorSlice";
import { fetchProposalsByRfpId } from "../store/slices/proposalSlice";
import { sendRfpToVendorsService } from "../services/rfp.service";

import VendorCard from "../components/VendorCard";
import RfpCard from "../components/RfpCard";
import ProposalCard from "../components/ProposalCard";

const RfpDetailsPage = () => {
  const { rfpId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [sendMessage, setSendMessage] = useState<string | null>(null);

  const { rfps } = useSelector((state: RootState) => state.rfp);
  const { vendors } = useSelector((state: RootState) => state.vendor);
  const { proposals } = useSelector((state: RootState) => state.proposal);

  const rfp = rfps.find((item) => item._id === rfpId);

  useEffect(() => {
    if (!rfp) dispatch(fetchRfps());
    if (rfpId) dispatch(fetchProposalsByRfpId(rfpId));
    dispatch(fetchVendors());
  }, [dispatch, rfp, rfpId]);

  const toggleVendor = (vendorId: string) => {
    setSelectedVendors((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleSendRfp = async () => {
    if (!rfpId || selectedVendors.length === 0) return;

    setSending(true);
    setSendMessage(null);

    try {
      const msg = await sendRfpToVendorsService(rfpId, selectedVendors);
      setSendMessage(msg);
      setSelectedVendors([]); // reset
    } catch (error) {
      setSendMessage("Failed to send RFP");
      console.log(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-10">
      <h1 className="text-2xl font-bold">RFP Details</h1>

      {rfp && <RfpCard rfp={rfp} />}

      {/* Vendor Selection */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Send RFP to Vendors</h2>

        {vendors.map((vendor) => (
          <div key={vendor._id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedVendors.includes(vendor._id)}
              onChange={() => toggleVendor(vendor._id)}
            />
            <VendorCard vendor={vendor} />
          </div>
        ))}

        <Button
          disabled={sending || selectedVendors.length === 0}
          onClick={handleSendRfp}
        >
          {sending ? "Sending..." : "Send RFP"}
        </Button>

        {sendMessage && <p className="text-green-600">{sendMessage}</p>}
      </div>

      {/* Proposals Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Proposals</h2>

          {proposals.length > 1 && (
            <Link to={`/rfps/${rfpId}/compare`}>
              <Button>Compare Proposals</Button>
            </Link>
          )}
        </div>

        {proposals.map((proposal) => (
          <ProposalCard proposal={proposal} key={proposal.id} />
        ))}
      </div>
    </div>
  );
};

export default RfpDetailsPage;
