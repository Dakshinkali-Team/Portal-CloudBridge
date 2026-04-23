const GridBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex justify-center">
      
      <div
        className="absolute w-[768px] h-[768px] -top-64 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",

          // ✅ Fade ONLY this box
          WebkitMaskImage:
            "radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)",
          maskImage:
            "radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

    </div>
  );
};

export default GridBackground;