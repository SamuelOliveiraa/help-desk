import { getCurrentUser } from "@/lib/api/users";
import { User } from "@/types/user";
import { getInitialNames } from "@/utils/getInitialNames";
import Image from "next/image";
import { useEffect, useState } from "react";
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
        <div className="w-10 h-10 rounded-full">
          {user?.avatar ? (
            <Image alt="Usuario image" src={user.avatar} />
          ) : (
            <div className="w-full h-full rounded-full bg-blue-500 flex text-gray-600 uppercase items-center justify-center">
              {user && <span> {getInitialNames(user?.name)} </span>}
            </div>
          )}
        </div>

        <div className="hidden md:flex gap-1 flex-col flex-1 items-start">
          <h2 className="text-gray-600">{user?.name}</h2>

          <span className="text-gray-400 text-sm">{user?.email}</span>
        </div>
      </div>
    </OptionsDropDownMenu>
  );
}
