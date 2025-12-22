export interface AnnualData {
  year: string;
  income: number;
  incomeGrowth: number | null;
  riskObjects: number;
  pavedRoadRate: number;
  networkCoverage: number;
  industryValue: number;
  vegValue: number;
  teaValue: number;
}

export interface XichouData {
  year: string;
  industryRoad: number;
  centralizedWater: number;
  ecoEmployment: number;
  villageIncome: number;
  ruralIncome: number;
  urbanRuralRatio: number;
  tcmValue: number;
  ruralTourismValue: number;
  forestCoverage: number;
  rockyDesertShare: number;
}

export interface BaiseData {
  year: string;
  poorPopulation: number;
  povertyRate: number;
  monitoringObjects: number | null;
  cityRuralIncome: number;
  borderRuralIncome: number;
  mangoValue: number;
  teaValue: number;
  borderTradeValue: number;
  borderRoadMileage: number;
  portTraffic: number;
  coverage5G: number;
}

export const CHART_COLORS = {
  primary: '#15803d',
  secondary: '#ca8a04',
  tertiary: '#0f766e',
  danger: '#b91c1c',
  accent: '#1d4ed8',
  grid: '#e2e8f0',
  text: '#334155',
  purple: '#7e22ce',
  orange: '#ea580c',
  red: '#dc2626',
  gold: '#d97706',
  blue: '#2563eb',
};