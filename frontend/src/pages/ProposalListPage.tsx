import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import type { AppDispatch, RootState } from "../store";
import { fetchProposalsByRfpId } from "../store/slices/proposalSlice";

import ProposalCard from "../components/ProposalCard";

const ProposalListPage = () => {
  const { rfpId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { proposals, loading, error } = useSelector(
    (state: RootState) => state.proposal
  );

  useEffect(() => {
    if (rfpId) {
      dispatch(fetchProposalsByRfpId(rfpId));
    }
  }, [rfpId, dispatch]);

  if (!rfpId) {
    return <p className="mt-10 text-center text-red-600">Invalid RFP ID.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      <h1 className="text-2xl font-bold">
        Proposals for RFP: <span className="text-blue-600">{rfpId}</span>
      </h1>

      {loading && <p>Loading proposals...</p>}

      {error && <p className="text-red-600">⚠ {error}</p>}

      {!loading && proposals.length === 0 && (
        <p className="text-gray-500">No proposals received yet for this RFP.</p>
      )}

      {/* Render Proposals */}
      <div className="space-y-6">
        {proposals.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
};

export default ProposalListPage;
