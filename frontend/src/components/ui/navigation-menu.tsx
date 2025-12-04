"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const NavigationMenu = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav className={cn("relative flex", className)} {...props}>
      {children}
    </nav>
  );
};

export const NavigationMenuList = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul className={cn("flex items-center gap-6", className)} {...props}>
      {children}
    </ul>
  );
};

export const NavigationMenuItem = ({
  children,
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) => {
  return (
    <li className={cn("list-none", className)} {...props}>
      {children}
    </li>
  );
};
