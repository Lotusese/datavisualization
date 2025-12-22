export interface AnnualData {
  year: string;
  income: number; // 农村居民人均可支配收入 (元)
  incomeGrowth: number | null; // 年收入同比增长率 (%)
  riskObjects: number; // 未消除风险监测对象 (万人)
  pavedRoadRate: number; // 硬化路通村率 (%)
  networkCoverage: number; // 4G 网络覆盖率 (%)
  industryValue: number; // 六大产业总产值 (亿元)
  vegValue: number; // 蔬菜产业产值 (亿元)
  teaValue: number; // 茶叶产业产值 (亿元)
}

export interface XichouData {
  year: string;
  // Infrastructure
  industryRoad: number; // 产业配套公路 (公里)
  centralizedWater: number; // 集中供水率 (%)
  
  // Employment & Collective
  ecoEmployment: number; // 生态产业带动就业 (万人)
  villageIncome: number; // 村集体收入 (万元)
  
  // Income
  ruralIncome: number; // 农村居民人均可支配收入 (元)
  urbanRuralRatio: number; // 城乡收入比 (X:1)
  
  // Industry Values
  tcmValue: number; // 生态产业总中药材 (亿元)
  ruralTourismValue: number; // 乡村旅游 (亿元)
  
  // Ecology
  forestCoverage: number; // 森林覆盖率 (%)
  rockyDesertShare: number; // 石漠化土地占比 (%)
}

export interface BaiseData {
  year: string;
  // Poverty & People
  poorPopulation: number; // 建档立卡贫困人口 (万人)
  povertyRate: number; // 贫困发生率 (%)
  monitoringObjects: number | null; // 返贫监测对象 (万人)
  
  // Income
  cityRuralIncome: number; // 全市农村居民人均可支配收入 (元)
  borderRuralIncome: number; // 边境县人均收入 (元)
  
  // Industry & Trade
  mangoValue: number; // 芒果产值 (亿元)
  teaValue: number; // 茶叶产值 (亿元)
  borderTradeValue: number; // 边贸总额 (亿元)
  
  // Infrastructure
  borderRoadMileage: number; // 边境公路里程 (公里)
  portTraffic: number; // 口岸通关人次 (万)
  coverage5G: number; // 5G 覆盖率 (%)
}

export const CHART_COLORS = {
  primary: '#15803d', // green-700
  secondary: '#ca8a04', // yellow-600
  tertiary: '#0f766e', // teal-700
  danger: '#b91c1c', // red-700
  accent: '#1d4ed8', // blue-700
  grid: '#e2e8f0', // slate-200
  text: '#334155', // slate-700
  purple: '#7e22ce', // purple-700
  orange: '#ea580c', // orange-600
  red: '#dc2626',   // red-600 (Revolutionary/Poverty)
  gold: '#d97706',  // amber-600 (Mango)
  blue: '#2563eb',  // blue-600 (Infrastructure)
};