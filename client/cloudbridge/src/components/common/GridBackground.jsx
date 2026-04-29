import React from "react";

const GridBackground = () => {
  return (
    <div className="absolute left-1/2 -top-66 -translate-x-1/2 w-3xl h-192 pointer-events-none z-0">
      
      {/* The Grid Layer */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#E9EAEB_1px,transparent_1px),linear-gradient(to_bottom,#E9EAEB_1px,transparent_1px)] bg-size-[48px_48px]"
        style={{
          /* at center 0px: Puts the center of the circle at the very top.
            black 20%: The grid is fully visible at the top.
            transparent 50%: The grid completely fades out by the time 
            it reaches the middle of the container (well above form).
          */
          maskImage: "radial-gradient(circle at center 0px, black 20%, transparent 50%)",
          WebkitMaskImage: "radial-gradient(circle at center 0px, black 20%, transparent 50%)",
        }}
      />

      {/* The horizontal line */}
      <div className="absolute top-66 w-[200%] -left-1/2 h-px bg-[#E9EAEB]" />
    </div>
  );
};

export default GridBackground;