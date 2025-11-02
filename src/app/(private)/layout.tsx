import AppSidebar from "@/components/AppSidebar"
import MenuMobile from "@/components/MenuMobile"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 h-screen lg:px-12 lg:py-14">
        <MenuMobile />
        {children}
      </main>
    </SidebarProvider>
  )
}
