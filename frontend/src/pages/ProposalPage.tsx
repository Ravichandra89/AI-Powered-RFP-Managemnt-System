import { useEffect, useState } from "react";
import ProposalCard from "../components/ProposalCard";
import type { Proposal } from "../types/proposal.types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "../services/api";

const ProposalPage = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProposals = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/api/v1/proposals");
      setProposals(res.data.data);
    } catch (err) {
      setError("Failed to fetch proposals");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProposals();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">All Proposals</h1>
          <p className="text-sm text-slate-400 mt-1">
            View proposals submitted by vendors — click a card to review
            details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300 mr-2">
            Total: <strong className="text-white">{proposals.length}</strong>
          </span>

          <Button
            variant="outline"
            onClick={fetchAllProposals}
            className="px-4 py-2 border-[#505766] text-slate-200 hover:border-indigo-400 hover:bg-indigo-500/8"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mb-4">
          <Card className="p-4 bg-gradient-to-b from-[#272b32] to-[#23262b] border-[#3a4048]">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-600/80 animate-pulse" />
              <div className="text-sm text-slate-300">Loading proposals...</div>
            </div>
          </Card>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4">
          <Card className="p-4 bg-[#382e2e] border-[#4a3737]">
            <div className="text-sm text-amber-300">{error}</div>
          </Card>
        </div>
      )}

      {/* No Data Found */}
      {!loading && proposals.length === 0 && (
        <Card className="p-6 text-center bg-gradient-to-b from-[#2f343b] to-[#282c32] border-[#3b414a]">
          <div className="text-slate-200 text-lg font-medium">
            No proposals received yet.
          </div>
          <div className="text-sm text-slate-400 mt-2">
            Vendors will appear here once they submit proposals. Try refreshing.
          </div>
          <div className="mt-4">
            <Button
              onClick={fetchAllProposals}
              className="px-4 py-2 bg-indigo-600/80 hover:bg-indigo-600 text-white"
            >
              Refresh
            </Button>
          </div>
        </Card>
      )}

      {/* Proposals List */}
      <div className="space-y-6 mt-4">
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            vendorName={proposal.vendorId}
          />
        ))}
      </div>
    </div>
  );
};

export default ProposalPage;
