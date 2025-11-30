"use client";

import SidebarMenuItens from "@/components/SidebarMenuItens";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Role } from "@/types/user";

export default function MenuOptionsDropDown({
  children,
  role,
}: {
  children: React.ReactNode;
  role: Role | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        sideOffset={44}
        className="w-64 mx-2 bg-gray-100 flex flex-col gap-2 py-3 border-none mb-2"
      >
        <label className="uppercase text-gray-400/60 text-xs ml-2">Menu</label>
        <SidebarMenuItens role={role || "technician"} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
