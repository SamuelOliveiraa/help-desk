import { useCallback, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api/users";
import type { User } from "@/types/user";
import Avatar from "../Avatar";
import OptionsDropDownMenu from "./OptionsDropDownMenu";
import { Skeleton } from "../ui/skeleton";

export default function UserMenu({ isMobile }: { isMobile?: boolean }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <OptionsDropDownMenu isMobile={isMobile} onConfirm={fetchUser}>
      <div className="flex gap-3 h-full items-center cursor-pointer">
        <Avatar
          loading={loading}
          name={user?.name || ""}
          avatar={user?.avatar || null}
        />

        {user ? (
          <div className="hidden md:flex gap-1 flex-col flex-1 md:items-start">
            <h2 className="text-gray-600 text-left">{user?.name}</h2>
            <span className="text-gray-400 text-sm">{user?.email}</span>
          </div>
        ) : (
          <Skeleton className="flex flex-1 h-12" />
        )}
      </div>
    </OptionsDropDownMenu>
  );
}
