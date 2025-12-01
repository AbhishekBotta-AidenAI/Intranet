const HolidayCalendarWidget = () => {
  return (
    <div className="relative w-full max-w-[520px] rounded-2xl overflow-hidden">

      {/* Background Image */}
      <img
        src="/Dashboard/Christmas.png"
        alt="Christmas"
        className="w-full h-full object-cover rounded-2xl"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

      {/* CONTENT OVERLAY */}
      <div className="absolute top-6 left-5 z-10 space-y-1">
        <h2 className="w-80 text-white text-2xl font-bold font-['Mulish'] capitalize tracking-widest" style={{paddingTop:'3px'}}>Christmas</h2>
        <p className="text-[8px] text-white/80">Thu, 25th December, 2025</p>
        <p className="pt-3 text-[12px] font-semibold text-white">HOLIDAY CALENDAR</p>
      </div>

      {/* VIEW ALL Button */}
      <button
        className="
          absolute bottom-4 right-4  
          border border-white/60 
          bg-white/20 backdrop-blur-sm 
          text-white text-[10px] font-medium 
          hover:bg-white/30 transition
          z-10
      "
        style={{paddingLeft:"10px", paddingRight:"10px"}}
      >
        VIEW ALL
      </button>

      {/* Left Arrow (Top-Left) */}
      <button
        className="
          absolute top-3 left-3 
          p-2 rounded-full backdrop-blur-sm z-10
        "
      >
        <img src="/Dashboard/LeftArrow.svg" alt="Left Arrow" className="w-5 h-5" />
      </button>

      {/* Right Arrow (Top-Right) */}
      <button
        className="
          absolute top-3 right-3 
          p-2 rounded-full backdrop-blur-sm z-10
        "
      >
        <img src="/Dashboard/RightArrow.svg" alt="Right Arrow" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HolidayCalendarWidget;
