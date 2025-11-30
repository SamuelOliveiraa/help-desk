import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { tv } from "tailwind-variants";

type SidebarItemProps = {
  title: string;
  Icon: LucideIcon;
  href: string;
  active?: boolean;
};

const sidebarItemLinkVariants = tv({
  base: "p-3 rounded-lg w-full flex items-center gap-2 cursor-pointer hover:bg-blue-500 hover:text-gray-600",
  variants: {
    active: {
      true: "bg-blue-500 text-gray-600",
      false: "text-gray-400",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export default function SidebarItem({
  title,
  Icon,
  href,
  active,
}: SidebarItemProps) {
  return (
    <Link href={href} className={sidebarItemLinkVariants({ active })}>
      <Icon size={24} />
      <span className="block">{title}</span>
    </Link>
  );
}
