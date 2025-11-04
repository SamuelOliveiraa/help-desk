"use client"

import { Loader2, PenLine, Plus, Trash } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import Button from "@/components/Button"
import ServiceStatus from "@/components/ServiceStatus"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getServices } from "@/lib/api/services"
import type { Service } from "@/types/services"
import { formatToBRL } from "@/utils/formatToBRL"
import AddNewServiceModal from "./AddNewServiceModal"
import RemoveServiceModal from "./RemoveServiceModal"

export default function ServicesPage() {
  const [data, setData] = useState<Service[] | null>(null)

  const fetchServices = useCallback(async () => {
    try {
      const services = await getServices()
      setData(services)
    } catch (err) {
      console.error("Erro ao buscar usuários:", err)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return (
    <div className="flex flex-col w-full h-full gap-10">
      <div className="flex w-full items-center justify-between p-4">
        <h2 className="text-3xl text-blue-500 font-bold">Serviços</h2>

        <AddNewServiceModal
          onConfirm={() => {
            fetchServices()
          }}
        >
          <Button>
            <Plus />
            <span className="hidden md:block">Novo</span>
          </Button>
        </AddNewServiceModal>
      </div>

      <div className="border rounded-lg overflow-x-auto mx-3">
        <Table>
          <TableHeader className="rounded-lg">
            <TableRow className="h-12">
              <TableHead className="w-[50%] text-base">Titulo</TableHead>
              <TableHead className="w-[40%] text-base">Valor</TableHead>
              <TableHead className="w-[10%] text-base">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data ? (
              data?.map((service) => (
                <TableRow
                  key={service.id}
                  className="transition-colors hover:bg-muted/50 h-16 sm:px-12"
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    <span className="truncate w-36 sm:w-auto text-base text-gray-200 font-bold">
                      {service.title}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-base text-gray-200">{formatToBRL(service.value)}</span>
                  </TableCell>

                  <TableCell>
                    <ServiceStatus status={service.status} />
                  </TableCell>

                  <TableCell className="flex items-center justify-end gap-3">
                    <RemoveServiceModal
                      title={service.title}
                      id={service.id}
                      onConfirm={() => {
                        fetchServices()
                      }}
                    >
                      <Button variant="secondary">
                        <Trash className="cursor-pointer text-red-400" />
                      </Button>
                    </RemoveServiceModal>
                    <AddNewServiceModal
                      id={service.id}
                      title={service.title}
                      value={service.value}
                      status={service.status ? "true" : "false"}
                      onConfirm={() => {
                        fetchServices()
                      }}
                    >
                      <Button variant="secondary">
                        <PenLine className="cursor-pointer" />
                      </Button>
                    </AddNewServiceModal>
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
                      Nenhum servico localizado, por favor crie um serviço para começar.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
