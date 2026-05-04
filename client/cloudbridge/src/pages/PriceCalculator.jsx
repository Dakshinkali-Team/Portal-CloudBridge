import React, { useState, useMemo } from 'react';
import { Minus, Plus, Database, Cpu, HardDrive, Share2, Info } from 'lucide-react';

const PriceCalculator = () => {
  // States for dynamic calculations
  const [compute, setCompute] = useState({ small: 3, medium: 2, large: 2 });
  const [storage, setStorage] = useState(1500);
  const [bandwidth, setBandwidth] = useState(1700);
  const [databases, setDatabases] = useState({ postgres: 0, mysql: 0, redis: 0 });

  // Calculation Logic based on image_187c69.png
  const totals = useMemo(() => {
    const computeCost = (compute.small * 50) + (compute.medium * 100) + (compute.large * 200);
    const storageCost = storage * 0.1; // $0.10 per GB
    const bandwidthCost = bandwidth * 0.05; // $0.05 per GB
    const dbCost = (databases.postgres * 80) + (databases.mysql * 75) + (databases.redis * 60);
    
    return {
      compute: computeCost,
      storage: storageCost,
      bandwidth: bandwidthCost,
      database: dbCost,
      grandTotal: computeCost + storageCost + bandwidthCost + dbCost
    };
  }, [compute, storage, bandwidth, databases]);

  const updateCount = (type, key, delta) => {
    if (type === 'compute') {
      setCompute(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
    } else {
      setDatabases(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Price Calculator</h1>
          <p className="text-slate-500">Estimate your monthly costs with transparent pricing</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Compute Instances Section */}
            <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-blue-600" /> Compute Instances
              </h2>
              <div className="space-y-4">
                {[
                  { id: 'small', label: 'Small Instance', price: 50 },
                  { id: 'medium', label: 'Medium Instance', price: 100 },
                  { id: 'large', label: 'Large Instance', price: 200 },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-slate-400">${item.price}/mo per instance</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => updateCount('compute', item.id, -1)} className="p-1 rounded border border-slate-200 hover:bg-slate-50"><Minus className="w-4 h-4"/></button>
                      <span className="w-8 text-center font-semibold">{compute[item.id]}</span>
                      <button onClick={() => updateCount('compute', item.id, 1)} className="p-1 rounded border border-slate-200 hover:bg-slate-50"><Plus className="w-4 h-4"/></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Storage & Bandwidth Section */}
            <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-6 flex items-center">
                <HardDrive className="w-5 h-5 mr-2 text-blue-600" /> Storage & Bandwidth
              </h2>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium text-sm">Block Storage (GB)</label>
                    <span className="text-sm font-semibold">${totals.storage.toFixed(2)}/mo</span>
                  </div>
                  <input type="range" min="0" max="5000" value={storage} onChange={(e) => setStorage(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <p className="text-xs text-slate-400 mt-2">{storage} GB</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium text-sm">Bandwidth (GB)</label>
                    <span className="text-sm font-semibold">${totals.bandwidth.toFixed(2)}/mo</span>
                  </div>
                  <input type="range" min="0" max="5000" value={bandwidth} onChange={(e) => setBandwidth(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <p className="text-xs text-slate-400 mt-2">{bandwidth} GB</p>
                </div>
              </div>
            </section>

            {/* Database Services Section */}
            <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-600" /> Database Services
              </h2>
              <div className="space-y-4">
                {[
                  { id: 'postgres', label: 'Postgres', price: 80 },
                  { id: 'mysql', label: 'Mysql', price: 75 },
                  { id: 'redis', label: 'Redis', price: 60 },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-slate-400">${item.price}/mo per instance</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => updateCount('db', item.id, -1)} className="p-1 rounded border border-slate-200 hover:bg-slate-50"><Minus className="w-4 h-4"/></button>
                      <span className="w-8 text-center font-semibold">{databases[item.id]}</span>
                      <button onClick={() => updateCount('db', item.id, 1)} className="p-1 rounded border border-slate-200 hover:bg-slate-50"><Plus className="w-4 h-4"/></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Cost Estimate Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg mr-3">
                    <Share2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg">Cost Estimate</h3>
                </div>
                
                <div className="space-y-3 text-sm border-b border-slate-100 pb-6">
                  <div className="flex justify-between text-slate-500"><span>Compute</span><span className="font-medium text-slate-800">${totals.compute.toFixed(2)}</span></div>
                  <div className="flex justify-between text-slate-500"><span>Storage</span><span className="font-medium text-slate-800">${totals.storage.toFixed(2)}</span></div>
                  <div className="flex justify-between text-slate-500"><span>Bandwidth</span><span className="font-medium text-slate-800">${totals.bandwidth.toFixed(2)}</span></div>
                  <div className="flex justify-between text-slate-500"><span>Database</span><span className="font-medium text-slate-800">${totals.database.toFixed(2)}</span></div>
                </div>

                <div className="mt-6 flex justify-between items-baseline mb-6">
                  <span className="font-bold text-slate-900">Monthly Total</span>
                  <span className="text-2xl font-black text-blue-600">${totals.grandTotal.toFixed(2)}</span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors shadow-md shadow-blue-200">
                  Request Quote
                </button>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start">
                <Info className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800 leading-relaxed">
                  Prices shown are estimates. Final pricing may vary based on usage and contract terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;