import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Github, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full mt-10">
      <Card className="rounded-none border-t bg-gray-50 shadow-none">
        <CardContent className="max-w-6xl mx-auto py-8 px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Brand */}
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                AI-Powered RFP System
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Streamline procurement with AI — create RFPs, parse proposals,
                compare vendors & make data-driven decisions effortlessly.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-700 mb-2">
                Quick Links
              </h3>
              <div className="flex flex-col space-y-2">
                <FooterLink to="/rfps">Manage RFPs</FooterLink>
                <FooterLink to="/vendors">Vendors</FooterLink>
                <FooterLink to="/rfps/create">Create RFP</FooterLink>
                <FooterLink to="/rfps/1/compare">Compare Proposals</FooterLink>
              </div>
            </div>

            {/* Contact / Social */}
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-700 mb-2">
                Connect
              </h3>
              <div className="flex flex-col space-y-3 text-sm text-gray-700">
                <FooterAnchor href="mailto:support@rfp.ai">
                  <Mail className="w-4 h-4" /> support@rfp.ai
                </FooterAnchor>
                <FooterAnchor href="https://github.com" target="_blank">
                  <Github className="w-4 h-4" /> GitHub Repository
                  <ExternalLink className="w-3 h-3 ml-1" />
                </FooterAnchor>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AI-Powered RFP System — All rights
            reserved.
          </div>
        </CardContent>
      </Card>
    </footer>
  );
};

const FooterLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link to={to} className="hover:text-blue-600 transition-colors text-gray-700">
    {children}
  </Link>
);

const FooterAnchor = ({
  href,
  children,
  target,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
}) => (
  <a
    href={href}
    target={target}
    className="flex items-center hover:text-blue-600 transition-colors"
    rel="noreferrer"
  >
    {children}
  </a>
);

export default Footer;
