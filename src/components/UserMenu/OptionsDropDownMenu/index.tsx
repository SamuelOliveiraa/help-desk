import { LogOut, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogOutDialog from "../LogOutDialog";
import ProfileDialog from "../ProfileDialog";

export default function OptionsDropDownMenu({
  children,
  onConfirm,
  isMobile,
}: {
  children: React.ReactNode;
  onConfirm: () => void;
  isMobile?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={isMobile ? "bottom" : "left"}
        sideOffset={isMobile ? 38 : 20}
        className="w-48  bg-gray-100 flex flex-col gap-2 py-3 border-none mb-2"
      >
        <label className="uppercase text-gray-400/60 text-xs ml-2">
          Opções
        </label>
        <ProfileDialog onConfirm={onConfirm}>
          <DropdownMenuItem
            onSelect={e => e.preventDefault()}
            className="text-gray-600 text-lg cursor-pointer"
          >
            <UserCircle />
            Perfil
          </DropdownMenuItem>
        </ProfileDialog>

        <LogOutDialog>
          <DropdownMenuItem
            onSelect={e => e.preventDefault()}
            className="text-red-500 text-lg hover:text-red-500 cursor-pointer"
          >
            <LogOut />
            Sair
          </DropdownMenuItem>
        </LogOutDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
