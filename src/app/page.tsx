"use client"

import { MedicalSidebar } from "@/components/layout/medical-sidebar"
import { AppRouter } from "@/components/routing/app-router-fixed"

export default function Home() {
  return (
    <MedicalSidebar>
      <AppRouter />
    </MedicalSidebar>
  );
}
