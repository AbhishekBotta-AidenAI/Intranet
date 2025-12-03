const HolidayCalendarWidget = () => {
  return (
    <div className="relative w-full max-w-[370px] h-[110px] rounded-2xl overflow-hidden">

      {/* Background Image */}
      <img
        src="/Dashboard/Christmas.png"
        alt="Christmas"
        className="w-full h-full object-cover rounded-2xl"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

      {/* CONTENT OVERLAY */}
      <div className="absolute top-4 left-5 z-10 space-y-1">
        <h2 className="w-60 text-white font-Mulish capitalize tracking-widest text-sm">Christmas</h2>
        <p className="text-[10px] text-white/80">Thu, 25th December, 2025</p>
        <p className="pt-2 text-[11px] font-semibold text-white">HOLIDAY CALENDAR</p>
      </div>

      {/* VIEW ALL Button */}
      <button
        className="
          absolute bottom-4 right-4  
          border border-white/60 
          bg-white/20 backdrop-blur-sm 
          text-white text-[9px] font-medium 
          hover:bg-white/30 transition
          z-10
          px-3 py-1.5 rounded-sm
      "
      >
        VIEW ALL
      </button>

      {/* Left Arrow (Top-Left) */}
      <button
        className="
          absolute top-3 right-14 
          p-1 rounded-full backdrop-blur-sm z-10
        "
      >
        <img src="/Dashboard/LeftArrow.svg" alt="Left Arrow" className="w-5 h-5" />
      </button>

      {/* Right Arrow (Top-Right) */}
      <button
        className="
          absolute top-3 right-4 
          p-1 rounded-full backdrop-blur-sm z-10
        "
      >
        <img src="/Dashboard/RightArrow.svg" alt="Right Arrow" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HolidayCalendarWidget;
