import React from "react";

const GridBackground = () => {
  return (
    <div className="absolute left-[336px] top-[-264px] w-[768px] h-[768px] flex items-center justify-center pointer-events-none">
      
      {/* ✅ Proper Mask (center visible, edges fade out) */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle,black_40%,transparent_100%)] bg-white/80" />

      {/* ✅ Grid */}
      <div className="relative w-[768px] h-[768px] border border-[#E9EAEB]/60 opacity-60">
        
        {/* Vertical Lines */}
        <div className="absolute inset-0 flex justify-between">
          {[...Array(17)].map((_, i) => (
            <div key={`v-${i}`} className="w-px h-full bg-[#E9EAEB]/60" />
          ))}
        </div>

        {/* Horizontal Lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(17)].map((_, i) => (
            <div key={`h-${i}`} className="h-px w-full bg-[#E9EAEB]/60" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridBackground;