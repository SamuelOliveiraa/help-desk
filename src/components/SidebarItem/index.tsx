import { LucideIcon } from "lucide-react";
import Link from "next/link";

type SidebarItemProps = {
  title: string;
  Icon: LucideIcon;
  href: string;
  active?: boolean;
};

export default function SidebarItem({
  title,
  Icon,
  href,
  active
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`p-3 rounded-lg w-full flex items-center gap-2 cursor-pointer hover:bg-blue-500 hover:text-gray-600 ${
        active ? "bg-blue-500 text-gray-600" : "text-gray-400"
      } `}
    >
      <Icon size={24} />
      <span className="hidden lg:block">{title}</span>
    </Link>
  );
}
