import { getCurrentUser } from "@/lib/api/users";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import Avatar from "../Avatar";
import OptionsDropDownMenu from "./OptionsDropDownMenu";

export default function UserMenu() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getCurrentUser()
      .then(data => setUser(data))
      .catch(() => console.log("Deu erro"));
  }, []);

  return (
    <OptionsDropDownMenu>
      <div className="flex gap-3 w-full h-full items-center">
        <Avatar name={user?.name || ""} avatar={user?.avatar || null} />
        <div className="hidden md:flex gap-1 flex-col flex-1 items-start">
          <h2 className="text-gray-600">{user?.name}</h2>
          <span className="text-gray-400 text-sm">{user?.email}</span>
        </div>
      </div>
    </OptionsDropDownMenu>
  );
}
