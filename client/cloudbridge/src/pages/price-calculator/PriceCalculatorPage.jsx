import React, { useState, useMemo } from 'react';
import { Plus, Minus, Calculator, Info } from 'lucide-react';

const InstanceRow = ({ label, price, value, onAdd, onSub }) => (
  <div className="flex items-center justify-between py-5 border-b border-slate-50 last:border-0">
    <div className="flex-1 min-w-0 pr-4">
      <h4 className="text-[15px] font-bold text-slate-800 font-sans truncate tracking-tight">{label}</h4>
      <p className="text-[12px] text-slate-400 font-sans">${price}/mo per instance</p>
    </div>
    <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl shrink-0">
      <button 
        onClick={onSub} 
        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
      >
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-[15px] font-bold text-slate-700 font-mono">{value}</span>
      <button 
        onClick={onAdd} 
        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
      >
        <Plus size={14} />
      </button>
    </div>
  </div>
);

const PriceCalculator = () => {
  const [instances, setInstances] = useState({ small: 3, medium: 2, large: 2 });
  const [storage, setStorage] = useState(1500);
  const [bandwidth, setBandwidth] = useState(1700);

  const unitPrices = {
    small: 50, medium: 100, large: 200,
    storagePerGB: 0.10, bandwidthPerGB: 0.05
  };

  const computeTotal = useMemo(() => 
    (instances.small * unitPrices.small) + (instances.medium * unitPrices.medium) + (instances.large * unitPrices.large), 
    [instances]
  );

  const sPrice = useMemo(() => (storage * unitPrices.storagePerGB), [storage]);
  const bPrice = useMemo(() => (bandwidth * unitPrices.bandwidthPerGB), [bandwidth]);

  const monthlyTotal = useMemo(() => {
    return (computeTotal + sPrice + bPrice).toLocaleString(undefined, {
      minimumFractionDigits: 2, maximumFractionDigits: 2
    });
  }, [computeTotal, sPrice, bPrice]);

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      {/* 
          Main Content Wrapper:
          - 'flex justify-start' ensures it stays next to the sidebar.
          - 'pl-8' or similar fixed padding keeps the gap constant.
      */}
      <div className="flex justify-start w-full px-6 py-10 md:px-10 lg:px-12">
        
        {/* Fixed Width Container to match Figma */}
        <div className="w-full max-w-[1400px]"> 
          
          <header className="mb-12">
            <h2 className="text-[32px] font-bold text-slate-900 font-sans tracking-tight">Price Calculator</h2>
            <p className="text-[15px] text-slate-500 mt-1 font-sans">Estimate your monthly costs with transparent pricing</p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Inputs (8/12 Columns) */}
            <div className="xl:col-span-8 space-y-8">
              
              <section className="bg-white p-8 rounded-[24px] border border-slate-200/60 shadow-sm">
                <h3 className="text-[13px] font-bold text-slate-400 mb-6 font-sans uppercase tracking-[0.2em]">Compute Instances</h3>
                <div className="space-y-1">
                  <InstanceRow label="Small Instance" price={unitPrices.small} value={instances.small} onAdd={() => setInstances({...instances, small: instances.small + 1})} onSub={() => setInstances({...instances, small: Math.max(0, instances.small - 1)})} />
                  <InstanceRow label="Medium Instance" price={unitPrices.medium} value={instances.medium} onAdd={() => setInstances({...instances, medium: instances.medium + 1})} onSub={() => setInstances({...instances, medium: Math.max(0, instances.medium - 1)})} />
                  <InstanceRow label="Large Instance" price={unitPrices.large} value={instances.large} onAdd={() => setInstances({...instances, large: instances.large + 1})} onSub={() => setInstances({...instances, large: Math.max(0, instances.large - 1)})} />
                </div>
              </section>

              <section className="bg-white p-8 rounded-[24px] border border-slate-200/60 shadow-sm">
                <h3 className="text-[13px] font-bold text-slate-400 mb-12 font-sans uppercase tracking-[0.2em]">Storage & Bandwidth</h3>
                <div className="space-y-16">
                  <div className="relative">
                    <div className="flex justify-between text-[14px] font-bold text-slate-700 mb-5 font-sans">
                      <span>Block Storage (GB)</span>
                      <span className="text-[#0077b6] font-extrabold tracking-tight">${sPrice.toFixed(2)}/mo</span>
                    </div>
                    <input type="range" min="0" max="5000" step="50" value={storage} onChange={(e) => setStorage(Number(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0077b6]" />
                    <span className="absolute -bottom-8 left-0 text-[13px] text-slate-400 font-bold font-sans">{storage} GB</span>
                  </div>

                  <div className="relative pt-4">
                    <div className="flex justify-between text-[14px] font-bold text-slate-700 mb-5 font-sans">
                      <span>Bandwidth (GB)</span>
                      <span className="text-[#0077b6] font-extrabold tracking-tight">${bPrice.toFixed(2)}/mo</span>
                    </div>
                    <input type="range" min="0" max="5000" step="50" value={bandwidth} onChange={(e) => setBandwidth(Number(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0077b6]" />
                    <span className="absolute -bottom-8 left-0 text-[13px] text-slate-400 font-bold font-sans">{bandwidth} GB</span>
                  </div>
                </div>
              </section>

              <section className="bg-white p-8 rounded-[24px] border border-slate-200/60 shadow-sm">
                <h3 className="text-[13px] font-bold text-slate-400 mb-6 font-sans uppercase tracking-[0.2em]">Database Services</h3>
                <InstanceRow label="Postgres" price="80" value={0} onAdd={()=>{}} onSub={()=>{}} />
                <InstanceRow label="Mysql" price="75" value={0} onAdd={()=>{}} onSub={()=>{}} />
                <InstanceRow label="Redis" price="60" value={0} onAdd={()=>{}} onSub={()=>{}} />
              </section>
            </div>

            {/* Right Column: Summary (4/12 Columns) */}
            <div className="xl:col-span-4 w-full">
              <div className="sticky top-10 space-y-6">
                <div className="bg-white p-10 rounded-[32px] border border-slate-200/60 shadow-xl shadow-slate-200/10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="p-4 bg-blue-50 text-[#0077b6] rounded-[20px]">
                      <Calculator size={26} />
                    </div>
                    <h3 className="text-[20px] font-bold text-slate-800 font-sans">Cost Estimate</h3>
                  </div>

                  <div className="space-y-6 mb-10 border-b border-slate-50 pb-10">
                    <div className="flex justify-between text-[16px]">
                      <span className="text-slate-400">Compute</span>
                      <span className="font-bold text-slate-800">${computeTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[16px]">
                      <span className="text-slate-400">Storage</span>
                      <span className="font-bold text-slate-800">${sPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[16px]">
                      <span className="text-slate-400">Bandwidth</span>
                      <span className="font-bold text-slate-800">${bPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mb-10">
                    <span className="font-bold text-slate-800 text-[15px] pb-1">Monthly Total</span>
                    <span className="text-[38px] font-black text-[#0077b6] leading-none tracking-tighter">${monthlyTotal}</span>
                  </div>

                  <button className="w-full py-5 bg-[#0077b6] text-white text-[17px] font-bold rounded-[22px] shadow-lg shadow-blue-100 hover:bg-[#005f91] active:scale-[0.98] transition-all">
                    Request Quote
                  </button>
                </div>

                <div className="p-6 bg-blue-50/40 border border-blue-100/40 rounded-[24px] flex gap-5">
                  <Info size={22} className="text-[#0077b6] shrink-0 mt-0.5" />
                  <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                    Prices shown are estimates. Final pricing may vary based on usage and contract terms.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;