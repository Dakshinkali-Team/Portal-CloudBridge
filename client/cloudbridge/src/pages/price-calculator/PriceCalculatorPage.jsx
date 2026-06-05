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

const getSliderConfig = (category) => {
  if (category === 'NETWORK') {
    return { max: 10000, step: 100 };
  }

  return { max: 5000, step: 50 };
};

const PricingServiceCard = ({ service, value, onChange }) => {
  // Use storagePrice as the unit rate for STORAGE and NETWORK
  const unitPrice = Number(service.storagePrice ?? 0);
  const selectedValue = Number(value ?? 0);
  const total = selectedValue * unitPrice;
  const { max, step } = getSliderConfig(service.category);
  const progress = max > 0 ? Math.min((selectedValue / max) * 100, 100) : 0;

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <div className="flex justify-between text-[16px] font-medium text-[#0F172B] mb-3 font-work-sans">
        <span>{service.name} ({service.unit})</span>
        <span className="text-slate-400 text-[13px] font-normal">
          ${unitPrice.toFixed(2)}/{service.unit}
        </span>
      </div>
      <div className="relative w-full h-2 bg-[#F1F5F9] rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-[#0077b6] rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
        <input
          type="range"
          min="0"
          max={max}
          step={step}
          value={selectedValue}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between mt-4 text-[13px] font-medium font-work-sans">
        <span className="text-slate-400">{selectedValue} {service.unit}</span>
        <span className="text-[#0077b6] font-bold">${total.toFixed(2)}/mo</span>
      </div>
    </div>
  );
};

const PriceCalculatorPage = () => {
  const [catalogCounts, setCatalogCounts] = useState({});
  const [serviceCatalog, setServiceCatalog] = useState({});
  const [serviceValues, setServiceValues] = useState({});
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchServiceCatalog = async () => {
      setCatalogLoading(true);
      setError(null);

      try {
        const res = await http.get('/services/catalog');
        const payload = res.data?.data || {};

        if (!mounted) {
          return;
        }

        setServiceCatalog(payload);
        setServiceValues((prev) => {
          const next = { ...prev };
          const allServices = [
            ...(Array.isArray(payload.compute) ? payload.compute : []),
            ...(Array.isArray(payload.database) ? payload.database : []),
            ...(Array.isArray(payload.blockStorage) ? payload.blockStorage : []),
            ...(Array.isArray(payload.bandwidth) ? payload.bandwidth : []),
          ];

          allServices.forEach((service) => {
            if (next[service.id] == null) {
              next[service.id] = 0;
            }
          });

          return next;
        });

        setCatalogCounts((prev) => {
          const next = { ...prev };
          const allItems = [
            ...(Array.isArray(payload.compute) ? payload.compute : []),
            ...(Array.isArray(payload.database) ? payload.database : []),
          ];

          allItems.forEach((service) => {
            if (next[service.id] == null) {
              next[service.id] = 0;
            }
          });

          return next;
        });
      } catch (err) {
        if (mounted) {
          setServiceCatalog({});
          setError(err?.response?.data?.error || err.message || 'Failed to load service catalog');
        }
      } finally {
        if (mounted) {
          setCatalogLoading(false);
        }
      }
    };

    fetchServiceCatalog();

    return () => {
      mounted = false;
    };
  }, []);

  const computeTotal = (Array.isArray(serviceCatalog.compute) ? serviceCatalog.compute : []).reduce(
    (sum, item) => sum + (Number(catalogCounts[item.id] || 0) * Number(item.basePrice || 0)),
    0
  );

  const dbTotal = (Array.isArray(serviceCatalog.database) ? serviceCatalog.database : []).reduce(
    (sum, item) => sum + (Number(catalogCounts[item.id] || 0) * Number(item.basePrice || 0)),
    0
  );

  const pricingServices = [
    ...(Array.isArray(serviceCatalog.blockStorage) ? serviceCatalog.blockStorage : []),
    ...(Array.isArray(serviceCatalog.bandwidth) ? serviceCatalog.bandwidth : []),
  ];

  const pricingTotal = pricingServices.reduce((sum, service) => {
    const selectedValue = Number(serviceValues[service.id] || 0);
    const unitPrice = Number(service.storagePrice || 0);
    return sum + selectedValue * unitPrice;
  }, 0);

  const grandTotal = computeTotal + pricingTotal + dbTotal;

  return (
    /* md:pt-4 banayera mathi bata ali space badhayeko chhu balance ko lagi */
    <div className="w-full min-h-screen bg-[#F8FAFC] font-sans">
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
                {catalogLoading ? (
                  <div className="p-4 text-sm text-slate-500">Loading compute services...</div>
                ) : (Array.isArray(serviceCatalog.compute) ? serviceCatalog.compute.length === 0 : true) ? (
                  <div className="p-4 text-sm text-slate-500">No compute instances available.</div>
                ) : (
                  serviceCatalog.compute.map((item) => (
                    <InstanceRow
                      key={item.id}
                      label={item.name}
                      price={item.basePrice}
                      value={catalogCounts[item.id] || 0}
                      onAdd={() => setCatalogCounts((p) => ({ ...p, [item.id]: (p[item.id] || 0) + 1 }))}
                      onSub={() => setCatalogCounts((p) => ({ ...p, [item.id]: Math.max(0, (p[item.id] || 0) - 1) }))}
                    />
                  ))
                )}
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <h3 className="text-[18px] font-bold text-[#0F172B] mb-8">Storage & Bandwidth</h3>
              <div className="space-y-4">
                {catalogLoading ? (
                  <div className="p-4 text-sm text-slate-500">Loading storage and bandwidth pricing...</div>
                ) : pricingServices.length === 0 ? (
                  <div className="p-4 text-sm text-slate-500">No storage or bandwidth pricing available.</div>
                ) : (
                  pricingServices.map((service) => (
                    <PricingServiceCard
                      key={service.id}
                      service={service}
                      value={serviceValues[service.id] || 0}
                      onChange={(nextValue) =>
                        setServiceValues((prev) => ({
                          ...prev,
                          [service.id]: nextValue,
                        }))
                      }
                    />
                  ))
                )}
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <h3 className="text-[18px] font-bold text-[#0F172B] mb-2">Database Services</h3>
              <div className="space-y-0">
                {catalogLoading ? (
                  <div className="p-4 text-sm text-slate-500">Loading database services...</div>
                ) : (Array.isArray(serviceCatalog.database) ? serviceCatalog.database.length === 0 : true) ? (
                  <div className="p-4 text-sm text-slate-500">No database services available.</div>
                ) : (
                  serviceCatalog.database.map((item) => (
                    <InstanceRow
                      key={item.id}
                      label={item.name}
                      price={item.basePrice}
                      value={catalogCounts[item.id] || 0}
                      onAdd={() => setCatalogCounts((p) => ({ ...p, [item.id]: (p[item.id] || 0) + 1 }))}
                      onSub={() => setCatalogCounts((p) => ({ ...p, [item.id]: Math.max(0, (p[item.id] || 0) - 1) }))}
                    />
                  ))
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
                {pricingServices.map((service) => {
                  const serviceCost = Number(serviceValues[service.id] || 0) * Number(service.storagePrice || 0);

                  return (
                    <div key={service.id} className="flex justify-between">
                      <span className="text-slate-400 font-work-sans">{service.name}</span>
                      <span className="font-bold text-[#0F172B]">${serviceCost.toFixed(2)}</span>
                    </div>
                  );
                })}
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
