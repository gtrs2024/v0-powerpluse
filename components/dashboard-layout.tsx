"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, TrendingUp, PieChart, Brain, Settings, Menu, X, User, Sun, Moon } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"

const navigation = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Usage Trends", href: "/usage-trends", icon: TrendingUp },
  { name: "Device Analysis", href: "/device-analysis", icon: PieChart },
  { name: "Predictions", href: "/predictions", icon: Brain },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-background smooth-transition">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden animate-fade-in-up"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-all duration-300 ease-out lg:translate-x-0 animate-slide-in-left",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-20 items-center justify-center px-6 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-full animate-scale-in">
            <Image
              src="/images/powerpulse-logo.png"
              alt="PowerPulse"
              width={180}
              height={60}
              className="h-12 w-auto animate-pulse-glow"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden ml-auto smooth-transition"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-3">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium smooth-transition card-hover",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-lg"
                        : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground hover:shadow-md",
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-md px-6 smooth-transition">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden smooth-transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center justify-center flex-1 lg:hidden">
            <Image src="/images/powerpulse-logo.png" alt="PowerPulse" width={140} height={45} className="h-8 w-auto" />
          </div>

          <div className="hidden lg:flex flex-1" />

          {mounted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="smooth-transition hover:scale-110"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </div>

        <main className="p-6 animate-fade-in-up">{children}</main>
      </div>
    </div>
  )
}
