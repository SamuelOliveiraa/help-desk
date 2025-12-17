"use client";

import { Loader2, PenLine, Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsersByRole } from "@/lib/fetchers/users";
import type { User } from "@/types/user";
import EditUserModal from "./EditUserModal";
import RemoveUserModal from "./RemoveUserModal";
import TableLoadingSkeleton from "@/components/TableLoadingSkeleton";
import ItensNotFound from "@/components/ItensNotFound";
import IconUpdateData from "@/components/IconUpdateData";

export default function CustomersPage() {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const users = await getUsersByRole("user");
      setData(users);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="flex flex-col w-full h-full gap-5 md:gap-10 ">
      <h2 className="text-3xl text-blue-500 font-bold p-5">Clientes</h2>

      <div className="border rounded-lg overflow-x-auto mx-3">
        <Table>
          <TableHeader className="rounded-lg">
            <TableRow className="h-12">
              <TableHead className="w-[50%] text-base">Nome</TableHead>
              <TableHead className="w-[40%] text-base">Email</TableHead>
              <TableHead className="text-right w-[10%]">
                <IconUpdateData loading={loading} onUpdate={fetchUsers} />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!loading ? (
              data?.map(user => (
                <TableRow
                  key={user.id}
                  className="transition-colors hover:bg-muted/50 h-16"
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar name={user.name} avatar={user.avatar || null} />
                    <span className="text-base text-gray-200 font-bold truncate max-w-lg">
                      {user.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-base text-gray-200 truncate max-w-lg w-full inline-block">
                      {user.email}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-3">
                    <RemoveUserModal
                      name={user.name}
                      id={user.id}
                      onConfirm={() => fetchUsers()}
                    >
                      <Button variant="secondary">
                        <Trash className="cursor-pointer text-red-400" />
                      </Button>
                    </RemoveUserModal>
                    <EditUserModal
                      id={user.id}
                      name={user.name}
                      email={user.email}
                      onConfirm={() => fetchUsers()}
                    >
                      <Button variant="secondary">
                        <PenLine className="cursor-pointer" />
                      </Button>
                    </EditUserModal>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableLoadingSkeleton />
            )}

            {data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <ItensNotFound
                    title="Nenhum cliente foi localizado"
                    description="Ainda não existe nenhum usuário no sistema. Assim que novos usuários forem criados ou registrados, eles aparecerão aqui"
                    className="mt-0"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
