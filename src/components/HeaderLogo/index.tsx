import Image from "next/image";
import Link from "next/link";
import type { Role } from "@/types/user";

export default function HeaderLogo({ role }: { role: Role }) {
	return (
		<Link href={`/dashboard/${role}`} className="flex gap-3 items-center">
			<Image src={"/logo.svg"} alt="Logo help desk" width={50} height={50} />
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
	);
}
