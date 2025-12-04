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
    <div className="max-w-6xl mx-auto mt-10 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Proposals</h1>
        <Button variant="outline" onClick={fetchAllProposals}>
          Refresh
        </Button>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-600">Loading proposals...</p>}

      {/* Error */}
      {error && <p className="text-red-600">{error}</p>}

      {/* No Data Found */}
      {!loading && proposals.length === 0 && (
        <Card className="p-4 text-center text-gray-600">
          No proposals received yet.
        </Card>
      )}

      {/* Proposals List */}
      <div className="space-y-6">
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
