import { useDispatch } from "react-redux";
import type { Vendor } from "../types/vendor.types";
import { deactivateVendor } from "../store/slices/vendorSlice";
import type { AppDispatch } from "../store";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VendorCardProps {
  vendor: Vendor;
  showDeactivate?: boolean;
}

const VendorCard = ({ vendor, showDeactivate = true }: VendorCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeactivate = () => {
    if (confirm(`Are you sure you want to deactivate ${vendor.name}?`)) {
      dispatch(deactivateVendor(vendor._id));
    }
  };

  return (
    <Card className="w-full border shadow-sm p-4 flex flex-col gap-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{vendor.name}</CardTitle>

          <Badge variant={vendor.active ? "default" : "secondary"}>
            {vendor.active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="text-sm space-y-2">
        <p>
          <span className="font-semibold">Email:</span> {vendor.email}
        </p>
        <p>
          <span className="font-semibold">Category:</span> {vendor.category}
        </p>

        {vendor.phone && (
          <p>
            <span className="font-semibold">Phone:</span> {vendor.phone}
          </p>
        )}
        {vendor.address && (
          <p>
            <span className="font-semibold">Address:</span> {vendor.address}
          </p>
        )}
      </CardContent>

      {/* This button now ALWAYS shows if vendor.active == true */}
      {showDeactivate && vendor.active && (
        <CardFooter>
          <Button
            className="w-full bg-red-600 text-white hover:bg-red-700"
            onClick={handleDeactivate}
          >
            Deactivate Vendor
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default VendorCard;
