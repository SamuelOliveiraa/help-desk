"use client";

import { PenLine, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import TagTime from "@/components/TagTime";
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
import TableLoadingSkeleton from "@/components/TableLoadingSkeleton";
import ItensNotFound from "@/components/ItensNotFound";
import IconUpdateData from "@/components/IconUpdateData";

export default function TechnicalsPage() {
  const [data, setData] = useState<User[] | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const fetchTechnicals = useCallback(async () => {
    setLoading(true);
    try {
      const technicals = await getUsersByRole("technician");
      setData(technicals);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTechnicals();
  }, [fetchTechnicals]);

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

      <div className="border rounded-lg overflow-x-auto mx-3">
        <Table>
          <TableHeader className="rounded-lg">
            <TableRow className="h-12">
              <TableHead className="w-[30%] text-base">Nome</TableHead>
              <TableHead className="w-[20%] text-base">Email</TableHead>
              <TableHead className="w-[50%] text-base">
                Disponibilidade
              </TableHead>
              <TableHead className="w-[50%] text-base">
                <IconUpdateData loading={loading} onUpdate={fetchTechnicals} />
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
                    <span className="text-base text-gray-200 font-bold max-w-80 truncate">
                      {user.name}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-base text-gray-200 truncate max-w-80 inline-block">
                      {user.email}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {user?.workingHours.length !== 0 ? (
                        <>
                          {user?.workingHours
                            .sort((a, b) => a.id - b.id)
                            .slice(0, 5)
                            .map(hour => (
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
              <TableLoadingSkeleton />
            )}

            {data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <ItensNotFound
                    title="Nenhum técnico foi localizado"
                    description="Você ainda não adicionou nenhum técnico no sistema. Clique no botão acima para criar o primeiro técnico."
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
