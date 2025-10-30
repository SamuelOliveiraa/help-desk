"use client";

import {
  BriefcaseBusiness,
  ClipboardList,
  PlusIcon,
  Users,
  Wrench
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarItem from "../SidebarItem";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu
} from "../ui/sidebar";
import HeaderLogo from "../HeaderLogo";
import UserMenu from "../UserMenu";
import type { Role } from "@/types/user";
import { getTokenRole } from "@/utils/cookies";
import SidebarMenuItens from "../SidebarMenuItens";

export default function AppSidebar() {
  const pathname = usePathname();
  const links = [
    { href: "/dashboard/admin", title: "Chamados", Icon: ClipboardList, id: 1 },

    {
      href: "/dashboard/admin/technicals",
      title: "Técnicos",
      Icon: Wrench,
      id: 4
    },
    {
      href: "/dashboard/admin/customers",
      title: "Clientes",
      Icon: Users,
      id: 2
    },
    {
      href: "/dashboard/admin/services",
      title: "Serviços",
      Icon: BriefcaseBusiness,
      id: 3
    }
  ];
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    getTokenRole().then(setRole);
  }, []);

  return (
    <Sidebar>
      <SidebarContent className="bg-gray-100">
        <SidebarGroup className="flex flex-col h-full gap-4 p-0">
          <SidebarGroupLabel className="flex py-4 px-3 border-b border-gray-400/10 rounded-none min-h-24">
            <HeaderLogo role={role || "technician"} />
          </SidebarGroupLabel>

          <SidebarGroupContent className="flex flex-1 px-4">
            <SidebarMenuItens role={role || "technician"} />
          </SidebarGroupContent>

          <SidebarFooter className="py-5 px-4 border-t border-gray-400/10">
            <UserMenu />
          </SidebarFooter>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
