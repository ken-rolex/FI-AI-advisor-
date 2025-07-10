
import { FinancialData } from '../types';

// This is a mock service to simulate fetching data from Fi's MCP Server.
// In a real application, this would be a network request.
const mockFinancialData: FinancialData = {
  user: {
    name: 'Alex Doe',
    age: 32,
  },
  netWorth: {
    current: 6850000,
    history: [
      { month: 'Jan', value: 5800000 },
      { month: 'Feb', value: 5950000 },
      { month: 'Mar', value: 6100000 },
      { month: 'Apr', value: 6250000 },
      { month: 'May', value: 6500000 },
      { month: 'Jun', value: 6850000 },
    ],
  },
  assets: [
    { type: 'Savings', name: 'Primary Savings Account', value: 800000 },
    { type: 'Stocks', name: 'Tech Portfolio', value: 1500000, annualGrowthRate: 15 },
    { type: 'Mutual Fund', name: 'Nifty 50 Index Fund', value: 1200000, annualGrowthRate: 12 },
    { type: 'Mutual Fund', name: 'Small Cap Fund', value: 800000, annualGrowthRate: 18 },
    { type: 'EPF', name: 'Employee Provident Fund', value: 2000000, annualGrowthRate: 8.1 },
    { type: 'Real Estate', name: 'Apartment in Bangalore', value: 5000000 },
  ],
  liabilities: [
    { type: 'Home Loan', name: 'Primary Residence Loan', balance: 4000000, interestRate: 8.5 },
    { type: 'Car Loan', name: 'Honda City Loan', balance: 400000, interestRate: 9.2 },
    { type: 'Credit Card', name: 'Visa Platinum Card', balance: 50000, interestRate: 36 },
  ],
  creditScore: 780,
  income: {
    monthlyGross: 250000,
  },
  transactions: [
    // Last month
    { id: 't1', date: '2024-05-28', description: 'Netflix Subscription', category: 'Entertainment', amount: 649 },
    { id: 't2', date: '2024-05-25', description: 'Swiggy Dinner', category: 'Food', amount: 850 },
    { id: 't3', date: '2024-05-22', description: 'Zara Shopping', category: 'Shopping', amount: 4500 },
    { id: 't4', date: '2024-05-20', description: 'Home Loan EMI', category: 'EMI', amount: 35000 },
    { id: 't5', date: '2024-05-15', description: 'BigBasket Groceries', category: 'Groceries', amount: 7500 },
    { id: 't6', date: '2024-05-10', description: 'Electricity Bill', category: 'Utilities', amount: 1200 },
    { id: 't7', date: '2024-05-05', description: 'Uber to work', category: 'Transport', amount: 350 },
    
    // This month
    { id: 't8', date: '2024-06-25', description: 'Zomato Lunch', category: 'Food', amount: 450 },
    { id: 't9', date: '2024-06-22', description: 'Movie Tickets', category: 'Entertainment', amount: 900 },
    { id: 't10', date: '2024-06-20', description: 'Home Loan EMI', category: 'EMI', amount: 35000 },
    { id: 't11', date: '2024-06-18', description: 'Myntra Shopping', category: 'Shopping', amount: 2800 },
    { id: 't12', date: '2024-06-15', description: 'Groceries', category: 'Groceries', amount: 6000 },
    { id: 't13', date: '2024-06-10', description: 'Phone Bill', category: 'Utilities', amount: 950 },
    { id: 't14', date: '2024-06-05', description: 'Petrol', category: 'Transport', amount: 2000 },
  ],
  marketData: {
    nifty50: {
      lastYearReturn: 14.5,
      ytdReturn: 8.2
    }
  }
};

export const fetchFinancialData = (): Promise<FinancialData> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockFinancialData);
    }, 1500);
  });
};