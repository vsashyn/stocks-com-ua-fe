import { parseNumericValue, getFiscalYear, getFiscalQuarter } from './format-utils'

// Types for the API response
export interface IncomeStatementReport {
  fiscalDateEnding: string
  reportedCurrency: string
  totalRevenue: string
  netIncome: string
  grossProfit: string
  operatingIncome: string
  ebitda: string
  [key: string]: string
}

export interface CashFlowReport {
  fiscalDateEnding: string
  reportedCurrency: string
  operatingCashflow: string
  capitalExpenditures: string
  netIncome: string
  [key: string]: string
}

export interface StockPayload {
  success: boolean
  type: string
  overview: string
  incomeStatement: {
    symbol: string
    annualReports: IncomeStatementReport[]
    quarterlyReports: IncomeStatementReport[]
  }
  cashFlow: {
    symbol: string
    annualReports: CashFlowReport[]
    quarterlyReports: CashFlowReport[]
  }
}

// Parse overview HTML to extract key data
export function parseOverview(overview: string) {
  const extractValue = (pattern: RegExp): string => {
    const match = overview.match(pattern)
    return match ? match[1].trim() : 'N/A'
  }

  return {
    companyName: overview.match(/Огляд компанії:<\/u>\n\s*([^\n]+)/)?.[1]?.trim() || 'Unknown Company',
    country: extractValue(/Країна:\s*<b>([^<]+)<\/b>/),
    sector: extractValue(/Сектор:\s*<b>([^<]+)<\/b>/),
    marketCap: extractValue(/Ринкова капіталізація:\s*<b>([^<]+)<\/b>/),
    currentPrice: extractValue(/Поточна ціна:\s*<b>([^<]+)<\/b>/),
    peRatio: extractValue(/P\/E:\s*<b>([^<]+)<\/b>/),
    forwardPE: extractValue(/Forward:\s*<b>([^<]+)<\/b>/),
    pegRatio: extractValue(/PEG:\s*<b>([^<]+)<\/b>/),
    priceToSales: extractValue(/P\/S:\s*<b>([^<]+)<\/b>/),
    priceToBook: extractValue(/P\/B:\s*<b>([^<]+)<\/b>/),
    roe: extractValue(/ROE TTM:\s*<b>([^<]+)<\/b>/),
    roa: extractValue(/ROA TTM:\s*<b>([^<]+)<\/b>/),
    profitMargin: extractValue(/Маржа прибутку:\s*<b>([^<]+)<\/b>/),
    operatingMargin: extractValue(/Опер\. маржа:\s*<b>([^<]+)<\/b>/),
    dividendYield: extractValue(/Дохідність:\s*<b>([^<]+)<\/b>/),
    dividendPerShare: extractValue(/Дивіденд на акцію:\s*<b>([^<]+)<\/b>/),
    beta: extractValue(/Beta:\s*<b>([^<]+)<\/b>/),
    revenueGrowth: extractValue(/Дохід р\/р:\s*<b>([^<]+)<\/b>/),
    earningsGrowth: extractValue(/Прибуток р\/р:\s*<b>([^<]+)<\/b>/),
    eps: extractValue(/EPS:\s*<b>([^<]+)<\/b>/),
    week52Range: extractValue(/52W:\s*<b>([^<]+)<\/b>/),
    targetPrice: extractValue(/Цільова ціна:([^\n]+)/),
    insiderOwnership: extractValue(/Інсайдери:\s*<b>([^<]+)<\/b>/),
    institutionalOwnership: extractValue(/Інституційні:\s*<b>([^<]+)<\/b>/),
  }
}

// Transform income statement data for charts
export function getRevenueChartData(
  reports: IncomeStatementReport[],
  isQuarterly: boolean
) {
  return reports
    .slice(0, isQuarterly ? 12 : 10) // Last 12 quarters or 10 years
    .map((report) => ({
      period: isQuarterly
        ? getFiscalQuarter(report.fiscalDateEnding)
        : getFiscalYear(report.fiscalDateEnding),
      value: parseNumericValue(report.totalRevenue),
    }))
    .reverse()
}

export function getNetIncomeChartData(
  reports: IncomeStatementReport[],
  isQuarterly: boolean
) {
  return reports
    .slice(0, isQuarterly ? 12 : 10)
    .map((report) => ({
      period: isQuarterly
        ? getFiscalQuarter(report.fiscalDateEnding)
        : getFiscalYear(report.fiscalDateEnding),
      value: parseNumericValue(report.netIncome),
    }))
    .reverse()
}

// Calculate Free Cash Flow (Operating Cash Flow - Capital Expenditures)
export function getFreeCashFlowChartData(
  reports: CashFlowReport[],
  isQuarterly: boolean
) {
  return reports
    .slice(0, isQuarterly ? 12 : 10)
    .map((report) => {
      const operatingCashflow = parseNumericValue(report.operatingCashflow)
      const capex = parseNumericValue(report.capitalExpenditures)
      // Capital expenditures are typically reported as positive, so we subtract
      const freeCashFlow = operatingCashflow - Math.abs(capex)
      
      return {
        period: isQuarterly
          ? getFiscalQuarter(report.fiscalDateEnding)
          : getFiscalYear(report.fiscalDateEnding),
        value: freeCashFlow,
      }
    })
    .reverse()
}

