"use client";

import { Toaster } from "sonner";
import { QueryProvider } from "./query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <TooltipProvider>{children}</TooltipProvider>

      <Toaster position="top-center" duration={3000} richColors />
    </QueryProvider>
  );
};
