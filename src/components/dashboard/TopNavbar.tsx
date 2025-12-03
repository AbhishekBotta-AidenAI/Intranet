const TopNavbar = () => {
    return (
        <nav className="bg-white border-b border-neutral-200 px-6 py-3 sticky top-0 z-40">
            <div className="flex items-center justify-between" style={{ padding: "10px" }}>
                {/* Left: Logo */}
                <div className="flex items-center">
                    <img src="/Dashboard/HeaderLogo.png" alt="Aiden Nexus" style={{ paddingLeft: "10px", height: "30px" }} />
                </div>

                {/* Right: User Actions */}
                <div className="flex items-center gap-4">
                    {/* Search Bar - Fixed */}
                    <div className="relative hidden md:flex items-center">
                        <div className="absolute left-3 flex items-center pointer-events-none">
                            <img
                                src="/Dashboard/searchIcon.png"
                                className="w-4 h-4"
                                alt="search"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Tools, Apps, Leaves"
                            className="
                                pl-10
                                pr-4
                                h-8
                                w-72
                                text-sm
                                bg-white
                                border border-neutral-300
                                rounded-sm
                                placeholder:text-neutral-500
                                focus:outline-none focus:border-neutral-400
                            "
                            style={{ paddingLeft: "35px" }}
                        />
                    </div>

                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors group">
                        <div
                            className="w-5 h-5 bg-black group-hover:bg-blue-600 transition-colors"
                            style={{
                                maskImage: "url('/Dashboard/homeIcon.png')",
                                maskSize: "contain",
                                maskRepeat: "no-repeat",
                                maskPosition: "center",
                                WebkitMaskImage: "url('/Dashboard/homeIcon.png')",
                                WebkitMaskSize: "contain",
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskPosition: "center"
                            }}
                        />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors relative group">
                        <div
                            className="w-5 h-5 bg-black group-hover:bg-blue-600 transition-colors"
                            style={{
                                maskImage: "url('/Dashboard/BellIcon.png')",
                                maskSize: "contain",
                                maskRepeat: "no-repeat",
                                maskPosition: "center",
                                WebkitMaskImage: "url('/Dashboard/BellIcon.png')",
                                WebkitMaskSize: "contain",
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskPosition: "center"
                            }}
                        />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 border-neutral-200" style={{ paddingLeft: "10px" }}>
                        <div className="w-10 h-10 bg-neutral-300 rounded-full overflow-hidden">
                            <img
                                src="/Dashboard/UserPic.png"
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-sm font-semibold text-neutral-900">Vaishno Medavarom</p>
                            <p className="text-xs text-neutral-500">Center of Excellence</p>
                            <p className="text-xs text-neutral-400">Seat at COE</p>
                        </div>
                    </div>

                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" style={{ paddingRight: "10px" }}>
                        <img src="/Dashboard/LogoutIcon.png" alt="Logout" className="text-black hover:text-blue-600 transition-colors" style={{ width: "30px", height: "30px" }} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;