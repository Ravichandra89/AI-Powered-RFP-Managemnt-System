import VendorForm from "../components/VendorForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const VendorCreatePage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Add New Vendor</h1>

        <Button variant="outline" onClick={() => navigate("/vendors")}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
      </div>

      {/* Form Section */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <VendorForm />
      </div>
    </div>
  );
};

export default VendorCreatePage;
