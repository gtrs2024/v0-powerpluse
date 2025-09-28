// Mock data for PowerPulse energy dashboard - Indian context

export interface EnergyData {
  timestamp: string
  consumption: number
  cost: number
}

export interface DeviceData {
  name: string
  consumption: number
  percentage: number
  status: "active" | "idle" | "off"
}

export interface PredictionData {
  date: string
  predicted: number
  actual?: number
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  connectionType: string
  sanctionedLoad: number
  meterNumber: string
  consumerNumber: string
  tariffCategory: string
}

export const currentMetrics = {
  currentPower: 2.4, // kW
  todayUsage: 18.5, // kWh
  todayCost: 148.0, // INR (₹8/kWh average)
  monthlyBudget: 4200, // INR
  monthlyUsed: 2366, // INR
}

export const hourlyData: EnergyData[] = [
  { timestamp: "00:00", consumption: 1.2, cost: 7.2 }, // Night rate ₹6/kWh
  { timestamp: "01:00", consumption: 1.0, cost: 6.0 },
  { timestamp: "02:00", consumption: 0.9, cost: 5.4 },
  { timestamp: "03:00", consumption: 0.8, cost: 4.8 },
  { timestamp: "04:00", consumption: 0.8, cost: 4.8 },
  { timestamp: "05:00", consumption: 0.9, cost: 5.4 },
  { timestamp: "06:00", consumption: 1.5, cost: 12.0 }, // Morning peak ₹8/kWh
  { timestamp: "07:00", consumption: 2.1, cost: 16.8 },
  { timestamp: "08:00", consumption: 2.8, cost: 22.4 },
  { timestamp: "09:00", consumption: 3.2, cost: 25.6 },
  { timestamp: "10:00", consumption: 2.9, cost: 23.2 },
  { timestamp: "11:00", consumption: 2.7, cost: 21.6 },
  { timestamp: "12:00", consumption: 3.1, cost: 31.0 }, // Peak hours ₹10/kWh
  { timestamp: "13:00", consumption: 3.4, cost: 34.0 },
  { timestamp: "14:00", consumption: 3.6, cost: 36.0 },
  { timestamp: "15:00", consumption: 3.2, cost: 32.0 },
  { timestamp: "16:00", consumption: 2.8, cost: 28.0 },
  { timestamp: "17:00", consumption: 2.5, cost: 25.0 },
  { timestamp: "18:00", consumption: 3.8, cost: 38.0 }, // Evening peak
  { timestamp: "19:00", consumption: 4.2, cost: 42.0 },
  { timestamp: "20:00", consumption: 3.9, cost: 39.0 },
  { timestamp: "21:00", consumption: 3.1, cost: 24.8 }, // Off-peak ₹8/kWh
  { timestamp: "22:00", consumption: 2.4, cost: 19.2 },
  { timestamp: "23:00", consumption: 1.8, cost: 14.4 },
]

export const deviceData: DeviceData[] = [
  { name: "Air Conditioner", consumption: 8.2, percentage: 44, status: "active" },
  { name: "Water Heater (Geyser)", consumption: 3.1, percentage: 17, status: "active" },
  { name: "Ceiling Fans & Lights", consumption: 2.4, percentage: 13, status: "active" },
  { name: "Refrigerator", consumption: 2.0, percentage: 11, status: "active" },
  { name: "TV & Electronics", consumption: 1.8, percentage: 10, status: "active" },
  { name: "Washing Machine", consumption: 1.0, percentage: 5, status: "idle" },
]

export const predictionData: PredictionData[] = [
  { date: "2025-09-08", predicted: 22.5, actual: 21.8 },
  { date: "2025-09-09", predicted: 24.1, actual: 23.9 },
  { date: "2025-09-10", predicted: 19.8, actual: 20.2 },
  { date: "2025-09-11", predicted: 21.3, actual: 21.1 },
  { date: "2025-09-12", predicted: 23.7, actual: 24.2 },
  { date: "2025-09-13", predicted: 25.2, actual: 24.8 },
  { date: "2025-09-14", predicted: 20.9, actual: 21.5 },
  { date: "2025-09-15", predicted: 22.8 }, // Future prediction
  { date: "2025-09-16", predicted: 24.5 },
  { date: "2025-09-17", predicted: 21.2 },
  { date: "2025-09-18", predicted: 23.1 },
  { date: "2025-09-19", predicted: 25.8 },
  { date: "2025-09-20", predicted: 26.2 },
  { date: "2025-09-21", predicted: 22.4 },
]

export const dailyData: EnergyData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))
  const baseConsumption = 20 + Math.sin(i * 0.2) * 5 + Math.random() * 3
  return {
    timestamp: date.toISOString().split("T")[0],
    consumption: Math.round(baseConsumption * 100) / 100,
    cost: Math.round(baseConsumption * 8 * 100) / 100, // ₹8/kWh average
  }
})

export const monthlyData: EnergyData[] = Array.from({ length: 12 }, (_, i) => {
  const date = new Date()
  date.setMonth(date.getMonth() - (11 - i))
  const baseConsumption = 600 + Math.sin(i * 0.5) * 100 + Math.random() * 50
  return {
    timestamp: date.toISOString().slice(0, 7),
    consumption: Math.round(baseConsumption * 100) / 100,
    cost: Math.round(baseConsumption * 8 * 100) / 100, // ₹8/kWh average
  }
})

export const userProfile: UserProfile = {
  name: "Rajesh Kumar",
  email: "rajesh.kumar@email.com",
  phone: "+91 98765 43210",
  address: "A-204, Green Valley Apartments, Sector 18",
  city: "Gurgaon",
  state: "Haryana",
  pincode: "122015",
  connectionType: "Domestic",
  sanctionedLoad: 5.0, // kW
  meterNumber: "HRY123456789",
  consumerNumber: "1234567890123",
  tariffCategory: "DS-1 (Domestic)",
}

export const stateElectricityRates = {
  Delhi: { domestic: 6.5, commercial: 9.5, peak: 11.0 },
  Maharashtra: { domestic: 7.2, commercial: 10.8, peak: 12.5 },
  Karnataka: { domestic: 6.8, commercial: 9.2, peak: 11.8 },
  "Tamil Nadu": { domestic: 5.5, commercial: 8.5, peak: 10.2 },
  Gujarat: { domestic: 6.2, commercial: 8.8, peak: 10.5 },
  Haryana: { domestic: 8.0, commercial: 11.2, peak: 13.0 },
  "Uttar Pradesh": { domestic: 7.5, commercial: 10.5, peak: 12.0 },
  "West Bengal": { domestic: 6.0, commercial: 8.2, peak: 9.8 },
  Rajasthan: { domestic: 7.8, commercial: 11.0, peak: 12.8 },
  Punjab: { domestic: 6.5, commercial: 9.0, peak: 10.8 },
}
