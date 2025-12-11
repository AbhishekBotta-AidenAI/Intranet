import { useState } from 'react';
import HolidayCalendarModal from './HolidayCalendarModal';

const HolidayCalendarWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="relative w-full max-w-full md:max-w-[320px] h-auto rounded-lg overflow-hidden">

      {/* Background Image */}
      <img
        src="/Dashboard/Christmas.jpg"
        alt="Christmas"
        className="w-full h-[200px] md:h-[240px] object-cover rounded-lg"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 rounded-lg"></div>

      {/* Navigation Arrows - both positioned top-right */}
      <button className="absolute top-4 md:top-5 right-12 p-1.5 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition z-20">
        <img src="/Dashboard/LeftArrow.svg" alt="Left Arrow" className="w-4 md:w-5 h-4 md:h-5" />
      </button>

      <button className="absolute top-4 md:top-5 right-4 p-1.5 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition z-20">
        <img src="/Dashboard/RightArrow.svg" alt="Right Arrow" className="w-4 md:w-5 h-4 md:h-5" />
      </button>

      {/* Holiday badge moved to top-left */}
      <div className="absolute top-4 left-4 z-20">
        <span className="text-gray-800 px-3 py-1 rounded-full text-[10px] md:text-[11px] font-semibold text-center" style={{width:"70px", background: 'linear-gradient(89.92deg, #EFFFCF 0.07%, #A7EC1C 225.68%)',padding: "0px 10px 2px 10px",border:'1.5px solid #8FEC1C'}}>
          Holiday
        </span>
      </div>

      {/* CONTENT OVERLAY - Vertical Layout */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 text-white" style={{marginTop:"45px",paddingLeft:"5px"}}>
        {/* Top: Empty Space */}
        

        {/* Bottom: Holiday Badge, Title, Date, and Button */}
        <div className="space-y-3" style = {{padding:"10px"}}>
          {/* Title and Date */}
          <div className="space-y-1" style={{paddingBottom:"15px",paddingLeft:"5px"}}>
            <p className="text-[9px] md:text-[10px] text-white/90 font-sm">HOLIDAY CALENDAR</p>
            <h2 className="text-[20px] md:text-[20px] font-bold tracking-wide">Christmas</h2>
            <p className="text-[9px] md:text-[10px] text-white/80">Thu, 25th December, 2025</p>
          </div>
          <div style={{height:"36px"}}></div>
          <div className="w-full flex justify-start mb-2 pl-4 md:pl-6" style={{paddingBottom:"25px"}}>
              <div className="h-px bg-white/20 w-[80%] md:w-[100%]"></div>
          </div>

          {/* View All Button */}
          <div className="flex justify-start w-full"  style={{height:"36px",paddingBottom:"20px" ,}}>
            <button
              className="
                border-1 border-[#ffffff]
                bg-transparent
                text-white text-[15px] md:text-[13px] font-semibold 
                hover:bg-white/10 transition
                px-6 py-1.5 rounded-full w-full
              "
              style={{height:"35px"}}
              onClick={() => setIsOpen(true)}
            > 
              View All
              <img src ="/Dashboard/CalendarIcon.png" alt="Arrow Right" className="inline-block w-5 h-4 ml-2" style={{paddingLeft:"5px"}}/>
            </button>
          </div>
        </div>
      </div>  
      </div>
      <HolidayCalendarModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default HolidayCalendarWidget;
