import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: "RFPs", path: "/rfps" },
    { name: "Vendors", path: "/vendors" },
    { name: "Proposals", path: "/proposals" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black/85 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Brand */}
        <Link
          to="/"
          aria-label="Home - AI Powered RFP System"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer transition-transform duration-300 hover:scale-[1.02]"
        >
          AI-Powered RFP System
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-6">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <li key={item.path} className="relative group">
                <Link
                  to={item.path}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-1 text-xl font-medium transition-all duration-300 rounded-md inline-flex items-center",
                    active
                      ? "text-white bg-white/6 shadow-[0_6px_18px_rgba(99,102,241,0.06)] backdrop-blur-sm"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="pointer-events-none transform-gpu transition-transform duration-300 group-hover:-translate-y-0.5">
                    {item.name}
                  </span>

                  {/* Active underline animation */}
                  {active ? (
                    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-400 translate-x-[-50%] animate-slide-expand" />
                  ) : (
                    // subtle hover underline for non-active items
                    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-400 translate-x-[-50%] group-hover:w-8 transition-all duration-300" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
