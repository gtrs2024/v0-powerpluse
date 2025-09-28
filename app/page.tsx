import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { currentMetrics } from "@/lib/mock-data"
import { ArrowRight, Zap, IndianRupee, TrendingUp, AlertTriangle, PieChart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const budgetUsedPercentage = (currentMetrics.monthlyUsed / currentMetrics.monthlyBudget) * 100

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            PowerPulse Overview
          </h1>
          <p className="text-muted-foreground text-pretty mt-2 text-lg">
            Monitor your energy consumption and costs in real-time
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Current Power */}
          <Card className="bg-card text-card-foreground border-0 shadow-lg card-hover animate-scale-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-card-foreground">Current Power</CardTitle>
              <Zap className="h-5 w-5 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-card-foreground">{currentMetrics.currentPower} kW</div>
              <p className="text-xs text-card-foreground/80 mt-1">Live consumption</p>
              <Link href="/usage-trends">
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3 h-8 px-3 bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  View Details <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Today's Usage */}
          <Card
            className="bg-card text-card-foreground border-0 shadow-lg card-hover animate-scale-in"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-card-foreground">Today's Usage</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-card-foreground">{currentMetrics.todayUsage} kWh</div>
              <p className="text-xs text-card-foreground/80 mt-1">Energy consumed today</p>
              <Link href="/usage-trends">
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3 h-8 px-3 bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  View Details <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Today's Cost */}
          <Card
            className="bg-card text-card-foreground border-0 shadow-lg card-hover animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-card-foreground">Today's Cost</CardTitle>
              <IndianRupee className="h-5 w-5 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-card-foreground">₹{currentMetrics.todayCost}</div>
              <p className="text-xs text-card-foreground/80 mt-1">Cost for today</p>
              <Link href="/usage-trends">
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3 h-8 px-3 bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  View Details <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Monthly Budget */}
          <Card
            className="bg-card text-card-foreground border-0 shadow-lg card-hover animate-scale-in"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-card-foreground">Monthly Budget</CardTitle>
              <AlertTriangle
                className={`h-5 w-5 ${budgetUsedPercentage > 80 ? "text-red-400" : "text-card-foreground/60"}`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-card-foreground">
                ₹{currentMetrics.monthlyUsed.toLocaleString()}
                <span className="text-sm font-normal text-card-foreground/80">
                  /₹{currentMetrics.monthlyBudget.toLocaleString()}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-card-foreground/80">{budgetUsedPercentage.toFixed(0)}% used</span>
                  <span className={budgetUsedPercentage > 80 ? "text-red-400" : "text-card-foreground/80"}>
                    ₹{(currentMetrics.monthlyBudget - currentMetrics.monthlyUsed).toLocaleString()} left
                  </span>
                </div>
                <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${budgetUsedPercentage > 80 ? "bg-red-400" : "bg-green-400"}`}
                    style={{ width: `${Math.min(budgetUsedPercentage, 100)}%` }}
                  />
                </div>
              </div>
              <Link href="/predictions">
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3 h-8 px-3 bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  View Forecast <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card
          className="bg-card text-card-foreground border-0 shadow-lg animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <CardHeader>
            <CardTitle className="text-card-foreground text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-card-foreground/80">Access key features and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/device-analysis">
                <Button
                  variant="secondary"
                  className="w-full justify-start bg-white/20 hover:bg-white/30 text-white border-0 h-12 smooth-transition hover:scale-105"
                >
                  <PieChart className="mr-3 h-5 w-5" />
                  Device Analysis
                </Button>
              </Link>
              <Link href="/predictions">
                <Button
                  variant="secondary"
                  className="w-full justify-start bg-white/20 hover:bg-white/30 text-white border-0 h-12 smooth-transition hover:scale-105"
                >
                  <TrendingUp className="mr-3 h-5 w-5" />
                  View Predictions
                </Button>
              </Link>
              <Link href="/usage-trends">
                <Button
                  variant="secondary"
                  className="w-full justify-start bg-white/20 hover:bg-white/30 text-white border-0 h-12 smooth-transition hover:scale-105"
                >
                  <Zap className="mr-3 h-5 w-5" />
                  Usage Trends
                </Button>
              </Link>
              <Link href="/settings">
                <Button
                  variant="secondary"
                  className="w-full justify-start bg-white/20 hover:bg-white/30 text-white border-0 h-12 smooth-transition hover:scale-105"
                >
                  <IndianRupee className="mr-3 h-5 w-5" />
                  Update Tariff
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
