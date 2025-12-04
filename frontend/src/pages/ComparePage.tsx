import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import type { AppDispatch, RootState } from "../store";
import { fetchProposalsByRfpId } from "../store/slices/proposalSlice";
import ProposalCard from "../components/ProposalCard";

import { Button } from "@/components/ui/button";
import { compareRfpProposalsService } from "../services/rfp.service";
import type { ComparisonResult } from "@/types/comparison.types";

const ComparePage = () => {
  const { rfpId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { proposals, loading: proposalsLoading } = useSelector(
    (state: RootState) => state.proposal
  );

  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);

  useEffect(() => {
    if (rfpId) dispatch(fetchProposalsByRfpId(rfpId));
  }, [rfpId, dispatch]);

  const handleCompare = async () => {
    if (!rfpId) return;

    setLoading(true);
    setCompareError(null);

    try {
      const result = await compareRfpProposalsService(rfpId);
      setComparisonResult(result);
    } catch (err) {
      if (err instanceof Error) {
        setCompareError(err.message);
      } else {
        setCompareError("Comparison failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!rfpId) {
    return <p className="mt-10 text-center text-red-600">Invalid RFP ID.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-8">
      <h1 className="text-2xl font-bold">Compare Vendor Proposals</h1>

      <Button
        className="w-48"
        onClick={handleCompare}
        disabled={loading || proposals.length < 2}
      >
        {loading ? "Comparing..." : "Compare Proposals"}
      </Button>

      {compareError && <p className="text-red-600">⚠ {compareError}</p>}

      {!proposalsLoading && proposals.length < 2 && (
        <p className="text-gray-500">
          At least 2 proposals are required for comparison.
        </p>
      )}

      {comparisonResult && (
        <div className="border p-4 rounded-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">AI Recommendation</h2>
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(comparisonResult, null, 2)}
          </pre>
        </div>
      )}

      <div className="space-y-6">
        {proposals.map((proposal) => (
          <ProposalCard proposal={proposal} key={proposal.id} />
        ))}
      </div>
    </div>
  );
};

export default ComparePage;
