'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, parse } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ChartData {
  dateTime: string;
  buyingPrice: number;
  sellingPrice: number;
  code: string;
}

export default function GoldPriceChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('https://api.mihong.vn/v1/gold-prices?market=domestic&goldCode=SJC&last=1y');
        const rawData: ChartData[] = await response.json();
        
        // Format data for chart
        const formattedData = rawData.map(item => {
          // Parse "dd/MM/yyyy HH:mm"
          const parsedDate = parse(item.dateTime, 'dd/MM/yyyy HH:mm', new Date());
          return {
            ...item,
            // Format to "MMM yyyy" for X-axis
            displayDate: format(parsedDate, 'MMM yyyy', { locale: vi }),
            fullDate: format(parsedDate, 'dd/MM/yyyy', { locale: vi }),
          };
        });
        
        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const formatYAxis = (tickItem: number) => {
    return new Intl.NumberFormat('vi-VN', { notation: 'compact', compactDisplay: 'short' }).format(tickItem);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-bold text-gray-800 mb-2 border-b pb-2">{payload[0].payload.fullDate}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-sm mb-1">
              <span style={{ color: entry.color }} className="font-medium">{entry.name}:</span>
              <span className="font-bold text-gray-900">
                {new Intl.NumberFormat('vi-VN').format(entry.value)} VNĐ
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Biểu Đồ Giá Vàng SJC (1 Năm)</h2>
        <p className="text-sm text-gray-500 mt-1">Biến động giá mua và bán vàng SJC trong 12 tháng qua</p>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="displayDate" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={['auto', 'auto']}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '14px', fontWeight: 500 }}
            />
            <Line 
              type="monotone" 
              dataKey="sellingPrice" 
              name="Bán Ra" 
              stroke="#eab308" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#eab308', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="buyingPrice" 
              name="Mua Vào" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
