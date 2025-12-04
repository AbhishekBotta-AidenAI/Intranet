import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activePath, setActivePath] = useState('/');
    const navigate = useNavigate();

    const tagStyle = { paddingLeft: '20px', paddingRight: '20px', border: '1px solid #75ff3fff', backgroundColor: '#D4FF7F', color: '#333' };
    const buttonStyle = { border: '1px solid #75ff3fff', color: '#A7EC1C', backgroundColor: '#A7EC1C24', borderRadius: '8px', paddingBottom: '3px', paddingLeft: '20px', paddingRight: '20px' };

    const menuItems = [
        { svg: '/Dashboard/home.svg', label: 'Home', path: '/' },
        { svg: '/Dashboard/me.svg', label: 'Me', path: '/me' },
        { svg: '/Dashboard/Hrpolicies.svg', label: 'HR Policies', path: '/hr-policies' },
        { svg: '/Dashboard/Myteam.svg', label: 'My Team', path: '/my-team' },
        { svg: '/Dashboard/myfinances.svg', label: 'My Finances', path: '/my-finances' },
        { svg: '/Dashboard/org.svg', label: 'Org', path: '/org' },
        { svg: '/Dashboard/Engage.svg', label: 'Engage', path: '/engage' },
    ];

    return (
        <div className="relative h-full overflow-hidden">

            {/* Background */}
            <img
                src="/Dashboard/heroPicture.png"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Hero Banner"
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Sidebar Overlay */}
            <div
                className={`absolute top-0 left-0 h-full z-30 bg-[#073663] w-[60px] flex flex-col items-center py-4 gap-6 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Close/Toggle Button (Hamburger inside sidebar) */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-br-2xl hover:opacity-80 mb-4"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Menu Icons */}
                {menuItems.map((item, index) => {
                    const isActive = activePath === item.path;
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                setActivePath(item.path);
                                navigate(item.path);
                                setIsSidebarOpen(false); // Close sidebar on navigation
                            }}
                            className={`p-2 rounded-sm cursor-pointer transition relative group ${isActive ? 'bg-blue-600' : 'hover:bg-white/10'}`}
                            style={{ padding: "8px" }}
                        >
                            <img
                                src={item.svg}
                                alt={item.label}
                                className={`w-6 h-6 object-contain ${isActive ? 'brightness-0 invert' : ''}`}
                            />
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {item.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Hamburger Menu Trigger (Visible when sidebar is closed) */}
            {!isSidebarOpen && (
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="absolute top-0 left-0 z-20 w-[50px] h-[50px] flex items-center justify-center transition hover:opacity-90"
                    style={{ backgroundColor: '#073663' }}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21M3 6H21M3 18H21" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white" style={{ paddingLeft: "80px", paddingBottom: "100px" }}>

                <div >
                    <div className="flex items-center gap-2 mb-4" style={{ paddingTop: "80px", paddingBottom: "30px" }}>
                        <div className="text-sm font-semibold px-3 py-1 rounded-full" style={tagStyle}>
                            FROM LEADERSHIP
                        </div>
                    </div>
                    <h2 className="text-lg font-bold leading-tight">
                        A Bold Vision for 2026 - Discover What's Next
                    </h2>
                </div>

                <p className="text-sm max-w-md" style={{ paddingTop: "300px", paddingRight: "150px" }}>
                    Explore our CEO's strategic priorities for 2026: operational excellence, AI transformation, culture-first innovation, and to...
                </p>

                <button className="self-start font-medium text-sm transition" style={buttonStyle}>
                    <span>READ MORE</span>
                </button>
            </div>
        </div>
    );
};

export default HeroBanner;
