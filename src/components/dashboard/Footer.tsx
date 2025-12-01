const Footer = () => {
    return (
        <footer className="bg-[#073663] text-white py-6 mt-12 relative z-10">
            <div className="
                max-w-7xl mx-auto 
                px-6 
                flex items-center justify-between
        "       style={{padding:"10px",paddingLeft:"30px",paddingRight:"20px"}}
            >
                
                {/* Logo */}
                <div className="flex items-center">
                    <img 
                        src="/Dashboard/FooterLogo.png" 
                        alt="Aiden Nexus" 
                        className="h-5 p-[20px]"
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
                    >
                        Terms & Conditions
                    </button>

                    <span className="text-neutral-300">|</span>

                    <span className="text-neutral-200 text-[10px]">
                        © 2025 AidenAI. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
