import React, { useState } from 'react';
import { Plus, Minus, Calculator, Info, Server, Database, HardDrive } from 'lucide-react';

const InstanceRow = ({ label, price, value, onAdd, onSub }) => (
  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
    <div className="font-work-sans">
      <h4 className="text-[16px] font-semibold text-[#0F172B] tracking-tight">{label}</h4>
      <p className="text-[13px] text-[#64748B] font-normal">${price}/mo per instance</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-slate-200">
        <button onClick={onSub} className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
          <Minus size={14} strokeWidth={2.5} />
        </button>
        <span className="w-5 text-center text-[15px] font-bold text-[#0F172B]">{value}</span>
        <button onClick={onAdd} className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
          <Plus size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  </div>
);

const PriceCalculatorPage = () => {
  const [instances, setInstances] = useState({ small: 3, medium: 2, large: 2 });
  const [databases, setDatabases] = useState({ postgres: 0, mysql: 0, redis: 0 });
  
  // Movable states for Storage and Bandwidth
  const [storageGB, setStorageGB] = useState(1500);
  const [bandwidthGB, setBandwidthGB] = useState(1700);

  // Price Calculation Logic
  const computeTotal = (instances.small * 50) + (instances.medium * 100) + (instances.large * 200);
  const dbTotal = (databases.postgres * 80) + (databases.mysql * 75) + (databases.redis * 60);
  
  // Assuming $0.10 per GB for storage and $0.05 per GB for bandwidth as per project logic
  const storageCost = (storageGB * 0.10); 
  const bandwidthCost = (bandwidthGB * 0.05);
  
  const grandTotal = computeTotal + dbTotal + storageCost + bandwidthCost;

  return (
    <div className="p-10 w-full min-h-screen bg-[#F8FAFC]">
      <header className="mb-10">
        <h1 className="font-dm-sans text-[32px] font-bold text-[#0F172B] tracking-tight">Price Calculator</h1>
        <p className="font-work-sans text-[16px] text-[#64748B] mt-1">Estimate your monthly costs with transparent pricing</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 w-full max-w-[1537px]">
        <div className="xl:col-span-8 space-y-6">
          
          {/* Compute Instances */}
          <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-dm-sans text-[18px] font-bold text-[#0F172B] mb-6">Compute Instances</h3>
            <div className="space-y-1">
              <InstanceRow label="Small Instance" price="50" value={instances.small} onAdd={() => setInstances({...instances, small: instances.small + 1})} onSub={() => setInstances({...instances, small: Math.max(0, instances.small - 1)})} />
              <InstanceRow label="Medium Instance" price="100" value={instances.medium} onAdd={() => setInstances({...instances, medium: instances.medium + 1})} onSub={() => setInstances({...instances, medium: Math.max(0, instances.medium - 1)})} />
              <InstanceRow label="Large Instance" price="200" value={instances.large} onAdd={() => setInstances({...instances, large: instances.large + 1})} onSub={() => setInstances({...instances, large: Math.max(0, instances.large - 1)})} />
            </div>
          </section>

          {/* Storage & Bandwidth - Movable Sliders */}
          <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm font-work-sans">
            <h3 className="font-dm-sans text-[18px] font-bold text-[#0F172B] mb-8">Storage & Bandwidth</h3>
            <div className="space-y-12">
              {/* Storage Slider */}
              <div>
                <div className="flex justify-between text-[14px] font-semibold text-[#0F172B] mb-4">
                  <span>Block Storage (GB)</span>
                </div>
                <input 
                  type="range" min="0" max="5000" step="50"
                  value={storageGB}
                  onChange={(e) => setStorageGB(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#0077b6]"
                />
                <div className="flex justify-between mt-4 text-[13px]">
                  <span className="text-slate-400 font-medium">{storageGB} GB</span>
                  <span className="text-[#0077b6] font-bold">${storageCost.toFixed(2)}/mo</span>
                </div>
              </div>

              {/* Bandwidth Slider */}
              <div>
                <div className="flex justify-between text-[14px] font-semibold text-[#0F172B] mb-4">
                  <span>Bandwidth (GB)</span>
                </div>
                <input 
                  type="range" min="0" max="10000" step="100"
                  value={bandwidthGB}
                  onChange={(e) => setBandwidthGB(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#0077b6]"
                />
                <div className="flex justify-between mt-4 text-[13px]">
                  <span className="text-slate-400 font-medium">{bandwidthGB} GB</span>
                  <span className="text-[#0077b6] font-bold">${bandwidthCost.toFixed(2)}/mo</span>
                </div>
              </div>
            </div>
          </section>

          {/* Database Services */}
          <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-dm-sans text-[18px] font-bold text-[#0F172B] mb-6">Database Services</h3>
            <div className="space-y-1">
              <InstanceRow label="PostgreSQL" price="80" value={databases.postgres} onAdd={() => setDatabases({...databases, postgres: databases.postgres + 1})} onSub={() => setDatabases({...databases, postgres: Math.max(0, databases.postgres - 1)})} />
              <InstanceRow label="MySQL" price="75" value={databases.mysql} onAdd={() => setDatabases({...databases, mysql: databases.mysql + 1})} onSub={() => setDatabases({...databases, mysql: Math.max(0, databases.mysql - 1)})} />
              <InstanceRow label="Redis Cache" price="60" value={databases.redis} onAdd={() => setDatabases({...databases, redis: databases.redis + 1})} onSub={() => setDatabases({...databases, redis: Math.max(0, databases.redis - 1)})} />
            </div>
          </section>
        </div>

        {/* Right Column: Dynamic Cost Estimate */}
        <div className="xl:col-span-4">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 font-work-sans sticky top-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 text-[#0077b6] rounded-lg">
                <Calculator size={20} />
              </div>
              <h3 className="font-dm-sans text-[18px] font-bold text-[#0F172B]">Cost Estimate</h3>
            </div>

            <div className="space-y-4 mb-8 text-[14px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Compute Total</span>
                <span className="font-bold text-[#0F172B]">${computeTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Storage</span>
                <span className="font-bold text-[#0F172B]">${storageCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bandwidth</span>
                <span className="font-bold text-[#0F172B]">${bandwidthCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Database Total</span>
                <span className="font-bold text-[#0F172B]">${dbTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-100 mb-8">
              <span className="font-bold text-[#0F172B] text-[15px]">Monthly Total</span>
              <span className="text-[28px] font-bold text-[#0077b6] tracking-tight">
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            <button className="w-full py-4 bg-[#0077b6] text-white text-[16px] font-bold rounded-xl hover:bg-[#005f91] transition-all">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculatorPage;