"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart } from "recharts"
import { predictionData, currentMetrics } from "@/lib/mock-data"
import { Brain, TrendingUp, AlertTriangle, IndianRupee, Calendar, Target } from "lucide-react"

export default function PredictionsPage() {
  // Calculate prediction insights
  const futureData = predictionData.filter((item) => !item.actual)
  const historicalData = predictionData.filter((item) => item.actual)

  const avgPredicted = futureData.reduce((sum, item) => sum + item.predicted, 0) / futureData.length
  const avgHistorical = historicalData.reduce((sum, item) => sum + (item.actual || 0), 0) / historicalData.length

  const nextWeekTotal = futureData.reduce((sum, item) => sum + item.predicted, 0)
  const nextWeekCost = nextWeekTotal * 8 // ₹8 per kWh

  const monthlyProjection = avgPredicted * 30
  const monthlyProjectedCost = monthlyProjection * 8
  const budgetExcess = monthlyProjectedCost - currentMetrics.monthlyBudget
  const budgetExcessPercentage = (budgetExcess / currentMetrics.monthlyBudget) * 100

  // Accuracy calculation
  const accuracyData = historicalData.map((item) => ({
    ...item,
    accuracy: item.actual ? 100 - Math.abs((item.predicted - item.actual) / item.actual) * 100 : 0,
  }))
  const avgAccuracy = accuracyData.reduce((sum, item) => sum + item.accuracy, 0) / accuracyData.length

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Energy Predictions</h1>
          <p className="text-muted-foreground text-pretty">
            AI-powered forecasts and insights for your energy consumption
          </p>
        </div>

        {/* Prediction Accuracy & Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgAccuracy.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Based on last 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Week Forecast</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nextWeekTotal.toFixed(1)} kWh</div>
              <p className="text-xs text-muted-foreground">Predicted consumption</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projected Cost</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{nextWeekCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Next week estimate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Projection</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{monthlyProjectedCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Full month estimate</p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Alert */}
        {budgetExcess > 0 && (
          <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertTitle className="text-orange-800 dark:text-orange-200">Budget Alert</AlertTitle>
            <AlertDescription className="text-orange-700 dark:text-orange-300">
              You may exceed your monthly budget by <strong>₹{budgetExcess.toFixed(2)}</strong> (
              {budgetExcessPercentage.toFixed(1)}%) based on current predictions. Consider reducing usage during peak
              hours or adjusting your budget.
            </AlertDescription>
          </Alert>
        )}

        {/* Prediction vs Actual Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Prediction Accuracy</CardTitle>
            <CardDescription>Comparing AI predictions with actual consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-white rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={predictionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" tickFormatter={formatDate} className="text-xs" stroke="#666" />
                  <YAxis
                    label={{ value: "Consumption (kWh)", angle: -90, position: "insideLeft" }}
                    className="text-xs"
                    stroke="#666"
                  />
                  <Tooltip
                    labelFormatter={(value) => formatDate(value as string)}
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(1)} kWh`,
                      name === "predicted" ? "Predicted" : "Actual",
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <ReferenceLine x="2024-01-21" stroke="#999" strokeDasharray="2 2" />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                    connectNulls={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Predicted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Actual</span>
              </div>
              <div className="text-xs text-muted-foreground">Dashed line indicates today</div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Smart recommendations based on your usage patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Usage Pattern Detected</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Your energy consumption typically peaks between 6-8 PM. Consider shifting high-energy activities to
                    off-peak hours (10 PM - 6 AM) to reduce costs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                <Target className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100">Efficiency Opportunity</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Your HVAC system accounts for 44% of total usage. A 2°C adjustment could save approximately ₹400-600
                    per month while maintaining comfort.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900 dark:text-purple-100">Seasonal Forecast</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                    Based on weather predictions, expect a 15-20% increase in energy usage over the next month due to
                    heating demands. Budget accordingly.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
            <CardDescription>Detailed predictions for the upcoming week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {futureData.map((day, index) => {
                const cost = day.predicted * 8
                const isWeekend = new Date(day.date).getDay() === 0 || new Date(day.date).getDay() === 6
                return (
                  <div key={day.date} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-medium text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{formatDate(day.date)}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {isWeekend && (
                            <Badge variant="secondary" className="text-xs">
                              Weekend
                            </Badge>
                          )}
                          <span>Predicted usage</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{day.predicted.toFixed(1)} kWh</div>
                      <div className="text-sm text-muted-foreground">₹{cost.toFixed(2)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
