// src/components/common/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, trendType, iconBg, iconColor }) => {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-100 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div 
          style={{ backgroundColor: iconBg }} 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
        >
          {Icon && (
            <Icon 
              size={24} 
              style={{ color: iconColor }} // Exact icon color force gareko
              strokeWidth={2.5} 
            />
          )}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[12px] font-semibold ${
            trendType === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
          }`}>
            <span className="text-[10px]">{trendType === 'up' ? '▲' : '▼'}</span>
            {trend}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h2 className="text-[24px] font-bold text-[#0F172A] tracking-tight">{value}</h2>
        <p className="text-[14px] font-medium text-[#64748B]">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;