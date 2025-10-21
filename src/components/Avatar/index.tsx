import { getInitialNames } from "@/utils/getInitialNames";
import Image from "next/image";

export default function Avatar({
  name,
  avatar
}: {
  name: string;
  avatar: string | null;
}) {
  return (
    <div className="w-10 h-10 rounded-full">
      {avatar ? (
        <Image alt="Usuario image" src={avatar} width={100} height={100} />
      ) : (
        <div className="w-full h-full rounded-full bg-blue-500 flex text-gray-600 uppercase items-center justify-center">
          <span> {getInitialNames(name)} </span>
        </div>
      )}
    </div>
  );
}
