
import React from 'react';
import { FinancialData, NetWorthHistory } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardProps {
  financialData: FinancialData;
}

const StatCard: React.FC<{ title: string; value: string; subtext?: string }> = ({ title, value, subtext }) => (
  <div className="bg-brand-gray p-6 rounded-xl border border-gray-700">
    <h3 className="text-brand-light-gray text-sm font-medium">{title}</h3>
    <p className="text-white text-3xl font-bold mt-2">{value}</p>
    {subtext && <p className="text-gray-400 text-xs mt-1">{subtext}</p>}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-dark p-2 border border-gray-600 rounded-md">
        <p className="label text-sm text-white">{`${label}`}</p>
        <p className="intro text-sm text-brand-blue">{`₹${new Intl.NumberFormat('en-IN').format(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

const NetWorthChart: React.FC<{data: NetWorthHistory[]}> = ({ data }) => (
    <div className="bg-brand-gray p-6 rounded-xl border border-gray-700">
        <h3 className="text-white text-lg font-bold mb-4">Net Worth Growth (6 Months)</h3>
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Number(value) / 100000}L`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#161B22' }} />
                <Bar dataKey="value" fill="#2E5EFF" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ financialData }) => {
  const { netWorth, assets, liabilities, creditScore, transactions, income } = financialData;
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.balance, 0);
  const formatCurrency = (value: number) => `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)}`;

  // Calculate last month's expenses from transactions
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const lastMonthExpenses = transactions
    .filter(t => {
        const tDate = new Date(t.date);
        return tDate >= lastMonth && tDate < thisMonth;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlySavings = income.monthlyGross - lastMonthExpenses;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Net Worth" value={formatCurrency(netWorth.current)} />
        <StatCard title="Total Assets" value={formatCurrency(totalAssets)} />
        <StatCard title="Total Liabilities" value={formatCurrency(totalLiabilities)} />
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-2">
             <NetWorthChart data={netWorth.history} />
         </div>
         <div className="space-y-6">
            <StatCard title="Credit Score" value={String(creditScore)} subtext="A good score improves loan eligibility" />
             <StatCard title="Last Month's Savings" value={formatCurrency(monthlySavings)} subtext="Based on income vs expenses" />
         </div>
       </div>

    </div>
  );
};

export default Dashboard;