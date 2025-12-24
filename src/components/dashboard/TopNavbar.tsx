import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/useAuth';

const TopNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    useEffect(() => {
        console.log('[TopNavbar] render - user:', user, 'local user_name:', localStorage.getItem('user_name'));
    }, [user]);
    const displayName = user?.name ?? localStorage.getItem('user_name') ?? 'User';
    const displayEmail = user?.email ?? localStorage.getItem('user_email') ?? '';
    
    const isHome = location.pathname === '/';
    return (
        <nav className="bg-white border-b border-neutral-200 px-6 py-3 fixed top-0 z-50" style={{ left: '60px', right: 0 }}>
            <div className="flex items-center justify-between" style={{ padding: "10px" }}>
                {/* Left: Logo */}
                <div className="flex items-center">
                    <img src="/Dashboard/HeaderLogo.png" alt="Aiden Nexus" style={{ paddingLeft: "10px", height: "18px" }} />
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
                                rounded-[12px]
                                placeholder:text-neutral-500
                                focus:outline-none focus:border-neutral-400
                            "
                            style={{ paddingLeft: "35px" }}
                        />
                    </div>

                    <button
                        className="p-2 font-bold transition-colors group"
                        onClick={() => navigate('/')}
                        aria-label="Home"
                    >
                        <div
                            className={`w-5 h-4 ${isHome ? 'bg-blue-600' : 'bg-black'} group-hover:bg-blue-600 transition-colors`}
                            style={{
                                    maskImage: "url('/Dashboard/heroBanner/home.svg')",
                                    maskSize: "contain",
                                    maskRepeat: "no-repeat",
                                    maskPosition: "center",
                                    WebkitMaskImage: "url('/Dashboard/heroBanner/home.svg')",
                                    WebkitMaskSize: "contain",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "center"
                                }}
                        />
                    </button>
                    <button className="p-2 transition-colors relative group">
                        <div
                            className="w-5 h-5 bg-black group-hover:bg-blue-600 transition-colors"
                            style={{
                                    maskImage: "url('/Dashboard/heroBanner/bell.svg')",
                                    maskSize: "contain",
                                    maskRepeat: "no-repeat",
                                    maskPosition: "center",
                                    WebkitMaskImage: "url('/Dashboard/heroBanner/bell.svg')",
                                    WebkitMaskSize: "contain",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "center"
                            }}
                        />
                    </button>
                    <div className="w-px h-6 bg-neutral-200 mx-1" aria-hidden="true" />

                    {/* User Profile */}
                    <div className="flex items-center gap-3 border-neutral-200">
                        <div className="w-10 h-10 rounded-full bg-[#1F89EF] flex items-center justify-center text-white text-xs font-semibold">
                            {(displayName || 'U').split(' ').map(s => s[0]).join('').slice(0,2)}
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-[12px] font-semibold text-neutral-900">{displayName}</p>
                            {/* <p className="text-xs text-neutral-500">Center of Excellence</p> */}
                            <p className="text-[9px] text-neutral-400">{displayEmail}</p>
                        </div>
                    </div>
                    <div className="w-px h-6 bg-neutral-200 mx-1" aria-hidden="true" />

                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" style={{ paddingRight: "10px" }}>
                        <img src="/Dashboard/LogoutIcon.png" alt="Logout" className="text-black hover:text-blue-600 transition-colors" style={{ width: "20px", height: "30px" }} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;