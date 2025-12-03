const TextScroller = () => {
    const messages = [
        "TAKE A BREAK — WELLNESS RESOURCES NOW AVAILABLE ON THE CARE CORNER",
        "MENTAL HEALTH WEEK STARTS MONDAY — JOIN DAILY MINDFULNESS SESSIONS",
        "HR REMINDER: SUBMIT TIMESHEETS BY 5 PM TODAY"
    ];

    return (
        <div className="w-full overflow-hidden bg-[#C3D7ED] text-[#0A3D62] py-2">
            <div className="animate-scroll flex whitespace-nowrap gap-10 pr-12">
                {[...messages, ...messages].map((msg, index) => (
                    <div key={index} className="flex items-center gap-10">
                        <span className="text-sm font-medium font-mulish text-[#03172B]">{msg}</span>
                        <span className="text-white text-2xl leading-none justify-center">•</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TextScroller;

