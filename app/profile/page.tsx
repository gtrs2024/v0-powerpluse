"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { userProfile, currentMetrics, stateElectricityRates } from "@/lib/mock-data"
import { User, Phone, Mail, MapPin, Zap, FileText, CreditCard, Settings } from "lucide-react"

export default function ProfilePage() {
  const currentState = userProfile.state as keyof typeof stateElectricityRates
  const stateRates = stateElectricityRates[currentState]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-muted-foreground text-pretty mt-2 text-lg">Manage your account and connection details</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-card text-card-foreground border-0 shadow-lg card-hover animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <User className="h-5 w-5 text-yellow-400" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-card-foreground/80">
                Your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{userProfile.name}</p>
                  <p className="text-sm text-card-foreground/80">Account Holder</p>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-card-foreground/80" />
                  <span className="text-sm text-card-foreground">{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-card-foreground/80" />
                  <span className="text-sm text-card-foreground">{userProfile.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-card-foreground/80 mt-0.5" />
                  <div className="text-sm text-card-foreground">
                    <p>{userProfile.address}</p>
                    <p>
                      {userProfile.city}, {userProfile.state} - {userProfile.pincode}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="secondary"
                className="w-full bg-white/40 hover:bg-white/50 text-blue-900 border-0 smooth-transition hover:scale-105 font-medium"
              >
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          <Card
            className="bg-card text-card-foreground border-0 shadow-lg card-hover animate-scale-in"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Zap className="h-5 w-5 text-yellow-400" />
                Connection Details
              </CardTitle>
              <CardDescription className="text-card-foreground/80">
                Your electricity connection information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Connection Type</p>
                  <Badge className="bg-white/40 text-blue-900 hover:bg-white/50 border-0 font-medium">
                    {userProfile.connectionType}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">Tariff Category</p>
                  <Badge className="bg-white/40 text-blue-900 hover:bg-white/50 border-0 font-medium">
                    {userProfile.tariffCategory}
                  </Badge>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-card-foreground/80">Consumer Number</span>
                  <span className="text-sm font-mono text-card-foreground">{userProfile.consumerNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-card-foreground/80">Meter Number</span>
                  <span className="text-sm font-mono text-card-foreground">{userProfile.meterNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-card-foreground/80">Sanctioned Load</span>
                  <span className="text-sm font-medium text-card-foreground">{userProfile.sanctionedLoad} kW</span>
                </div>
              </div>

              <Button
                variant="secondary"
                className="w-full bg-white/40 hover:bg-white/50 text-blue-900 border-0 smooth-transition hover:scale-105 font-medium"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Connection Certificate
              </Button>
            </CardContent>
          </Card>

          <Card
            className="bg-card text-card-foreground border-0 shadow-lg card-hover animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <CreditCard className="h-5 w-5 text-green-400" />
                Current Month Summary
              </CardTitle>
              <CardDescription className="text-card-foreground/80">
                Your electricity usage and billing for this month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-600 rounded-lg">
                  <p className="text-2xl font-bold text-white">₹{currentMetrics.monthlyUsed.toLocaleString()}</p>
                  <p className="text-sm text-white/90">Amount Used</p>
                </div>
                <div className="text-center p-3 bg-blue-600 rounded-lg">
                  <p className="text-2xl font-bold text-white">₹{currentMetrics.monthlyBudget.toLocaleString()}</p>
                  <p className="text-sm text-white/90">Monthly Budget</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-card-foreground">
                  <span>Budget Usage</span>
                  <span>{Math.round((currentMetrics.monthlyUsed / currentMetrics.monthlyBudget) * 100)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-green-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((currentMetrics.monthlyUsed / currentMetrics.monthlyBudget) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-2">
                <p className="text-sm font-medium text-card-foreground">Today's Usage</p>
                <div className="flex justify-between">
                  <span className="text-sm text-card-foreground/80">Energy Consumed</span>
                  <span className="text-sm font-medium text-card-foreground">{currentMetrics.todayUsage} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-card-foreground/80">Cost</span>
                  <span className="text-sm font-medium text-card-foreground">₹{currentMetrics.todayCost}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-card text-card-foreground border-0 shadow-lg card-hover animate-scale-in"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <FileText className="h-5 w-5 text-blue-400" />
                Electricity Rates - {userProfile.state}
              </CardTitle>
              <CardDescription className="text-card-foreground/80">
                Current tariff rates applicable to your connection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-600 rounded-lg">
                  <span className="text-sm font-medium text-white">Domestic Rate</span>
                  <span className="text-sm font-bold text-green-300">₹{stateRates.domestic}/kWh</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-600 rounded-lg">
                  <span className="text-sm font-medium text-white">Commercial Rate</span>
                  <span className="text-sm font-bold text-white">₹{stateRates.commercial}/kWh</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-600 rounded-lg">
                  <span className="text-sm font-medium text-white">Peak Hours Rate</span>
                  <span className="text-sm font-bold text-red-200">₹{stateRates.peak}/kWh</span>
                </div>
              </div>

              <div className="text-xs text-white bg-blue-600 p-3 rounded-lg">
                <p className="font-medium mb-1 text-white">Peak Hours:</p>
                <p>12:00 PM - 6:00 PM & 6:00 PM - 10:00 PM</p>
                <p className="mt-2">Rates are subject to change as per state electricity board regulations.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
