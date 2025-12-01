const TimeWidget = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
        weekday: 'short', 
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';

    return (
        <div className="relative w-full max-w-[520px]">

            {/* Background */}
            <img 
                src="/Dashboard/TodayTime.png"
                alt="Time"
                className="w-full rounded-2xl"
            />

            {/* Overlay Content */}
            <div className="absolute top-4 left-5 space-y-1">
                
                {/* TIME */}
                <div className="flex items-end gap-1">
                    <span className="text-[20px] font-light tracking-tight text-white">
                        {hours}:{minutes}
                    </span>
                    <span className="text-[10px] text-white/70 mb-1">{ampm}</span>
                </div>
                {/* CURRENT TIME */}
                <div className="text-[5px] text-white/60">
                    Current Time
                </div>

                {/* TODAY DATE */}
                <div className="pt-2 text-xs font-semibold text-white" style={{paddingTop:"10px"}}>
                    TODAY :
                    <span className="text-blue-400 font-semibold ml-1">
                        {formattedDate}
                    </span>
                </div>

            </div>
        </div>
    );
};

export default TimeWidget;
