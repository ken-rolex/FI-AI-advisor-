
export interface Asset {
  type: 'Savings' | 'Stocks' | 'Mutual Fund' | 'EPF' | 'Real Estate';
  name: string;
  value: number;
  annualGrowthRate?: number;
}

export interface Liability {
  type: 'Home Loan' | 'Car Loan' | 'Credit Card' | 'Personal Loan';
  name:string;
  balance: number;
  interestRate: number;
}

export interface NetWorthHistory {
  month: string;
  value: number;
}

export interface Transaction {
  id: string;
  date: string; // ISO 8601 format: 'YYYY-MM-DD'
  description: string;
  category: 'Groceries' | 'Utilities' | 'Transport' | 'Entertainment' | 'Shopping' | 'EMI' | 'Food' | 'Other';
  amount: number;
}

export interface MarketData {
    nifty50: {
        lastYearReturn: number;
        ytdReturn: number;
    }
}

export interface FinancialData {
  user: {
    name: string;
    age: number;
  };
  netWorth: {
    current: number;
    history: NetWorthHistory[];
  };
  assets: Asset[];
  liabilities: Liability[];
  creditScore: number;
  income: {
    monthlyGross: number;
  };
  transactions: Transaction[];
  marketData: MarketData;
}

export interface VisualizationData {
  type: 'BAR' | 'LINE' | 'PIE';
  title: string;
  data: { name: string; value: number; fill?: string }[];
}


export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text?: string;
  visualization?: VisualizationData | null;
  isLoading?: boolean;
}