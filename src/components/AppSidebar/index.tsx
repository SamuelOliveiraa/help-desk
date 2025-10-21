"use client";

import { Role } from "@/types/user";
import { getTokenRole } from "@/utils/cookies";
import {
  BriefcaseBusiness,
  ClipboardList,
  PlusIcon,
  Users,
  Wrench
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
import UserMenu from "../UserMenu";

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
            <Link
              href={`/dashboard/${role}`}
              className="flex gap-3 items-center"
            >
              <Image
                src={"/logo.svg"}
                alt="Logo help desk"
                width={50}
                height={50}
              />
              <div>
                <h2 className="text-gray-600 text-xl">HelpDesk</h2>
                <span className="uppercase text-blue-100 text-xs">
                  {role === "user"
                    ? "Cliente"
                    : role === "technician"
                    ? "Tecnico"
                    : role === "admin"
                    ? "Admin"
                    : ""}
                </span>
              </div>
            </Link>
          </SidebarGroupLabel>

          <SidebarGroupContent className="flex flex-1 px-4">
            <SidebarMenu className="flex flex-col gap-2">
              {role === "user" ? (
                <>
                  <SidebarItem
                    title="Meus chamados"
                    href="/dashboard/user"
                    Icon={ClipboardList}
                    active={pathname === "/dashboard/user"}
                  />

                  <SidebarItem
                    title="Criar chamado"
                    href="/dashboard/user/newticket"
                    Icon={PlusIcon}
                    active={pathname === "/dashboard/user/newticket"}
                  />
                </>
              ) : role === "technician" ? (
                <>
                  <SidebarItem
                    title="Meus chamados"
                    href="/dashboard/technician"
                    Icon={ClipboardList}
                    active={pathname === "/dashboard/technician"}
                  />
                </>
              ) : (
                links.map(link => (
                  <SidebarItem
                    title={link.title}
                    href={link.href}
                    Icon={link.Icon}
                    key={link.id}
                    active={pathname === link.href}
                  />
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarFooter className="py-5 px-4 border-t border-gray-400/10">
            <UserMenu />
          </SidebarFooter>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
