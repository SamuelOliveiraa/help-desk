import Image from "next/image";
import Link from "next/link";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen bg-[url('/background.png')] bg-cover bg-center flex items-center justify-end md:overflow-hidden ">
      <div className="flex flex-1 max-w-2xl rounded-3xl bg-white h-full px-6 py-8 md:px-0 relative -bottom-10 md:items-center justify-center md:-bottom-4 md:-right-5 ">
        <div className="max-w-sm w-full flex flex-col gap-6 items-center">
          <Link href="/login">
            <Image
              alt="Logo do site HelpDesk"
              src={"/logo-help-desk.png"}
              width={170}
              height={170}
            />
          </Link>

          {children}
        </div>
      </div>
    </div>
  );
}
