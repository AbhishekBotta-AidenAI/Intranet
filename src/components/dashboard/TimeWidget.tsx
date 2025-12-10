const TimeWidget = () => {
    const currentDate = new Date();
    
    // Get day of month with ordinal suffix
    const day = currentDate.getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? 'st' : 
                   (day % 10 === 2 && day !== 12) ? 'nd' : 
                   (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
    
    const monthShort = currentDate.toLocaleDateString('en-US', { month: 'short' });
    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' });

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    // const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';

    return (
        <div className="relative w-full max-w-full md:max-w-[320px] h-auto rounded-lg overflow-hidden">

            {/* Background */}
            <img    
                src="/Dashboard/timeWidget.png"
                alt="Time"
                className="w-full h-[200px] md:h-[240px] object-cover rounded-md"
            />

            {/* Overlay Content - Vertical Layout */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 text-white rounded-md">
                {/* Top: Today's Day */}
                <div className="space-y-1" style={{padding:"15px"}}>
                    <p className="text-[11px] md:text-[9px] text-white/80 font-small" style={{paddingBottom:"5px"}}>Today's Day</p>
                    <p className="text-[13px] md:text-[19px] font-semibold text-white-300" style={{paddingBottom:"5px"}}>{day}{suffix} {monthShort}</p>
                    <p className="text-[13px] md:text-[12px] font-semibold text-white-400">{dayOfWeek}, 2025</p>
                </div>
                
                {/* Bottom: Current Time */}
                <div className="space-y-2" style={{padding:"0px 0px 10px 20px"}}>
                    <div className="w-full flex justify-start mb-2 pl-4 md:pl-6" style={{paddingBottom:"25px"}}>
                        <div className="h-px bg-white/20 w-[80%] md:w-[90%]"></div>
                    </div>
                    <p className="text-[9px] md:text-[10px] text-white/80 font-medium">
                        Current Time
                    </p>
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-[15px] md:text-[15px] font-semibold tracking-tight text-white">
                            {hours}:{minutes} 
                        </span>
                        <span className="text-[15px] md:text-[15px] text-white ml-1 font-semibold">{ampm}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeWidget;
