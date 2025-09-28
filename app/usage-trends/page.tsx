"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { hourlyData, dailyData, monthlyData } from "@/lib/mock-data"
import { TrendingUp, Clock, Calendar, BarChart3 } from "lucide-react"

type TimeRange = "hourly" | "daily" | "monthly"

export default function UsageTrendsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("hourly")

  const getData = () => {
    switch (timeRange) {
      case "hourly":
        return hourlyData
      case "daily":
        return dailyData
      case "monthly":
        return monthlyData
      default:
        return hourlyData
    }
  }

  const getXAxisKey = () => {
    switch (timeRange) {
      case "hourly":
        return "timestamp"
      case "daily":
        return "timestamp"
      case "monthly":
        return "timestamp"
      default:
        return "timestamp"
    }
  }

  const formatXAxis = (value: string) => {
    switch (timeRange) {
      case "hourly":
        return value
      case "daily":
        return new Date(value).toLocaleDateString("en-IN", { month: "short", day: "numeric" })
      case "monthly":
        return new Date(value + "-01").toLocaleDateString("en-IN", { month: "short", year: "numeric" })
      default:
        return value
    }
  }

  const getUnit = () => {
    switch (timeRange) {
      case "hourly":
        return "kW"
      case "daily":
      case "monthly":
        return "kWh"
      default:
        return "kW"
    }
  }

  const data = getData()
  const avgConsumption = data.reduce((sum, item) => sum + item.consumption, 0) / data.length
  const maxConsumption = Math.max(...data.map((item) => item.consumption))
  const totalCost = data.reduce((sum, item) => sum + item.cost, 0)

  // Find peak hours (for hourly view)
  const peakHours = timeRange === "hourly" ? hourlyData.filter((item) => item.consumption > avgConsumption * 1.2) : []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Usage Trends</h1>
            <p className="text-muted-foreground text-pretty">Analyze your energy consumption patterns over time</p>
          </div>
          <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hourly (Today)
                </div>
              </SelectItem>
              <SelectItem value="daily">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Daily (30 Days)
                </div>
              </SelectItem>
              <SelectItem value="monthly">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Monthly (12 Months)
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Consumption</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {avgConsumption.toFixed(1)} {getUnit()}
              </div>
              <p className="text-xs text-muted-foreground">
                {timeRange === "hourly"
                  ? "Per hour today"
                  : timeRange === "daily"
                    ? "Per day (30 days)"
                    : "Per month (12 months)"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peak Consumption</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {maxConsumption.toFixed(1)} {getUnit()}
              </div>
              <p className="text-xs text-muted-foreground">Highest recorded usage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {timeRange === "hourly" ? "Today" : timeRange === "daily" ? "Last 30 days" : "Last 12 months"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Peak Hours Alert (only for hourly view) */}
        {timeRange === "hourly" && peakHours.length > 0 && (
          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-200">Peak Usage Hours</CardTitle>
              <CardDescription className="text-orange-700 dark:text-orange-300">
                High consumption periods detected today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {peakHours.map((hour) => (
                  <Badge
                    key={hour.timestamp}
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                  >
                    {hour.timestamp} ({hour.consumption.toFixed(1)} kW)
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Consumption Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Consumption</CardTitle>
            <CardDescription>
              {timeRange === "hourly"
                ? "Hourly consumption for today"
                : timeRange === "daily"
                  ? "Daily consumption for the last 30 days"
                  : "Monthly consumption for the last 12 months"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-white rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey={getXAxisKey()} tickFormatter={formatXAxis} className="text-xs" stroke="#666" />
                  <YAxis
                    label={{ value: `Consumption (${getUnit()})`, angle: -90, position: "insideLeft" }}
                    className="text-xs"
                    stroke="#666"
                  />
                  <Tooltip
                    labelFormatter={(value) => formatXAxis(value as string)}
                    formatter={(value: number) => [`${value.toFixed(2)} ${getUnit()}`, "Consumption"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  {timeRange === "hourly" && (
                    <ReferenceLine
                      y={avgConsumption}
                      stroke="#f59e0b"
                      strokeDasharray="5 5"
                      label={{ value: "Average", position: "topRight" }}
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cost Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Cost</CardTitle>
            <CardDescription>Cost breakdown over the selected time period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-white rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey={getXAxisKey()} tickFormatter={formatXAxis} className="text-xs" stroke="#666" />
                  <YAxis
                    label={{ value: "Cost (₹)", angle: -90, position: "insideLeft" }}
                    className="text-xs"
                    stroke="#666"
                  />
                  <Tooltip
                    labelFormatter={(value) => formatXAxis(value as string)}
                    formatter={(value: number) => [`₹${value.toFixed(2)}`, "Cost"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="cost" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
