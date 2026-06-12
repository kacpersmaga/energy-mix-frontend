export interface FuelMix {
  fuel: string
  perc: number
}

export interface DailyEnergyMix {
  date: string
  averageMix: FuelMix[]
  cleanEnergyPercentage: number
}

export interface OptimalChargingWindow {
  start: string
  end: string
  averageCleanEnergy: number
}
