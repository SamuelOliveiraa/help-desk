"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { getUsersByRole } from "@/lib/api/users";
import { User } from "@/types/user";
import { Loader2, PenLine, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function CustomersPage() {
  const [data, setData] = useState<User[] | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUsersByRole("user");
        setData(users);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-10">
      <h2 className="text-3xl text-blue-500 font-bold">Clientes</h2>

      <div className="border rounded-lg">
        <Table>
          <TableHeader className="rounded-lg">
            <TableRow className="h-12">
              <TableHead className="w-[50%] text-base">Nome</TableHead>
              <TableHead className="w-[40%] text-base">Email</TableHead>
              <TableHead className="text-right w-[10%]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data ? (
              data?.map(user => (
                <TableRow
                  key={user.id}
                  className="transition-colors hover:bg-muted/50 h-16"
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar name={user.name} avatar={user.avatar || null} />
                    <span className="text-base text-gray-200 font-bold">
                      {user.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-base text-gray-200">
                      {user.email}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-3">
                    <Button variant="secondary">
                      <Trash className="cursor-pointer text-red-400" />
                    </Button>
                    <Button variant="secondary">
                      <PenLine className="cursor-pointer" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            )}

            {data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-base text-gray-200">
                      Nenhum cliente localizado.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
