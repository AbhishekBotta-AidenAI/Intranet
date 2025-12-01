const QuickLinks = () => {
    const links = [
        { label: "Payroll", sublabel: "ADP" },
        { label: "Time & Attendance", sublabel: "KEKA" },
        { label: "Wellness", sublabel: "SEQUIOA" },
    ];

    return (
        <div className="w-full max-w-[460px]">
            {/* Card */}
            <div
                className="
                    relative border border-neutral-200 rounded-2xl shadow-sm
                    w-full h-[90px]
                    px-4 py-2
                    flex flex-col overflow-hidden
                "
                style={{
                    backgroundImage: 'url(/Dashboard/QuickLinks.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* Title inside card */}
                    <h3 className="text-[13px] font-semibold text-white mb-1" style={{padding:"8px"}}>
                        Quick Links
                    </h3>

                    {/* Links row */}
                    <div className="flex flex-1">

                        {links.map((item, index) => (
                            <div
                                key={index}
                                className="flex-1 flex flex-col items-center justify-start text-center relative"
                            >
                                {/* Label - smaller */}
                                <p className="text-[8px] font-medium text-white" style={{paddingBottom:"10px"}}>
                                    {item.label}
                                </p>

                                {/* Button - much smaller */}
                                <button
                                    className="
                                        mt-1 text-white backdrop-blur-sm
                                        text-[9px] font-semibold px-2 py-[3px] 
                                        rounded-sm flex items-center gap-1
                                        hover:opacity-80 transition
                                    "
                                    style={{paddingLeft:"5px", paddingRight:"5px", paddingBottom:"5px",paddingTop:"5px", backgroundColor: '#34445D', border: '1px solid #A2D52E'}}
                                >
                                    <p style={{color: '#83D725'}}>{item.sublabel}</p>
                                    <img src="/Dashboard/LinkArrow.svg" alt="arrow" className="w-3 h-3" />
                                </button>

                                {/* Divider */}
                                {index !== links.length - 1 && (
                                    <div className="absolute right-0 top-1 bottom-1 w-px bg-white/30"></div>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickLinks;
