"use client";

import Button from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Loader2, PenLine, Plus, Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import AddNewServiceModal from "./AddNewServiceModal";
import { Service } from "@/types/services";
import { getServices } from "@/lib/api/services";
import ServiceStatus from "@/components/ServiceStatus";
import { formatToBRL } from "@/utils/formatToBRL";

export default function ServicesPage() {
  const [data, setData] = useState<Service[] | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      const services = await getServices();
      setData(services);
      console.log(services);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div className="flex flex-col w-full h-full gap-10">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-3xl text-blue-500 font-bold">Serviços</h2>

        <AddNewServiceModal>
          <Button>
            <Plus />
            Novo
          </Button>
        </AddNewServiceModal>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader className="rounded-lg">
            <TableRow className="h-12">
              <TableHead className="w-4/50%] text-base">Titulo</TableHead>
              <TableHead className="w-[40%] text-base">Valor</TableHead>
              <TableHead className="w-[10%] text-base">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data ? (
              data?.map(service => (
                <TableRow
                  key={service.id}
                  className="transition-colors hover:bg-muted/50 h-16"
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    <span className="text-base text-gray-200 font-bold">
                      {service.title}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-base text-gray-200">
                      {formatToBRL(service.value)}
                    </span>
                  </TableCell>

                  <TableCell>
                    <ServiceStatus status={service.status} />
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
                      Nenhum servico localizado, por favor crie um serviço para
                      começar.
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
