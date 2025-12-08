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
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';

    return (
        <div className="relative w-full max-w-full md:max-w-[370px] h-auto rounded-md overflow-hidden">

            {/* Background */}
            <img    
                src="/Dashboard/timeWidget.png"
                alt="Time"
                className="w-full h-[260px] object-cover rounded-md"
            />

            {/* Overlay Content - Vertical Layout */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white rounded-md" style={{paddingLeft:"30px",paddingTop:"20px",paddingBottom:"20px"}}>
                {/* Top: Today's Day */}
                <div className="space-y-1">
                    <p className="text-[11px] md:text-[12px] text-white/80 font-small">Today's Day</p>
                    <p className="text-[20px] md:text-[22px] font-semibold text-blue-400">2025</p>
                    <p className="text-[13px] md:text-[17px] font-semibold text-blue-400">{dayOfWeek},</p>
                    <p className="text-[13px] md:text-[17px] font-semibold text-blue-400">{day}{suffix} {monthShort}</p>
                </div>
                {/* Bottom: Current Time */}
                <div className="space-y-2">
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-[20px] md:text-[20px] font-light tracking-tight text-white">
                            {hours}:{minutes}
                        </span>
                        <span className="text-[12px] md:text-[13px] font-light text-white">
                            :{seconds}
                        </span>
                        <span className="text-[11px] md:text-[12px] text-white/70 ml-1">{ampm}</span>
                    </div>
                    <p className="text-[9px] md:text-[10px] text-white/80 font-medium">
                        Current Time
                    </p>
                </div>

            </div>
        </div>
    );
};

export default TimeWidget;
