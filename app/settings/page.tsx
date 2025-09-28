"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, IndianRupeeIcon, Bell, Save, Plus, Trash2, CheckCircle } from "lucide-react"

interface TariffSlab {
  id: string
  from: number
  to: number | null
  rate: number
}

export default function SettingsPage() {
  const [tariffType, setTariffType] = useState<"flat" | "slab">("flat")
  const [flatRate, setFlatRate] = useState("8.00")
  const [monthlyBudget, setMonthlyBudget] = useState("4200")
  const [currency, setCurrency] = useState("INR")

  // Notification settings
  const [budgetAlerts, setBudgetAlerts] = useState(true)
  const [usageAlerts, setUsageAlerts] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(true)
  const [monthlyReports, setMonthlyReports] = useState(true)
  const [budgetThreshold, setBudgetThreshold] = useState("80")
  const [usageThreshold, setUsageThreshold] = useState("150")

  // Slab rate settings
  const [slabRates, setSlabRates] = useState<TariffSlab[]>([
    { id: "1", from: 0, to: 100, rate: 6.0 },
    { id: "2", from: 100, to: 300, rate: 8.0 },
    { id: "3", from: 300, to: null, rate: 10.0 },
  ])

  const [saved, setSaved] = useState(false)

  const addSlabRate = () => {
    const lastSlab = slabRates[slabRates.length - 1]
    const newFrom = lastSlab.to || lastSlab.from + 100
    const newSlab: TariffSlab = {
      id: Date.now().toString(),
      from: newFrom,
      to: newFrom + 100,
      rate: 8.0,
    }
    setSlabRates([...slabRates.slice(0, -1), { ...lastSlab, to: newFrom }, { ...newSlab, to: null }])
  }

  const removeSlabRate = (id: string) => {
    if (slabRates.length <= 1) return
    const filtered = slabRates.filter((slab) => slab.id !== id)
    // Update the last slab to have no upper limit
    if (filtered.length > 0) {
      filtered[filtered.length - 1].to = null
    }
    setSlabRates(filtered)
  }

  const updateSlabRate = (id: string, field: keyof TariffSlab, value: number) => {
    setSlabRates(slabRates.map((slab) => (slab.id === id ? { ...slab, [field]: value } : slab)))
  }

  const handleSave = () => {
    // Simulate saving settings
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Settings</h1>
          <p className="text-muted-foreground text-pretty">
            Configure your energy tariff, budget, and notification preferences
          </p>
        </div>

        {/* Save Success Alert */}
        {saved && (
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700 dark:text-green-300">
              Settings saved successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Tariff Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupeeIcon className="h-5 w-5" />
                Tariff Configuration
              </CardTitle>
              <CardDescription>Set your electricity pricing structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="tariff-type">Tariff Type</Label>
                <Select value={tariffType} onValueChange={(value: "flat" | "slab") => setTariffType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat Rate</SelectItem>
                    <SelectItem value="slab">Slab Rates</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tariffType === "flat" ? (
                <div className="space-y-3">
                  <Label htmlFor="flat-rate">Rate per kWh</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">₹</span>
                    <Input
                      id="flat-rate"
                      type="number"
                      step="0.01"
                      value={flatRate}
                      onChange={(e) => setFlatRate(e.target.value)}
                      placeholder="8.00"
                    />
                    <span className="text-sm text-muted-foreground">per kWh</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Slab Rates</Label>
                    <Button size="sm" variant="outline" onClick={addSlabRate}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Slab
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {slabRates.map((slab, index) => (
                      <div key={slab.id} className="flex items-center gap-2 p-3 border rounded-lg">
                        <div className="flex-1 grid grid-cols-3 gap-2 items-center">
                          <div>
                            <Label className="text-xs">From (kWh)</Label>
                            <Input
                              type="number"
                              value={slab.from}
                              onChange={(e) => updateSlabRate(slab.id, "from", Number(e.target.value))}
                              className="h-8"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">To (kWh)</Label>
                            <Input
                              type="number"
                              value={slab.to || ""}
                              onChange={(e) => updateSlabRate(slab.id, "to", Number(e.target.value))}
                              placeholder="∞"
                              disabled={index === slabRates.length - 1}
                              className="h-8"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Rate (₹)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={slab.rate}
                              onChange={(e) => updateSlabRate(slab.id, "rate", Number(e.target.value))}
                              className="h-8"
                            />
                          </div>
                        </div>
                        {slabRates.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeSlabRate(slab.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-3">
                <Label htmlFor="monthly-budget">Monthly Budget</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">₹</span>
                  <Input
                    id="monthly-budget"
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                    placeholder="4200"
                  />
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications & Alerts
              </CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Budget Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when approaching budget limit</p>
                  </div>
                  <Switch checked={budgetAlerts} onCheckedChange={setBudgetAlerts} />
                </div>

                {budgetAlerts && (
                  <div className="ml-4 space-y-2">
                    <Label htmlFor="budget-threshold">Alert Threshold</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="budget-threshold"
                        type="number"
                        value={budgetThreshold}
                        onChange={(e) => setBudgetThreshold(e.target.value)}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">% of budget</span>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Usage Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about unusual consumption spikes</p>
                  </div>
                  <Switch checked={usageAlerts} onCheckedChange={setUsageAlerts} />
                </div>

                {usageAlerts && (
                  <div className="ml-4 space-y-2">
                    <Label htmlFor="usage-threshold">Usage Threshold</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="usage-threshold"
                        type="number"
                        value={usageThreshold}
                        onChange={(e) => setUsageThreshold(e.target.value)}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">% above average</span>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly energy consumption summaries</p>
                  </div>
                  <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Monthly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive detailed monthly analysis reports</p>
                  </div>
                  <Switch checked={monthlyReports} onCheckedChange={setMonthlyReports} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Configuration Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Current Configuration
            </CardTitle>
            <CardDescription>Summary of your current settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tariff Type</Label>
                <Badge variant="secondary">{tariffType === "flat" ? "Flat Rate" : "Slab Rates"}</Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">{tariffType === "flat" ? "Rate" : "Base Rate"}</Label>
                <Badge variant="secondary">
                  ₹{tariffType === "flat" ? flatRate : slabRates[0]?.rate.toFixed(2)} per kWh
                </Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Monthly Budget</Label>
                <Badge variant="secondary">
                  ₹{monthlyBudget} {currency}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Active Alerts</Label>
                <Badge variant="secondary">
                  {[budgetAlerts, usageAlerts, weeklyReports, monthlyReports].filter(Boolean).length} enabled
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="min-w-32">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
