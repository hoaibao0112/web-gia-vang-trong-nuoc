'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface GoldPrice {
  code: string;
  buyingPrice: number;
  sellingPrice: number;
  buyChange: number;
  buyChangePercent: number;
  sellChange: number;
  sellChangePercent: number;
  dateTime: string;
}

export default function GoldPriceTable() {
  const [prices, setPrices] = useState<GoldPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.mihong.vn/v1/gold-prices?market=domestic');
        const data = await response.json();
        setPrices(data);
        if (data.length > 0) {
          setLastUpdated(data[0].dateTime);
        }
      } catch (error) {
        console.error('Failed to fetch gold prices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    // Refresh every minute
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price === 0) return '-';
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const renderChange = (change: number, percent: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center text-green-600 text-xs mt-1">
          <ArrowUpRight className="w-3 h-3 mr-0.5" />
          <span>{formatPrice(change)} ({percent}%)</span>
        </div>
      );
    }
    if (change < 0) {
      return (
        <div className="flex items-center text-red-600 text-xs mt-1">
          <ArrowDownRight className="w-3 h-3 mr-0.5" />
          <span>{formatPrice(Math.abs(change))} ({Math.abs(percent)}%)</span>
        </div>
      );
    }
    return (
      <div className="flex items-center text-gray-400 text-xs mt-1">
        <Minus className="w-3 h-3 mr-0.5" />
        <span>0 (0%)</span>
      </div>
    );
  };

  const getGoldName = (code: string) => {
    const names: Record<string, string> = {
      'SJC': 'Vàng SJC',
      '999': 'Vàng 99.9%',
      '985': 'Vàng 98.5%',
      '980': 'Vàng 98.0%',
      '950': 'Vàng 95.0%',
      '750': 'Vàng 75.0% (18K)',
      '680': 'Vàng 68.0%',
      '610': 'Vàng 61.0% (14K)',
      '580': 'Vàng 58.0%',
      '410': 'Vàng 41.0% (10K)'
    };
    return names[code] || code;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold uppercase tracking-wide">Bảng Giá Vàng Trong Nước</h2>
        <div className="text-xs font-medium opacity-90">
          Cập nhật lúc: {lastUpdated}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
              <th className="p-4 font-semibold">Loại Vàng</th>
              <th className="p-4 font-semibold text-right">Mua Vào (VNĐ/Chỉ)</th>
              <th className="p-4 font-semibold text-right">Bán Ra (VNĐ/Chỉ)</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item, index) => (
              <tr 
                key={item.code} 
                className={`border-b border-gray-100 hover:bg-yellow-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              >
                <td className="p-4">
                  <div className="font-bold text-yellow-700">{getGoldName(item.code)}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Mã: {item.code}</div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-bold text-gray-900 text-lg">{formatPrice(item.buyingPrice)}</div>
                  <div className="flex justify-end">{renderChange(item.buyChange, item.buyChangePercent)}</div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-bold text-gray-900 text-lg">{formatPrice(item.sellingPrice)}</div>
                  <div className="flex justify-end">{renderChange(item.sellChange, item.sellChangePercent)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-gray-50 text-xs text-gray-500 italic border-t border-gray-100">
        * Giá vàng mang tính chất tham khảo và có thể thay đổi theo thời điểm. Đơn vị tính: VNĐ/Chỉ.
      </div>
    </div>
  );
}
