import {
  BriefcaseBusiness,
  ClipboardList,
  PlusIcon,
  Users,
  Wrench
} from "lucide-react";
import SidebarItem from "../SidebarItem";
import { usePathname } from "next/navigation";
import { Role } from "@/types/user";

export default function SidebarMenuItens({ role }: { role: Role }) {
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

  const pathname = usePathname();
  return (
    <div className="w-full flex flex-col gap-2">
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
    </div>
  );
}
