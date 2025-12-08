const TextScroller = () => {
    const messages = [
        "TAKE A BREAK — WELLNESS RESOURCES NOW AVAILABLE ON THE CARE CORNER",
        "MENTAL HEALTH WEEK STARTS MONDAY — JOIN DAILY MINDFULNESS SESSIONS",
        "HR REMINDER: SUBMIT TIMESHEETS BY 5 PM TODAY"
    ];

    return (
        <div className="w-full overflow-hidden" style={{ background: '#e9f1e8', color: '#0A3D62' }}>
            <div className="animate-scroll flex whitespace-nowrap gap-10 pr-12" style={{padding:"5px"}}>
                {[...messages, ...messages].map((msg, index) => (
                    <div key={index} className="flex items-center gap-8">
                        <span className="text-[12px] font-medium font-mulish text-[#03172B]">{msg}</span>
                        <span className="text-black text-2xl leading-none justify-center">•</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TextScroller;

