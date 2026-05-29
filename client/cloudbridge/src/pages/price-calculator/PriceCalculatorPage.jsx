import React, { useEffect, useState } from 'react';
import { Plus, Minus, Calculator, Info } from 'lucide-react';
import http from '../../utils/http.js';

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
  const [variants, setVariants] = useState([]); // flattened variants
  const [variantCounts, setVariantCounts] = useState({}); // { variantId: qty }
  const [storageGB, setStorageGB] = useState(0);
  const [bandwidthGB, setBandwidthGB] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await http.get('/customer/services');
        const payload = Array.isArray(res.data?.data) ? res.data.data : [];

        if (!mounted) return;

        // Flatten variants
        const v = [];
        payload.forEach((svc) => {
          const svcVariants = Array.isArray(svc.variants) ? svc.variants : [];
          svcVariants.forEach((variant) => {
            v.push({
              id: variant.id,
              serviceId: svc.id,
              serviceName: svc.name,
              category: svc.category,
              basePrice: variant.basePrice ?? 0,
              billingInterval: variant.billingInterval ?? "MONTHLY",
              attributes: Array.isArray(variant.attributes) ? variant.attributes : [],
              currency: variant.currency ?? "USD",
            });
          });
        });

        setVariants(v);

        // Initialize counts to 0 for all variants (or keep previous)
        setVariantCounts((prev) => {
          const next = { ...prev };
          v.forEach((vt) => {
            if (next[vt.id] == null) next[vt.id] = 0;
          });
          return next;
        });
      } catch (err) {
        setError(err?.response?.data?.error || err.message || 'Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
    return () => {
      mounted = false;
    };
  }, []);

  const computeTotal = variants
    .filter((v) => v.category === 'COMPUTE')
    .reduce((sum, v) => sum + (Number(variantCounts[v.id] || 0) * Number(v.basePrice || 0)), 0);

  const dbTotal = variants
    .filter((v) => v.category === 'DATABASE')
    .reduce((sum, v) => sum + (Number(variantCounts[v.id] || 0) * Number(v.basePrice || 0)), 0);

  // Determine storage unit price from first storage variant if available
  const storageVariant = variants.find((v) => v.category === 'STORAGE');
  const storageUnitPrice = storageVariant ? Number(storageVariant.basePrice || 0) : 0.10;
  const storageCost = storageGB * storageUnitPrice;
  

  const bandwidthCost = bandwidthGB * 0.05;
  const grandTotal = computeTotal + storageCost + bandwidthCost + dbTotal;

  return (
    /* md:pt-4 banayera mathi bata ali space badhayeko chhu balance ko lagi */
    <div className="px-4 py-2 md:px-10 md:pt-4 md:pb-10 w-full min-h-screen bg-[#F8FAFC] flex justify-center font-sans">
      <div className="w-full max-w-[1200px]">
        <header className="mb-4">
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#0F172B] tracking-tight">Price Calculator</h1>
          <p className="text-[14px] md:text-[15px] text-slate-500 mt-2">Estimate your monthly costs with transparent pricing</p>
        </header>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 mt-6 gap-6 items-start">
          <div className="col-span-1 lg:col-span-8 space-y-6 order-1">
            
            {/* py-[25px] ko satta ma simple p-6 rakhera padding saba tira equal banayeko chhu */}
            <section className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <h3 className="text-[18px] font-bold text-[#0F172B] mb-2">Compute Instances</h3>
              <div className="space-y-0">
                {loading ? (
                  <div className="p-4 text-sm text-slate-500">Loading compute variants...</div>
                ) : (
                  variants.filter((v) => v.category === 'COMPUTE').length === 0 ? (
                    <div className="p-4 text-sm text-slate-500">No compute instances available.</div>
                  ) : (
                    variants.filter((v) => v.category === 'COMPUTE').map((v) => (
                      <InstanceRow
                        key={v.id}
                        label={`${v.serviceName} (${v.billingInterval.toLowerCase()})`}
                        price={v.basePrice}
                        value={variantCounts[v.id] || 0}
                        onAdd={() => setVariantCounts((p) => ({ ...p, [v.id]: (p[v.id] || 0) + 1 }))}
                        onSub={() => setVariantCounts((p) => ({ ...p, [v.id]: Math.max(0, (p[v.id] || 0) - 1) }))}
                      />
                    ))
                  )
                )}
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
                {loading ? (
                  <div className="p-4 text-sm text-slate-500">Loading database variants...</div>
                ) : (
                  variants.filter((v) => v.category === 'DATABASE').length === 0 ? (
                    <div className="p-4 text-sm text-slate-500">No database variants available.</div>
                  ) : (
                    variants.filter((v) => v.category === 'DATABASE').map((v) => (
                      <InstanceRow
                        key={v.id}
                        label={`${v.serviceName} (${v.billingInterval.toLowerCase()})`}
                        price={v.basePrice}
                        value={variantCounts[v.id] || 0}
                        onAdd={() => setVariantCounts((p) => ({ ...p, [v.id]: (p[v.id] || 0) + 1 }))}
                        onSub={() => setVariantCounts((p) => ({ ...p, [v.id]: Math.max(0, (p[v.id] || 0) - 1) }))}
                      />
                    ))
                  )
                )}
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
              {/* <button className="w-full py-3.5 bg-[#0077b6] text-white text-[15px] font-bold rounded-xl hover:bg-[#005f91] transition-all">
                Request Quote
              </button> */}
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