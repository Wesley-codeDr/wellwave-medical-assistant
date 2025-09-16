"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { AppRouter } from "@/components/routing/app-router"

export default function Home() {
  return (
    <AppSidebar>
      <AppRouter />
    </AppSidebar>
  );
}
