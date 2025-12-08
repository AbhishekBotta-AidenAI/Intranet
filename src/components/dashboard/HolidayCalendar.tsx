const HolidayCalendarWidget = () => {
  return (
    <div className="relative w-full max-w-full md:max-w-[370px] h-auto rounded-lg overflow-hidden">

      {/* Background Image */}
      <img
        src="/dashboard/christmas.png"
        alt="Christmas"
        className="w-full h-[260px] object-cover rounded-lg"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 rounded-lg"></div>

      {/* Navigation Arrows - Top */}
      <div className="absolute top-4 md:top-5 right-4 flex gap-2 z-10">
        {/* Left Arrow */}
        <button className="p-1.5 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition">
          <img src="/Dashboard/LeftArrow.svg" alt="Left Arrow" className="w-4 md:w-5 h-4 md:h-5" />
        </button>

        {/* Right Arrow */}
        <button className="p-1.5 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition">
          <img src="/Dashboard/RightArrow.svg" alt="Right Arrow" className="w-4 md:w-5 h-4 md:h-5" />
        </button>
      </div>

      {/* CONTENT OVERLAY - Vertical Layout */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white">
        {/* Top: Empty Space */}
        <div></div>

        {/* Bottom: Holiday Badge, Title, Date, and Button */}
        <div className="space-y-3" style = {{padding:"15px"}}>
          {/* Holiday Badge */}
          <div className="flex justify-start" style={{paddingBottom:"20px"}}>
            <span className="text-gray-800 px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-semibold text-center" style={{width:"80px", background: 'linear-gradient(89.92deg, #EFFFCF 0.07%, #A7EC1C 225.68%)'}}>
              Holiday
            </span>
          </div>

          {/* Title and Date */}
          <div className="space-y-1" style={{paddingBottom:"15px",paddingLeft:"5px"}}>
            <p className="text-[9px] md:text-[10px] text-white/90 font-sm">HOLIDAY CALENDAR</p>
            <h2 className="text-[20px] md:text-[20px] font-bold tracking-wide">Christmas</h2>
            <p className="text-[9px] md:text-[10px] text-white/80">Thu, 25th December, 2025</p>
          </div>

          {/* View All Button */}
          <div className="flex justify-start w-full"  style={{padding:"6px",height:"40px"}}>
            <button
              className="
                border-2 border-[#D1FF9A]
                bg-transparent
                text-[#D1FF9A] text-[9px] md:text-[10px] font-semibold 
                hover:bg-white/10 transition
                px-8 py-2 rounded-full w-full
              "
              
            >
              VIEW ALL
            </button>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default HolidayCalendarWidget;
