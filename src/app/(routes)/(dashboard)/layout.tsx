import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/sidebar/index";
import { auth } from "@/lib/auth";
import { RiLoader5Fill } from "@remixicon/react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React, { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <RiLoader5Fill className="size-16 animate-spin text-primary" />
        </div>
      }
    >
      <NuqsAdapter>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="relative overflow-x-hidden pt-0">
            {children}
          </SidebarInset>
        </SidebarProvider>
      </NuqsAdapter>
    </Suspense>
  );
}
