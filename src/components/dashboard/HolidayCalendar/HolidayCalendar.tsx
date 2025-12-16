import { useState, useEffect } from 'react';
import HolidayCalendarModal from './HolidayCalendarModal';

type FeaturedHoliday = {
  id: string;
  title: string;
  dateText: string;
  dateISO?: string;
  image: string;
};

const HolidayCalendarWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const featured: FeaturedHoliday[] = [
    { id: 'new_Year', title: 'New Year', dateText: 'Wed, 1st January, 2025', dateISO: '2025-01-01', image: '/Dashboard/HolidayCalendar/new_year.jpg' },
    { id: 'pongal', title: 'Pongal', dateText: 'Tue, 14th January, 2025', dateISO: '2025-01-14', image: '/Dashboard/HolidayCalendar/pongal.png' },
    { id: 'republic_day', title: 'Republic Day', dateText: 'Sun, 26th January, 2025', dateISO: '2025-01-26', image: '/Dashboard/HolidayCalendar/republic_day.png' },
    { id: 'Mahashivratri', title: 'Mahashivratri', dateText: 'Wed, 26th February, 2025', dateISO: '2025-02-26', image: '/Dashboard/HolidayCalendar/mahashivratri.png' },
    { id: 'holi', title: 'Holi', dateText: 'Fri, 14th March, 2025', dateISO: '2025-03-14', image: '/Dashboard/HolidayCalendar/holi.png' },
    { id: 'Eid-ul-Fitr', title: 'Eid-ul-Fitr', dateText: 'Mon, 31st March, 2025', dateISO: '2025-03-31', image: '/Dashboard/HolidayCalendar/eid_ul_fitr.png' },
    { id: 'good_friday', title: 'Good Friday', dateText: 'Fri, 18th April, 2025', dateISO: '2025-04-18', image: '/Dashboard/HolidayCalendar/good_friday.png' },
    { id: 'labour_day', title: 'Labour Day', dateText: 'Thu, 1st May, 2025', dateISO: '2025-05-01', image: '/Dashboard/HolidayCalendar/labour_day.png' },
    { id: 'bonalu', title: 'Bonalu', dateText: 'Mon, 21st July, 2025', dateISO: '2025-07-21', image: '/Dashboard/HolidayCalendar/bonalu.png' },
    { id: 'ganesh_chaturthi', title: 'Ganesh Chaturthi', dateText: 'Wed, 27th August, 2025', dateISO: '2025-08-27', image: '/Dashboard/HolidayCalendar/ganesh_chaturthi.png' },
    { id: 'Eid-e-milad', title: 'Eid e Milad-un-Nabi', dateText: 'Fri, 5th September, 2025', dateISO: '2025-09-05', image: '/Dashboard/HolidayCalendar/eid_ul_fitr.png' },
    { id: 'gandhi_jayanti', title: 'Gandhi Jayanti', dateText: 'Wed, 2nd October, 2025', dateISO: '2025-10-02', image: '/Dashboard/HolidayCalendar/gandhi_jayanti.png' },
    { id: 'Dussehra', title: 'Dussehra', dateText: 'Mon, 20th October, 2025', dateISO: '2025-10-20', image: '/Dashboard/HolidayCalendar/dussehra.png' },
    { id: 'Diwali', title: 'Diwali', dateText: 'Mon, 20th October, 2025', dateISO: '2025-10-20', image: '/Dashboard/HolidayCalendar/diwali.png' },
    { id: 'guru_nanak', title: 'Guru Nanak Jayanti', dateText: 'Wed, 5th November, 2025', dateISO: '2025-11-05', image: '/Dashboard/HolidayCalendar/guru_nanak.png' },
    { id: 'christmas', title: 'Christmas', dateText: 'Thu, 25th December, 2025', dateISO: '2025-12-25', image: '/Dashboard/Christmas.jpg' },
  ];

  const [index, setIndex] = useState(0);

  // sort featured by ISO date when provided
  const sorted = (() => {
    const arr = [...featured];
    arr.sort((a, b) => {
      const da = a.dateISO ? new Date(a.dateISO).getTime() : 0;
      const db = b.dateISO ? new Date(b.dateISO).getTime() : 0;
      return da - db;
    });
    return arr;
  })();

  // set initial index to the next upcoming holiday based on today's date
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const firstUpcoming = sorted.findIndex((f) => {
      if (!f.dateISO) return false;
      return new Date(f.dateISO).getTime() >= today.getTime();
    });
    setIndex(firstUpcoming === -1 ? 0 : firstUpcoming);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = sorted[index] || sorted[0];

  const goPrev = () => setIndex((i) => (i - 1 + sorted.length) % sorted.length);
  const goNext = () => setIndex((i) => (i + 1) % sorted.length);

  return (
    <>
      <div className="relative w-full max-w-full md:max-w-[320px] h-auto rounded-lg overflow-hidden">

      {/* Background Image */}
      <img
        src={current.image}
        alt={current.title}
        className="w-full h-[200px] md:h-[240px] object-cover rounded-lg"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 rounded-lg"></div>

      {/* Navigation Arrows - both positioned top-right */}
      <button onClick={goPrev} className="absolute top-4 md:top-4.5 right-9 p-1.5 transition z-20">
        <img src="/Dashboard/heroBanner/leftArrow.png" alt="Left Arrow" className="w-4 md:w-6 h-4 md:h-6" />
      </button>

      <button onClick={goNext} className="absolute top-4 md:top-5 right-3 p-1.5 transition z-20">
        <img src="/Dashboard/heroBanner/rightArrow.png" alt="Right Arrow" className="w-4 md:w-5 h-4 md:h-5" />
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
          <div className="space-y-1" style={{paddingBottom:"15px",paddingLeft:"5px",height: "110px"}}>
            <p className="text-[9px] md:text-[10px] text-white/90 font-sm">HOLIDAY CALENDAR</p>
            <h2 className="text-[20px] md:text-[20px] font-bold tracking-wide">{current.title}</h2>
            <p className="text-[9px] md:text-[10px] text-white/80">{current.dateText}</p>
          </div>
          {/* <div style={{height:"36px"}}></div> */}
          <div className="w-full flex justify-start mb-2 pl-4 md:pl-6" style={{paddingBottom:"25px"}}>
              <div className="h-px bg-white/20 w-[80%] md:w-[100%]"></div>
          </div>

          {/* View All Button */}
          <div className="flex justify-start w-full"  style={{height:"36px",paddingBottom:"20px" ,}}>
            <button
              className="
                border-1 border-[#ffffff]
                text-white text-[15px] md:text-[13px] font-semibold 
                bg-black/20 hover:border-[#1F89EF] hover:scale-105 transition
                px-6 py-1.5 rounded-full w-full
                flex items-center justify-center

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
