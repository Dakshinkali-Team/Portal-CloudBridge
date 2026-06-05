import React, { useEffect, useState } from "react";
import http from "../../utils/http.js";
import { useNavigate } from "react-router-dom";

const PricingPreview = () => {
  const [vcpu, setVcpu] = useState(2);
  const [ram, setRam] = useState(4);
  const [prices, setPrices] = useState({ vcpuPrice: 0, ramPrice: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchPrices = async () => {
      setLoading(true);
      try {
        const res = await http.get("/pricing");
        const data = res.data?.data || {};
        if (!mounted) return;
        setPrices({ vcpuPrice: Number(data.vcpuPrice || 0), ramPrice: Number(data.ramPrice || 0) });
      } catch (err) {
        // fallback to zeros
        if (mounted) setPrices({ vcpuPrice: 0, ramPrice: 0 });
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPrices();
    return () => (mounted = false);
  }, []);

  const monthlyCost = vcpu * prices.vcpuPrice + ram * prices.ramPrice;

  const handleQuote = () => {
    // Navigate to protected price calculator (ProtectedRoute will enforce auth)
    navigate("/price-calculator");
  };

  return (
    <div className="w-full max-w-md lg:max-w-8/10">
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <h4 className="text-lg font-semibold mb-4">Quick Pricing Preview</h4>

        <div className="mb-4">
          <label className="text-sm text-slate-500">Compute (vCPU): <span className="font-bold text-slate-800">{vcpu}</span></label>
          <input type="range" min="1" max="32" step="1" value={vcpu} onChange={(e)=>setVcpu(Number(e.target.value))} className="w-full mt-2" />
        </div>

        <div className="mb-4">
          <label className="text-sm text-slate-500">Memory (GB): <span className="font-bold text-slate-800">{ram}</span></label>
          <input type="range" min="1" max="128" step="1" value={ram} onChange={(e)=>setRam(Number(e.target.value))} className="w-full mt-2" />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Estimated Monthly Cost</span>
            <span className="text-2xl font-bold text-[#0077b6]">${loading ? "--" : monthlyCost.toFixed(2)}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Based on current pricing from our catalog</p>
        </div>

        <button onClick={handleQuote} className="w-full py-2 bg-[#0B78C1] text-white rounded-md hover:bg-[#095a99] transition">Get This Quote</button>
      </div>
    </div>
  );
};

export default PricingPreview;
