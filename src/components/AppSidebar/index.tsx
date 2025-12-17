"use client";

import { useEffect, useState } from "react";
import type { Role } from "@/types/user";
import { getTokenRole } from "@/utils/client/cookies";
import HeaderLogo from "../HeaderLogo";
import SidebarMenuItens from "../SidebarMenuItens";
import UserMenu from "../UserMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from "../ui/sidebar";

export default function AppSidebar() {
  const [role, setRole] = useState<Role | null>(null);
  const { isMobile, setOpen, open } = useSidebar();

  useEffect(() => {
    const roleToken = getTokenRole();
    setRole(roleToken);
  }, []);

  // Verificar se a tela é menor que 1200px e colapsar a sidebar
  useEffect(() => {
    if (isMobile) return;

    const handleResize = () => {
      // Se a tela for menor que 1200px, colapsa a sidebar
      if (window.innerWidth < 1200) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    // Executa a verificação assim que o componente monta
    handleResize();

    // Adiciona o listener para quando a janela for redimensionada
    window.addEventListener("resize", handleResize);

    // Remove o listener quando o componente desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen, isMobile]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-gray-100">
        <SidebarGroup className="flex flex-col h-full gap-4 p-0">
          <div className="w-full flex md:items-center md:justify-center xl:items-start xl:justify-start xl:py-4 xl:px-3 border-b border-gray-400/10 rounded-none min-h-24">
            <HeaderLogo role={role} />
          </div>

          <SidebarGroupContent className="flex flex-1 xl:px-4">
            <SidebarMenuItens role={role} />
          </SidebarGroupContent>

          <SidebarFooter className="md:py-3 xl:py-5 xl:px-4 border-t border-gray-400/10">
            <UserMenu size={!open ? "sm" : "lg"} />
          </SidebarFooter>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
