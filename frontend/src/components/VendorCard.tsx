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
import { cn } from "@/lib/utils";

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
    <Card
      className={cn(
        "w-full rounded-xl border overflow-hidden",
        "bg-gradient-to-b from-[#2d323b] via-[#292e36] to-[#23272f]",
        "border-[#3c414d] shadow-[0_4px_18px_rgba(0,0,0,0.35)]",
        "transition-all duration-400 hover:-translate-y-1",
        "hover:shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
      )}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-400/50 via-violet-400/50 to-indigo-400/50" />

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="truncate text-base font-semibold text-white">
            {vendor.name}
          </CardTitle>

          <Badge
            variant="outline"
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md border",
              vendor.active
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-400/30"
                : "bg-slate-600/20 text-slate-300 border-slate-600/30"
            )}
          >
            {vendor.active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-slate-200">
        <p className="flex justify-between">
          <span className="text-slate-400">Email:</span>
          <span className="font-medium">{vendor.email}</span>
        </p>

        <p className="flex justify-between">
          <span className="text-slate-400">Category:</span>
          <span className="font-medium">{vendor.category}</span>
        </p>

        {vendor.phone && (
          <p className="flex justify-between">
            <span className="text-slate-400">Phone:</span>
            <span className="font-medium">{vendor.phone}</span>
          </p>
        )}

        {vendor.address && (
          <p className="flex justify-between">
            <span className="text-slate-400">Address:</span>
            <span className="font-medium truncate">{vendor.address}</span>
          </p>
        )}
      </CardContent>

      {/* Deactivate button visible only when vendor is active */}
      {showDeactivate && vendor.active && (
        <CardFooter className="pt-3">
          <Button
            onClick={handleDeactivate}
            className={cn(
              "w-full bg-red-600/80 text-white",
              "hover:bg-red-600 hover:shadow-[0_0_12px_rgba(239,68,68,0.45)]",
              "transition-all duration-300"
            )}
          >
            Deactivate Vendor
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default VendorCard;
