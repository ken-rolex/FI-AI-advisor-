
import React from 'react';
import { VisualizationData } from '../types';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartRendererProps {
  chartData: VisualizationData;
}

const COLORS = ['#2E5EFF', '#4F80FF', '#72A2FF', '#95C3FF', '#B8E4FF'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-brand-dark p-2 border border-gray-600 rounded-md">
                <p className="label text-sm text-white">{`${label || payload[0].name}`}</p>
                <p className="intro text-sm text-brand-blue">{`₹${new Intl.NumberFormat('en-IN').format(payload[0].value)}`}</p>
            </div>
        );
    }
    return null;
};


const ChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  const { type, title, data } = chartData;

  const renderChart = () => {
    switch (type) {
      case 'BAR':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Number(value) / 100000}L`} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.1)'}} />
              <Bar dataKey="value" fill="#2E5EFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'LINE':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Number(value) / 100000}L`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="value" stroke="#2E5EFF" strokeWidth={2} dot={{ r: 4, fill: '#2E5EFF' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'PIE':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} fontSize={12}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <p>Unsupported chart type</p>;
    }
  };

  return (
    <div className="bg-brand-dark p-4 rounded-lg">
      <h4 className="text-center font-semibold text-white mb-4">{title}</h4>
      {renderChart()}
    </div>
  );
};

export default ChartRenderer;
