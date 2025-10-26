import { getCurrentUser } from "@/lib/api/users";
import { User } from "@/types/user";
import { useCallback, useEffect, useState } from "react";
import Avatar from "../Avatar";
import OptionsDropDownMenu from "./OptionsDropDownMenu";

export default function UserMenu() {
  const [user, setUser] = useState<User>();

  const fectchUser = useCallback(() => {
    getCurrentUser()
      .then(data => setUser(data))
      .catch(() => console.log("Deu erro"));
  }, []);

  useEffect(() => {
    fectchUser();
  }, [fectchUser]);

  return (
    <OptionsDropDownMenu onConfirm={fectchUser}>
      <div className="flex gap-3 w-full h-full items-center">
        <Avatar name={user?.name || ""} avatar={user?.avatar || null} />
        <div className="hidden md:flex gap-1 flex-col flex-1 items-start">
          <h2 className="text-gray-600 text-left">{user?.name}</h2>
          <span className="text-gray-400 text-sm">{user?.email}</span>
        </div>
      </div>
    </OptionsDropDownMenu>
  );
}
