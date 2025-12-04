import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import type { AppDispatch, RootState } from "../store";
import { fetchRfps } from "../store/slices/rfpSlice";

import RfpCard from "../components/RfpCard";
import { Button } from "@/components/ui/button";

const RfpListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rfps, loading, error } = useSelector((state: RootState) => state.rfp);

  useEffect(() => {
    dispatch(fetchRfps());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All RFPs</h1>

        <Link to="/rfps/create">
          <Button>Create New RFP</Button>
        </Link>
      </div>

      {loading && <p>Loading RFPs...</p>}

      {error && <p className="text-red-600">⚠ {error}</p>}

      {!loading && rfps.length === 0 && (
        <p className="text-gray-500">No RFPs created yet.</p>
      )}

      <div className="space-y-6">
        {rfps.map((rfp) => (
          <Link to={`/rfps/${rfp._id}`} key={rfp._id}>
            <RfpCard rfp={rfp} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RfpListPage;
