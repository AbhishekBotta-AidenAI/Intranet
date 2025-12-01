const HeroBanner = () => {
    return (
        <div className="relative h-[150px] rounded-[20px] overflow-hidden" style={{padding:"10px"}}>

            {/* Background */}
            <img
                src="/Dashboard/Hero.png"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Hero Banner"
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col px-10 py-6">

                {/* LEFT */}
                <div className="flex flex-col gap-[10px]" style={{padding:"10px"}}>
                    <div className="flex items-center gap-2 mb-2" style={{paddingBottom:"10px"}}>
                        <div className="text-[10px] text-gray-800 rounded-full font-semibold" style={{paddingLeft: '20px', paddingRight: '20px', border: '3px solid #75ff3fff', backgroundColor: '#D4FF7F'}}>
                            FROM LEADERSHIP
                        </div>
                    </div>
                    <h2 className="text-[20px] leading-tight font-light text-white" style={{fontWeight:'700'}}>
                        CEO's Vision for 2026
                    </h2>

                    <p className="text-white/90 text-[15px]" style={{fontWeight: '300px'}}>
                        Building Tomorrow's Workplace Today
                    </p>
                </div>

                {/* RIGHT BUTTON */}
                <button className="absolute right-10 bottom-4 font-medium text-sm transition" style={{border: '2px solid #75ff3fff', color: '#A7EC1C', backgroundColor: '#A7EC1C24', borderRadius:'8px',paddingBottom: '3px', paddingLeft: '20px', paddingRight: '20px'}}>
                    <span style={{fontSize: '8px',paddingBottom: '10px'}}>READ MORE</span>
                </button>
            </div>
        </div>
    );
};

export default HeroBanner;
