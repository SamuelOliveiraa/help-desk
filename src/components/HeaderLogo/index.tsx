import Image from "next/image";
import Link from "next/link";
import type { Role } from "@/types/user";
import { Skeleton } from "../ui/skeleton";

const roleLabels = {
  user: "Cliente",
  technician: "Técnico",
  admin: "Admin",
};

export default function HeaderLogo({ role }: { role?: Role | null }) {
  return (
    <Link href={`/dashboard/${role}`} className="flex items-center gap-2">
      <Image src={"/logo.svg"} alt="Logo help desk" width={40} height={40} />

      <div className="md:hidden xl:block">
        <h2 className="text-gray-600 text-xl">HelpDesk</h2>
        <span className="uppercase text-blue-100 text-xs">
          {role ? (
            roleLabels[role]
          ) : (
            <Skeleton className="flex flex-1 h-4 rounded-sm" />
          )}
        </span>
      </div>
    </Link>
  );
}
