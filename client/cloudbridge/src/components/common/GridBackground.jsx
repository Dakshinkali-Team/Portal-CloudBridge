

import React from "react";

const GridBackground = () => {
  return (
    <div className="absolute left-1/2 -top-66 -translate-x-1/2 w-3xl h-192 pointer-events-none z-0">
      
      {/* The Grid Mask Logic */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#E9EAEB_1px,transparent_1px),linear-gradient(to_bottom,#E9EAEB_1px,transparent_1px)] bg-size-[48px_48px]"
        style={{
          /* This creates the circular fade 'Mask' layer */
          maskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
        }}
      />

      {/* Optional: The subtle horizontal line that cuts through the logo */}
      <div className="absolute top-66 w-[200%] -left-1/2 h-px bg-[#E9EAEB]" />
    </div>
  );
};

export default GridBackground;