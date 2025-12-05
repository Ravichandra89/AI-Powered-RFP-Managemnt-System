import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Github, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 text-gray-300 mt-16 border-t border-gray-800">
      <Card className="bg-transparent border-none rounded-none shadow-none">
        <CardContent className="max-w-6xl mx-auto py-12 px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {/* BRAND */}
            <div>
              <h2 className="text-xl font-bold text-white">
                AI-Powered RFP System
              </h2>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                Automate procurement workflows with AI — create RFPs, manage
                vendors, parse proposals, and compare bids effortlessly.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                Quick Links
              </h3>

              <ul className="space-y-3 text-sm">
                <FooterLink to="/rfps">Manage RFPs</FooterLink>
                <FooterLink to="/vendors">Vendors</FooterLink>
                <FooterLink to="/rfps/create">Create RFP</FooterLink>
                <FooterLink to="/proposals">All Proposals</FooterLink>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                Connect
              </h3>

              <ul className="space-y-3 text-sm">
                <FooterAnchor href="mailto:support@rfp.ai">
                  <Mail className="w-4 h-4" /> support@rfp.ai
                </FooterAnchor>

                <FooterAnchor href="https://github.com" target="_blank">
                  <Github className="w-4 h-4" /> GitHub Repository
                  <ExternalLink className="w-3 h-3" />
                </FooterAnchor>
              </ul>
            </div>
          </div>

          {/* Separator */}
          <Separator className="my-8 bg-gray-800" />

          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} AI-Powered RFP System · All rights
            reserved.
          </p>
        </CardContent>
      </Card>
    </footer>
  );
};

/* ---------- Reusable Components ---------- */

const FooterLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <li>
    <Link
      to={to}
      className="hover:text-white transition flex items-center gap-2"
    >
      <span className="h-px w-0 bg-blue-500 group-hover:w-4 transition-all"></span>
      {children}
    </Link>
  </li>
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
  <li>
    <a
      href={href}
      target={target}
      rel="noreferrer"
      className="hover:text-white transition flex items-center gap-2"
    >
      {children}
    </a>
  </li>
);

export default Footer;
