import React, { useState, useMemo } from 'react';
import { Plus, Minus, Calculator, Info } from 'lucide-react';

const InstanceRow = ({ label, price, value, onAdd, onSub }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
    <div>
      <h4 className="text-[13px] font-bold text-slate-800 font-sans">{label}</h4>
      <p className="text-[11px] text-slate-400 font-sans">${price}/mo per instance</p>
    </div>
    <div className="flex items-center gap-3">
      <button 
        onClick={onSub} 
        className="p-1 border border-slate-200 rounded text-slate-400 hover:bg-slate-100 transition-colors"
      >
        <Minus size={14} />
      </button>
      <span className="w-4 text-center text-sm font-bold text-slate-700">{value}</span>
      <button 
        onClick={onAdd} 
        className="p-1 border border-slate-200 rounded text-slate-400 hover:bg-slate-100 transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  </div>
);

const PriceCalculator = () => {
  // 1. States for inputs
  const [instances, setInstances] = useState({ small: 3, medium: 2, large: 2 });
  const [storage, setStorage] = useState(1500);
  const [bandwidth, setBandwidth] = useState(1700);

  // 2. Constants for Unit Prices
  const unitPrices = {
    small: 50,
    medium: 100,
    large: 200,
    storagePerGB: 0.10, // $0.10 per GB
    bandwidthPerGB: 0.05 // $0.05 per GB
  };

  // 3. Dynamic Calculations using useMemo
  const computeTotal = useMemo(() => {
    return (instances.small * unitPrices.small) + 
           (instances.medium * unitPrices.medium) + 
           (instances.large * unitPrices.large);
  }, [instances]);

  const sPrice = useMemo(() => (storage * unitPrices.storagePerGB), [storage]);
  const bPrice = useMemo(() => (bandwidth * unitPrices.bandwidthPerGB), [bandwidth]);

  const monthlyTotal = useMemo(() => {
    return (computeTotal + sPrice + bPrice).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [computeTotal, sPrice, bPrice]);

  return (
    <div className="min-h-full bg-[#F8FAFC] p-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 font-sans">Price Calculator</h2>
        <p className="text-[13px] text-slate-500 mt-1 font-sans">Estimate your monthly costs with transparent pricing</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 max-w-[1200px]">
        {/* Left Column */}
        <div className="flex-1 space-y-5">
          
          {/* Compute Instances */}
          <section className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4 font-sans">Compute Instances</h3>
            <InstanceRow 
              label="Small Instance" price={unitPrices.small} value={instances.small} 
              onAdd={() => setInstances({...instances, small: instances.small + 1})}
              onSub={() => setInstances({...instances, small: Math.max(0, instances.small - 1)})}
            />
            <InstanceRow 
              label="Medium Instance" price={unitPrices.medium} value={instances.medium} 
              onAdd={() => setInstances({...instances, medium: instances.medium + 1})}
              onSub={() => setInstances({...instances, medium: Math.max(0, instances.medium - 1)})}
            />
            <InstanceRow 
              label="Large Instance" price={unitPrices.large} value={instances.large} 
              onAdd={() => setInstances({...instances, large: instances.large + 1})}
              onSub={() => setInstances({...instances, large: Math.max(0, instances.large - 1)})}
            />
          </section>

          {/* Storage & Bandwidth - Moveable Sliders */}
          <section className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-6 font-sans">Storage & Bandwidth</h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-[12px] font-bold text-slate-700 mb-3 font-sans">
                  <span>Block Storage (GB)</span>
                  <span className="text-slate-500 font-semibold">${sPrice.toFixed(2)}/mo</span>
                </div>
                <input 
                  type="range" min="0" max="5000" step="50"
                  value={storage}
                  onChange={(e) => setStorage(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0077b6]" 
                />
                <span className="text-[11px] text-slate-400 mt-2 block font-medium font-sans">{storage} GB</span>
              </div>

              <div>
                <div className="flex justify-between text-[12px] font-bold text-slate-700 mb-3 font-sans">
                  <span>Bandwidth (GB)</span>
                  <span className="text-slate-500 font-semibold">${bPrice.toFixed(2)}/mo</span>
                </div>
                <input 
                  type="range" min="0" max="5000" step="50"
                  value={bandwidth}
                  onChange={(e) => setBandwidth(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0077b6]" 
                />
                <span className="text-[11px] text-slate-400 mt-2 block font-medium font-sans">{bandwidth} GB</span>
              </div>
            </div>
          </section>

          {/* Database Services */}
          <section className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4 font-sans">Database Services</h3>
            <InstanceRow label="Postgres" price="80" value={0} onAdd={()=>{}} onSub={()=>{}} />
            <InstanceRow label="Mysql" price="75" value={0} onAdd={()=>{}} onSub={()=>{}} />
            <InstanceRow label="Redis" price="60" value={0} onAdd={()=>{}} onSub={()=>{}} />
          </section>
        </div>

        {/* Right Column: Dynamic Cost Estimate */}
        <div className="w-full lg:w-[350px] space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm lg:sticky lg:top-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Calculator size={20} />
              </div>
              <h3 className="font-bold text-slate-800 font-sans">Cost Estimate</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[13px] font-sans">
                <span className="text-slate-400 font-medium">Compute</span>
                <span className="font-bold text-slate-700">${computeTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[13px] font-sans">
                <span className="text-slate-400 font-medium">Storage</span>
                <span className="font-bold text-slate-700">${sPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[13px] font-sans">
                <span className="text-slate-400 font-medium">Bandwidth</span>
                <span className="font-bold text-slate-700">${bPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[13px] font-sans">
                <span className="text-slate-400 font-medium">Database</span>
                <span className="font-bold text-slate-700">$0.00</span>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex justify-between items-center mb-8">
              <span className="font-bold text-slate-800 text-[13px] font-sans">Monthly Total</span>
              <span className="text-2xl font-black text-[#0077b6] tracking-tighter font-sans">${monthlyTotal}</span>
            </div>

            <button className="w-full py-3.5 bg-[#0077b6] text-white text-[14px] font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-[#005f91] active:scale-[0.95] transition-all">
              Request Quote
            </button>
          </div>

          <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-xl flex gap-3">
            <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-600/80 leading-relaxed font-medium font-sans">
              Prices shown are estimates. Final pricing may vary based on usage and contract terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;