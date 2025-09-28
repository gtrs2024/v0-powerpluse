"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { deviceData } from "@/lib/mock-data"
import { Zap, AlertCircle, CheckCircle, Pause } from "lucide-react"

type ViewPeriod = "today" | "week" | "month"

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "#8884d8",
]

export default function DeviceAnalysisPage() {
  const [viewPeriod, setViewPeriod] = useState<ViewPeriod>("today")

  // Simulate different data for different periods
  const getDeviceData = () => {
    const multiplier = viewPeriod === "today" ? 1 : viewPeriod === "week" ? 7 : 30
    return deviceData.map((device) => ({
      ...device,
      consumption: device.consumption * multiplier,
    }))
  }

  const data = getDeviceData()
  const totalConsumption = data.reduce((sum, device) => sum + device.consumption, 0)
  const topDevices = data.slice(0, 3)
  const activeDevices = data.filter((device) => device.status === "active").length
  const idleDevices = data.filter((device) => device.status === "idle").length
  const offDevices = data.filter((device) => device.status === "off").length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "idle":
        return <Pause className="h-4 w-4 text-yellow-500" />
      case "off":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "idle":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "off":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getUnit = () => {
    return viewPeriod === "today" ? "kWh" : "kWh"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Device Analysis</h1>
            <p className="text-muted-foreground text-pretty">Monitor individual device consumption and performance</p>
          </div>
          <Select value={viewPeriod} onValueChange={(value: ViewPeriod) => setViewPeriod(value)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalConsumption.toFixed(1)} {getUnit()}
              </div>
              <p className="text-xs text-muted-foreground">All devices combined</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeDevices}</div>
              <p className="text-xs text-muted-foreground">Currently consuming power</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Idle Devices</CardTitle>
              <Pause className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{idleDevices}</div>
              <p className="text-xs text-muted-foreground">Standby mode</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Off Devices</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{offDevices}</div>
              <p className="text-xs text-muted-foreground">Not consuming power</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Consumers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Energy Consumers</CardTitle>
            <CardDescription>Devices with highest energy consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDevices.map((device, index) => (
                <div key={device.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{device.name}</span>
                        {getStatusIcon(device.status)}
                        <Badge variant="secondary" className={getStatusColor(device.status)}>
                          {device.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{device.percentage}% of total usage</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {device.consumption.toFixed(1)} {getUnit()}
                    </div>
                    <Progress value={device.percentage} className="w-20 h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Consumption Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Consumption Distribution</CardTitle>
              <CardDescription>Energy usage breakdown by device</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-white rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="consumption"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value.toFixed(1)} ${getUnit()}`, "Consumption"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Device Comparison Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Device Comparison</CardTitle>
              <CardDescription>Side-by-side consumption comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-white rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      className="text-xs"
                      stroke="#666"
                      interval={0}
                    />
                    <YAxis
                      label={{ value: `Consumption (${getUnit()})`, angle: -90, position: "insideLeft" }}
                      className="text-xs"
                      stroke="#666"
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value.toFixed(1)} ${getUnit()}`, "Consumption"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="consumption" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Devices List */}
        <Card>
          <CardHeader>
            <CardTitle>All Devices</CardTitle>
            <CardDescription>Complete list of monitored devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.map((device) => (
                <div key={device.name} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(device.status)}
                    <div>
                      <div className="font-medium">{device.name}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary" className={getStatusColor(device.status)}>
                          {device.status}
                        </Badge>
                        <span>{device.percentage}% of total</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {device.consumption.toFixed(1)} {getUnit()}
                    </div>
                    <Progress value={device.percentage} className="w-24 h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
