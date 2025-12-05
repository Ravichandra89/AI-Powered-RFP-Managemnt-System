import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layers, Building2, BarChart3 } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="max-w-6xl mx-auto mt-20 space-y-12 px-4">
      {/* Title Section */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          AI-Powered RFP Management System
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Automate procurement with natural language RFP creation, email-based
          vendor proposal parsing, and AI-driven comparison for faster and
          data-backed decisions.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          title="Manage RFPs"
          description="Create structured RFPs from natural language and manage procurement workflows."
          icon={<Layers className="w-6 h-6 text-primary" />}
          link="/rfps"
          button="View RFPs"
        />

        <FeatureCard
          title="Vendors"
          description="Add vendors, manage suppliers, and send RFPs directly via email."
          icon={<Building2 className="w-6 h-6 text-purple-500" />}
          link="/vendors"
          button="View Vendors"
        />

        <FeatureCard
          title="Proposal Comparison"
          description="Use AI to score and compare proposals and get vendor recommendations."
          icon={<BarChart3 className="w-6 h-6 text-green-500" />}
          link="/rfps"
          button="Compare Proposals"
        />
      </div>
    </div>
  );
};

export default DashboardPage;

/* ------------------ Reusable Card Component ------------------ */

const FeatureCard = ({
  title,
  description,
  icon,
  link,
  button,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  button: string;
}) => (
  <div
    className="border border-border bg-card rounded-xl shadow-md p-6 flex flex-col justify-between 
                  hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 group"
  >
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-muted group-hover:scale-105 transition">
          {icon}
        </div>
        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
          {title}
        </h2>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>

    <Link to={link} className="mt-6">
      <Button className="w-full">{button}</Button>
    </Link>
  </div>
);
