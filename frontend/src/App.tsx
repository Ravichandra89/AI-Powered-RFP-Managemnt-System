import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import DashboardPage from "./pages/DashboardPage";
import RfpListPage from "./pages/RfpListPage";
import RfpCreatePage from "./pages/RfpCreatePage";
import RfpDetailsPage from "./pages/RfpDetailsPage";
import ComparePage from "./pages/ComparePage";
import VendorListPage from "./pages/VendorListPage";
import VendorCreatePage from "./pages/VendorCreatePage";
import ProposalListPage from "./pages/ProposalListPage";

const App = () => {
  return (
    <Router>
      <Navbar />

      <div className="flex flex-col min-h-screen">
        {/* Page Content */}
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            {/* RFP Routes */}
            <Route path="/rfps" element={<RfpListPage />} />
            <Route path="/rfps/create" element={<RfpCreatePage />} />
            <Route path="/rfps/:rfpId" element={<RfpDetailsPage />} />
            <Route path="/rfps/:rfpId/compare" element={<ComparePage />} />
            <Route
              path="/rfps/:rfpId/proposals"
              element={<ProposalListPage />}
            />
            {/* Vendor Routes */}
            <Route path="/vendors" element={<VendorListPage />} />
            <Route path="/vendors/new" element={<VendorCreatePage />} />{" "}
            {/* 👈 FIXED */}
            {/* Wildcard Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Footer pinned at bottom */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
