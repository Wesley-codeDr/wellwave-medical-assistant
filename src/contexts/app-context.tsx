"use client"

import * as React from "react"
import { AnamneseData } from "@/types/anamnese"

interface AppContextType {
  currentPage: string
  setCurrentPage: (page: string) => void
  anamneseData: AnamneseData | null
  setAnamneseData: (data: AnamneseData | null) => void
  activeAnamneseId: string | null
  setActiveAnamneseId: (id: string | null) => void
}

const AppContext = React.createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = React.useState("dashboard")
  const [anamneseData, setAnamneseData] = React.useState<AnamneseData | null>(null)
  const [activeAnamneseId, setActiveAnamneseId] = React.useState<string | null>(null)

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        anamneseData,
        setAnamneseData,
        activeAnamneseId,
        setActiveAnamneseId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
