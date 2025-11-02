import { useState } from "react"
import toast from "react-hot-toast"
import Button from "@/components/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteUser } from "@/lib/api/users"

export default function RemoveUserModal({
  children,
  id,
  name,
  onConfirm,
}: {
  children: React.ReactNode
  id: number
  name: string
  onConfirm: () => void
}) {
  const [loading, setLoading] = useState(false)

  async function handleDeleteUser() {
    setLoading(true)
    try {
      const response = await deleteUser(id)
      if (response?.message) {
        toast.success(response?.message)
        onConfirm()
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md w-full flex flex-col gap-5">
        <DialogHeader>
          <DialogTitle className="text-xl">Deseja realmente excluir {`"${name}"`}?</DialogTitle>
        </DialogHeader>
        <p className="text-base">
          Ao excluir, todos os chamados deste cliente serão removidos e esta ação não poderá ser
          desfeita.
        </p>

        <div className="flex gap-2">
          <DialogTrigger asChild>
            <Button fullWidth variant="secondary">
              Não
            </Button>
          </DialogTrigger>

          <DialogTrigger asChild>
            <Button fullWidth loading={loading} onClick={handleDeleteUser}>
              Sim
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  )
}
