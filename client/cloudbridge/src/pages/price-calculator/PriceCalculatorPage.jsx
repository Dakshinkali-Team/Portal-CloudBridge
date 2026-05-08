import React, { useState } from 'react';
import { Plus, Minus, Calculator, Info } from 'lucide-react';

const InstanceRow = ({ label, price, value, onAdd, onSub }) => (
  <div className="flex items-center justify-between py-4 border-b border-[#F1F5F9] last:border-0">
    <div>
      <h4 className="text-[16px] font-medium text-[#0F172B] font-work-sans">{label}</h4>
      <p className="text-[12px] text-slate-400 font-normal font-work-sans">${price}/mo per instance</p>
    </div>
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-4 bg-white px-2 py-1.5 rounded-lg border border-[#E2E8F0]">
        <button onClick={onSub} className="p-0.5 text-slate-400 hover:text-slate-600 transition-colors border rounded border-slate-100">
          <Minus size={12} strokeWidth={2.5} />
        </button>
        <span className="w-4 text-center text-[15px] font-bold text-[#0F172B]">{value}</span>
        <button onClick={onAdd} className="p-0.5 text-slate-400 hover:text-slate-600 transition-colors border rounded border-slate-100">
          <Plus size={12} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  </div>
);

const PriceCalculatorPage = () => {
  const [instances, setInstances] = useState({ small: 3, medium: 2, large: 2 });
  const [databases, setDatabases] = useState({ postgres: 0, mysql: 0, redis: 0 });
  const [storageGB, setStorageGB] = useState(1500);
  const [bandwidthGB, setBandwidthGB] = useState(1700);

  const computeTotal = (instances.small * 50) + (instances.medium * 100) + (instances.large * 200);
  const dbTotal = (databases.postgres * 80) + (databases.mysql * 75) + (databases.redis * 60);
  const storageCost = (storageGB * 0.10); 
  const bandwidthCost = (bandwidthGB * 0.05);
  const grandTotal = computeTotal + storageCost + bandwidthCost + dbTotal;

  return (
    /* md:pt-4 banayera mathi bata ali space badhayeko chhu balance ko lagi */
    <div className="px-4 py-2 md:px-10 md:pt-4 md:pb-10 w-full min-h-screen bg-[#F8FAFC] flex justify-center font-sans">
      <div className="w-full max-w-[1200px]">
        <header className="mb-4">
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#0F172B] tracking-tight">Price Calculator</h1>
          <p className="text-[14px] md:text-[15px] text-slate-500 mt-2">Estimate your monthly costs with transparent pricing</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 mt-6 gap-6 items-start">
          <div className="col-span-1 lg:col-span-8 space-y-6 order-1">
            
            {/* py-[25px] ko satta ma simple p-6 rakhera padding saba tira equal banayeko chhu */}
            <section className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <h3 className="text-[18px] font-bold text-[#0F172B] mb-2">Compute Instances</h3>
              <div className="space-y-0">
                <InstanceRow label="Small Instance" price="50" value={instances.small} onAdd={() => setInstances({...instances, small: instances.small + 1})} onSub={() => setInstances({...instances, small: Math.max(0, instances.small - 1)})} />
                <InstanceRow label="Medium Instance" price="100" value={instances.medium} onAdd={() => setInstances({...instances, medium: instances.medium + 1})} onSub={() => setInstances({...instances, medium: Math.max(0, instances.medium - 1)})} />
                <InstanceRow label="Large Instance" price="200" value={instances.large} onAdd={() => setInstances({...instances, large: instances.large + 1})} onSub={() => setInstances({...instances, large: Math.max(0, instances.large - 1)})} />
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <h3 className="text-[18px] font-bold text-[#0F172B] mb-8">Storage & Bandwidth</h3>
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between text-[16px] font-medium text-[#0F172B] mb-3 font-work-sans">
                    <span>Block Storage (GB)</span>
                  </div>
                  <div className="relative w-full h-2 bg-[#F1F5F9] rounded-full">
                    <div className="absolute top-0 left-0 h-full bg-[#0077b6] rounded-full" style={{width: `${(storageGB/5000)*100}%`}}></div>
                    <input 
                      type="range" min="0" max="5000" step="50"
                      value={storageGB}
                      onChange={(e) => setStorageGB(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-4 text-[13px] font-medium font-work-sans">
                    <span className="text-slate-400">{storageGB} GB</span>
                    <span className="text-[#0077b6] font-bold">${storageCost.toFixed(2)}/mo</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[16px] font-medium text-[#0F172B] mb-3 font-work-sans">
                    <span>Bandwidth (GB)</span>
                  </div>
                  <div className="relative w-full h-2 bg-[#F1F5F9] rounded-full">
                    <div className="absolute top-0 left-0 h-full bg-[#0077b6] rounded-full" style={{width: `${(bandwidthGB/10000)*100}%`}}></div>
                    <input 
                      type="range" min="0" max="10000" step="100"
                      value={bandwidthGB}
                      onChange={(e) => setBandwidthGB(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-4 text-[13px] font-medium font-work-sans">
                    <span className="text-slate-400">{bandwidthGB} GB</span>
                    <span className="text-[#0077b6] font-bold">${bandwidthCost.toFixed(2)}/mo</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <h3 className="text-[18px] font-bold text-[#0F172B] mb-2">Database Services</h3>
              <div className="space-y-0">
                <InstanceRow label="Postgres" price="80" value={databases.postgres} onAdd={() => setDatabases({...databases, postgres: databases.postgres + 1})} onSub={() => setDatabases({...databases, postgres: Math.max(0, databases.postgres - 1)})} />
                <InstanceRow label="Mysql" price="75" value={databases.mysql} onAdd={() => setDatabases({...databases, mysql: databases.mysql + 1})} onSub={() => setDatabases({...databases, mysql: Math.max(0, databases.mysql - 1)})} />
                <InstanceRow label="Redis" price="60" value={databases.redis} onAdd={() => setDatabases({...databases, redis: databases.redis + 1})} onSub={() => setDatabases({...databases, redis: Math.max(0, databases.redis - 1)})} />
              </div>
            </section>
          </div>

          <div className="col-span-1 lg:col-span-4 space-y-4 order-2 lg:sticky lg:top-10">
            <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-[#F0F9FF] text-[#0077b6] rounded-lg">
                  <Calculator size={18} />
                </div>
                <h3 className="text-[17px] font-bold text-[#0F172B]">Cost Estimate</h3>
              </div>
              <div className="space-y-4 mb-8 text-[13px] font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-work-sans">Compute</span>
                  <span className="font-bold text-[#0F172B]">${computeTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-work-sans">Storage</span>
                  <span className="font-bold text-[#0F172B]">${storageCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-work-sans">Bandwidth</span>
                  <span className="font-bold text-[#0F172B]">${bandwidthCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-work-sans">Database</span>
                  <span className="font-bold text-[#0F172B]">${dbTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-[#F1F5F9] mb-8">
                <span className="font-bold text-[#0F172B] text-[14px]">Monthly Total</span>
                <span className="text-[26px] font-bold text-[#0077b6] tracking-tight font-work-sans">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
              <button className="w-full py-3.5 bg-[#0077b6] text-white text-[15px] font-bold rounded-xl hover:bg-[#005f91] transition-all">
                Request Quote
              </button>
            </div>
            <div className="bg-[#F0F9FF] p-5 rounded-xl border border-[#E0F2FE] flex gap-3">
              <Info size={18} className="text-[#0077b6] shrink-0" />
              <p className="text-[12px] leading-relaxed text-[#0077b6] font-medium font-work-sans">
                Prices shown are estimates. Final pricing may vary based on usage and contract terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculatorPage;