import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";

import { cn } from "@/lib/utils";

const Navbar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: "RFPs", path: "/rfps" },
    { name: "Vendors", path: "/vendors" },
    { name: "Proposals", path: "/proposals" },
  ];

  return (
    <div className="w-full border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-tight">
          AI-Powered RFP System
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-blue-600",
                    pathname === item.path
                      ? "text-blue-600 underline"
                      : "text-gray-700"
                  )}
                >
                  {item.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
