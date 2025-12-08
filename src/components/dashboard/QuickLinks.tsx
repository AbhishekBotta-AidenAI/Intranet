const QuickLinks = () => {
    const links = [
        { label: "Payroll", sublabel: "ADP", url: "https://www.adp.com/" },
        { label: "Time & Attendance", sublabel: "KEKA", url: "https://www.keka.com/" },
        { label: "Wellness", sublabel: "SEQUIOA", url: "https://www.sequoia.com/" },
    ];

    return (
        <div className="w-full max-w-full md:max-w-[390px]">
            {/* Content */}
            <div className="flex flex-col h-auto">
                {/* Links row */}
                <div className="flex items-start gap-3">

                    {links.map((item, index) => (
                        <div
                            key={index}
                            className="flex-1 flex flex-col items-start justify-start text-center relative"
                        >
                            {/* Label */}
                            <p className="text-[9px] md:text-[10px] text-black font-semi-bold mb-4 md:mb-6" style={{paddingBottom: "10px",fontWeight:"600",paddingLeft:"2px" }}>
                                {item.label}
                            </p>

                            {/* Button */}  
                            <button
                                onClick={() => window.open(item.url, '_blank')}
                                className="
                                    text-black backdrop-blur-sm
                                    text-[10px] md:text-[13px] font-semibold
                                    rounded-sm flex items-center justify-center gap-1
                                    hover:opacity-80 transition w-23 h-6
                                "
                                style={{ paddingLeft: "7px", paddingRight: "10px", paddingBottom: "4px", paddingTop: "4px", backgroundColor: '#073663', border: '1px solid #A2D52E' }}
                            >
                                <p style={{ color: '#83D725' }}>{item.sublabel}</p>
                                <img src="/Dashboard/LinkArrow.svg" alt="arrow" className="w-2 md:w-3 h-2 md:h-3" />
                            </button>

                            {/* Divider - Vertical line between links */}
                            {index !== links.length - 1 && (
                                <div className="absolute right-0 top-1 bottom-1 w-px bg-gray-300"></div>
                            )}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default QuickLinks;
