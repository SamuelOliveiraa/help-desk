"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import TagTime from "@/components/TagTime";
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
import { Loader2, PenLine, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TechnicalsPage() {
  const [data, setData] = useState<User[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchTechnicals() {
      try {
        const technicals = await getUsersByRole("technician");
        setData(technicals);
        console.log(technicals);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    }

    fetchTechnicals();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-10">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-3xl text-blue-500 font-bold">Técnicos</h2>

        <Button
          onClick={() => router.push("/dashboard/admin/technicals/details")}
        >
          <Plus />
          Novo
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader className="rounded-lg">
            <TableRow className="h-12">
              <TableHead className="w-[30%] text-base">Nome</TableHead>
              <TableHead className="w-[20%] text-base">Email</TableHead>
              <TableHead className="w-[50%] text-base">
                Disponibilidade
              </TableHead>
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

                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {user?.workingHours.length !== 0 ? (
                        <>
                          {user?.workingHours.slice(0, 5).map(hour => (
                            <TagTime
                              key={hour.id}
                              text={hour?.time}
                              selected={false}
                            />
                          ))}

                          {user.workingHours.length > 5 && (
                            <TagTime
                              text={`+${user.workingHours.length - 5}`}
                            />
                          )}
                        </>
                      ) : (
                        <span>Tecnico sem horario definido</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="flex items-center justify-end gap-3">
                    <Button variant="secondary">
                      <PenLine
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/dashboard/admin/technicals/${user.id}`)
                        }
                      />
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
                      Nenhum tecnico localizado.
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
