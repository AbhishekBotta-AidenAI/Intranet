const Footer = () => {
    return (
        <footer className="bg-[#ffffff] text-black py-4 relative z-40">
            <div className="
                w-full mx-auto 
                px-6 
                flex items-center justify-between
        "       style={{padding:"10px",paddingLeft:"30px",paddingRight:"50px"}}
            >
                
                {/* Logo */}
                <div className="flex items-center">
                    <img 
                        src="/Dashboard/HeaderLogo.png" 
                        alt="Aiden Nexus" 
                        className="h-3 p-[20px]"
                    />
                </div>

                {/* Right side section */}
                <div className="
                    hidden md:flex items-center gap-6 text-sm
                ">
                    <button 
                        className="
                            hover:text-neutral-200 transition-colors 
                            p-[10px] text-[10px]
                        "
                        style={{textDecoration:"underline"}}
                    >
                        Terms & Conditions
                    </button>

                    <span className="text-neutral-300">|</span>

                    <span className="text-neutral-700 text-[10px]">
                        © 2025 AidenAI. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
