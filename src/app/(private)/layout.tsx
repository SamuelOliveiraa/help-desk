import AppSidebar from "@/components/AppSidebar";
import MenuMobile from "@/components/MenuMobile";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-svh md:py-12 xl:p-12">
        <MenuMobile />
        {children}
      </main>
    </SidebarProvider>
  );
}
