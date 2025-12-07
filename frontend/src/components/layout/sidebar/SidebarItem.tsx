"use client";

import { usePathname } from "next/navigation";
import { MenuItem } from "@/components/layout/sidebar/menu.interface";
import { useSidebar } from "@/hooks/useSidebar";

interface SidebarItemProps {
  route: MenuItem;
}

export function SidebarItem({ route }: SidebarItemProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  const isActive = pathname === route.href;

  return <div></div>;
}
