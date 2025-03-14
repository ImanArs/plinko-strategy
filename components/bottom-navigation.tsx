"use client"

import { motion } from "framer-motion"
import { Home, BookOpen, AlertTriangle, TrendingUp, Settings } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  const tabs = [
    { id: "home", label: "Home", icon: <Home className="h-6 w-6" /> },
    { id: "strategies", label: "Strategies", icon: <BookOpen className="h-6 w-6" /> },
    { id: "myths", label: "Myths", icon: <AlertTriangle className="h-6 w-6" /> },
    { id: "recovery", label: "Recovery", icon: <TrendingUp className="h-6 w-6" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-6 w-6" /> },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around bg-gray-800 shadow-lg">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          className={`relative flex flex-col items-center justify-center px-2 py-1 ${
            activeTab === tab.id ? "text-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveTab(tab.id)}
          whileTap={{ scale: 0.9 }}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute -top-1 h-1 w-10 rounded-full bg-purple-500"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <motion.div
            animate={{
              y: activeTab === tab.id ? -2 : 0,
              scale: activeTab === tab.id ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {tab.icon}
          </motion.div>
          <span className="mt-1 text-xs">{tab.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

