import Image from "next/image";
import { getInitialNames } from "@/utils/getInitialNames";

export default function Avatar({
	name,
	avatar,
	size
}: {
	name: string;
	avatar: string | null;
	size?: 'sm' | "lg";
}) {
	return (
		<div className={`rounded-full ${size === 'sm' ? "w-7 h-7" : "w-12 h-12 "} `}>
			{avatar ? (
				<Image alt="Usuario image" src={avatar} width={100} height={100} />
			) : (
				<div className="w-full h-full rounded-full bg-blue-500 flex text-gray-600 uppercase items-center justify-center">
					<span className={`${size === 'sm' ? 'text-xs' : "text-base"}`}> {getInitialNames(name)} </span>
				</div>
			)}
		</div>
	);
}
