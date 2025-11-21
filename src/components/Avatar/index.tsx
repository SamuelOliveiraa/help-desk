import Image from "next/image";
import { getInitialNames } from "@/utils/getInitialNames";
import { Skeleton } from "../ui/skeleton";
import { tv } from "tailwind-variants";

const skeletonVariants = tv({
	base: "",
	variants: {
		size: {
			sm: "w-7 h-7",
			lg: "w-12 h-12"
		}
	},
	defaultVariants: {
		size: "lg"
	}
})

const avatarContainerVariants = tv({
	base: "rounded-full",
	variants: {
		size: {
			sm: "w-7 h-7",
			lg: "w-12 h-12"
		}
	},
	defaultVariants: {
		size: "lg"
	}
})

const avatarSpanTextVariants = tv({
	base: "",
	variants: {
		size: {
			sm: "text-xs",
			lg: "text-base"
		}
	},
	defaultVariants: {
		size: "lg"
	}
})

export default function Avatar({
	name,
	avatar,
	size,
	loading
}: {
	name: string;
	avatar: string | null;
	size?: 'sm' | "lg";
	loading?: boolean
}) {
	if (loading) {
		return (
			<Skeleton className={skeletonVariants({ size })} />
		)
	}
	return (
		<div className={avatarContainerVariants({ size })}>
			{avatar ? (
				<Image alt="Usuario image" src={avatar} fill width={100} height={100} />
			) : (
				<div className="w-full h-full rounded-full bg-blue-500 flex text-gray-600 uppercase items-center justify-center">
					<span className={avatarSpanTextVariants({ size })}>
						{getInitialNames(name)}
					</span>
				</div>
			)}
		</div>
	);
}
