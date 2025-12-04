import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <div className="max-w-5xl mx-auto mt-16 space-y-12">
      <h1 className="text-3xl font-bold text-center">
        AI-Powered RFP Management System
      </h1>

      <p className="text-center text-gray-600 max-w-xl mx-auto">
        Streamline procurement with automated RFP creation, vendor proposal
        parsing, and AI-driven comparison. Choose where to start.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {/* RFP Card */}
        <div className="border rounded-lg p-6 shadow-sm bg-white flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Manage RFPs</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Create RFPs from natural language and track procurement
              requirements.
            </p>
          </div>
          <Link to="/rfps">
            <Button className="w-full">View RFPs</Button>
          </Link>
        </div>

        <div className="border rounded-lg p-6 shadow-sm bg-white flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Vendors</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Add vendors and manage supplier contacts.
            </p>
          </div>
          <Link to="/vendors">
            <Button className="w-full">View Vendors</Button>
          </Link>
        </div>

        <div className="border rounded-lg p-6 shadow-sm bg-white flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Proposal Comparison</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Compare vendor proposals using AI-generated scoring and
              recommendations.
            </p>
          </div>
          <Link to="/rfps">
            <Button className="w-full">Compare Proposals</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
