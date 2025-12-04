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
        <div className="relative w-full max-w-[370px] h-[110px] overflow-hidden rounded-2xl">

            {/* Background */}
            <img
                src="/Dashboard/TodayTime.png"
                alt="Time"
                className="w-full h-full object-cover"
            />

            {/* Overlay Content */}
            <div className="absolute bottom-4 left-5 space-y-1">

                {/* TIME */}
                <div className="flex items-end gap-1">
                    <span className="text-[24px] font-light tracking-tight text-white">
                        {hours}:{minutes}
                    </span>
                    <span className="text-[12px] text-white/70 mb-1.5">{ampm}</span>
                </div>
                {/* CURRENT TIME */}
                <div className="text-[8px] text-white/60">
                    Current Time
                </div>

                {/* TODAY DATE */}
                <div className="pt-3 text-[11px] font-semibold text-white">
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
