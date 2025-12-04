import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import type { AppDispatch, RootState } from "../store";
import { fetchVendors } from "../store/slices/vendorSlice";

import VendorCard from "../components/VendorCard";
import { Button } from "@/components/ui/button";

const VendorListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vendors, loading, error } = useSelector(
    (state: RootState) => state.vendor
  );

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vendors</h1>

        <Link to="/vendors/new">
          <Button>Add Vendor</Button>
        </Link>
      </div>

      {/* Loading status */}
      {loading && <p>Loading vendors...</p>}

      {/* Error message */}
      {error && <p className="text-red-600">⚠ {error}</p>}

      {/* No vendor fallback */}
      {!loading && vendors.length === 0 && (
        <p className="text-gray-500">
          No vendors found. Add one to get started.
        </p>
      )}

      {/* Vendors List */}
      <div className="grid gap-4 md:grid-cols-2">
        {vendors.map((vendor) => (
          <VendorCard key={vendor._id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
};

export default VendorListPage;
