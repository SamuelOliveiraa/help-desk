"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";
import AppSidebar from "/src/components/AppSidebar";
import { SidebarProvider } from "/src/components/ui/sidebar";

export type UserRoleProps = {
  userRole: "admin" | "client" | "technical";
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const teste: UserRoleProps = { userRole: "admin" };

  const router = useRouter();

  useEffect(() => {
    if (teste.userRole === "admin") {
      router.push("/dashboard/admin");
    }

    if (teste.userRole === "client") {
      router.push("/dashboard/user/tickets");
    }

    if (teste.userRole === "technical") {
      router.push("/dashboard/technical/tickets");
    }
  }, [router, teste.userRole]);

  return (
    <SidebarProvider>
      <AppSidebar userRole={teste.userRole} />
      <main className="w-full h-screen">{children}</main>
    </SidebarProvider>
  );
}
