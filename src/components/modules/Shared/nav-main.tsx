/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SidebarGroup, SidebarMenuButton } from "@/components/ui/sidebar";
import { LucideIcon, User, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

// Define route types for each role
interface RouteItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

const routes: RouteItem[] = [
  {
    href: "/dashboard/overview",
    icon: LayoutDashboardIcon,
    label: "Dashboard",
  },
  {
    href: "/dashboard",
    icon: User,
    label: "Profile",
  },
];

export function NavMain() {
  return (
    <SidebarGroup className="mt-6 space-y-2">
      {routes.map((route: RouteItem) => (
        <SidebarMenuButton key={route.href}>
          <Link
            href={route.href}
            className="flex items-center gap-2 font-bold w-full"
          >
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm w-full">
              <route.icon className="size-5" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <h1 className="text-sm truncate">{route.label}</h1>
              </div>
            </div>
          </Link>
        </SidebarMenuButton>
      ))}
    </SidebarGroup>
  );
}

export default NavMain;
