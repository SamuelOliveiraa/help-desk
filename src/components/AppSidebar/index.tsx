"use client";

import { useEffect, useState } from "react";
import type { Role } from "@/types/user";
import { getTokenRole } from "@/utils/cookies";
import HeaderLogo from "../HeaderLogo";
import SidebarMenuItens from "../SidebarMenuItens";
import UserMenu from "../UserMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "../ui/sidebar";

export default function AppSidebar() {
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const roleToken = getTokenRole();
    setRole(roleToken);
  }, []);

  return (
    <Sidebar>
      <SidebarContent className="bg-gray-100">
        <SidebarGroup className="flex flex-col h-full gap-4 p-0">
          <SidebarGroupLabel className="flex py-4 px-3 border-b border-gray-400/10 rounded-none min-h-24">
            <HeaderLogo role={role} />
          </SidebarGroupLabel>

          <SidebarGroupContent className="flex flex-1 px-4">
            <SidebarMenuItens role={role} />
          </SidebarGroupContent>

          <SidebarFooter className="py-5 px-4 border-t border-gray-400/10">
            <UserMenu />
          </SidebarFooter>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
