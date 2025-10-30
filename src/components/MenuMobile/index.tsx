"use client";

import { useEffect, useState } from "react";
import { getTokenRole } from "@/utils/cookies";
import type { Role } from "@/types/user";
import HeaderLogo from "../HeaderLogo";
import UserMenu from "../UserMenu";
import { Menu } from "lucide-react";
import Button from "../Button";
import MenuOptionsDropDown from "./MenuOptionsDropDown";

export default function MenuMobile() {
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    getTokenRole().then(setRole);
  }, []);

  return (
    <div className="w-full  h-28 bg-gray-100 flex justify-between items-center px-8 md:hidden">
      <div className="flex items-center  gap-3">
        <MenuOptionsDropDown role={role}>
          <Button>
            <Menu />
          </Button>
        </MenuOptionsDropDown>
        <HeaderLogo role={role || "admin"} />
      </div>
      <UserMenu isMobile={true} />
    </div>
  );
}
