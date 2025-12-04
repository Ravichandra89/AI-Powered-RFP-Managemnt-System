import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

import { createRfp, fetchRfps } from "../store/slices/rfpSlice";

import RfpInputBox from "../components/RfpInputBox";
import RfpCard from "../components/RfpCard";

import { Button } from "@/components/ui/button";

const RfpCreatePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { parsedRfp, rfps, loading } = useSelector(
    (state: RootState) => state.rfp
  );

  useEffect(() => {
    dispatch(fetchRfps());
  }, [dispatch]);

  const handleSaveRfp = () => {
    if (!parsedRfp) return;
    dispatch(createRfp(parsedRfp));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-10">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center">
        Create New Request for Proposal
      </h1>

      {/* Input Section */}
      <RfpInputBox />

      {/* Save Button After Parsing */}
      {parsedRfp && (
        <div className="flex justify-center">
          <Button className="w-48" onClick={handleSaveRfp} disabled={loading}>
            {loading ? "Saving..." : "Save RFP"}
          </Button>
        </div>
      )}

      {/* Existing RFP List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Existing RFPs</h2>

        {rfps.map((rfp) => (
          <RfpCard key={rfp._id} rfp={rfp} />
        ))}
      </div>
    </div>
  );
};

export default RfpCreatePage;
