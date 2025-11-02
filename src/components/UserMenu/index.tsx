import { useCallback, useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/api/users"
import type { User } from "@/types/user"
import Avatar from "../Avatar"
import OptionsDropDownMenu from "./OptionsDropDownMenu"

export default function UserMenu({ isMobile }: { isMobile?: boolean }) {
  const [user, setUser] = useState<User>()

  const fectchUser = useCallback(() => {
    getCurrentUser()
      .then((data) => setUser(data))
      .catch(() => console.log("Deu erro"))
  }, [])

  useEffect(() => {
    fectchUser()
  }, [fectchUser])

  return (
    <OptionsDropDownMenu isMobile={isMobile} onConfirm={fectchUser}>
      <div className="flex gap-3 h-full items-center cursor-pointer">
        <Avatar name={user?.name || ""} avatar={user?.avatar || null} />
        <div className="hidden md:flex gap-1 flex-col flex-1 md:items-start">
          <h2 className="text-gray-600 text-left">{user?.name}</h2>
          <span className="text-gray-400 text-sm">{user?.email}</span>
        </div>
      </div>
    </OptionsDropDownMenu>
  )
}
