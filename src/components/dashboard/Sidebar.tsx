import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [activePath, setActivePath] = useState('/');
    const navigate = useNavigate();

    const menuItems = [
        { svg: '/Dashboard/home.svg', label: 'Home', path: '/' },
        { svg: '/Dashboard/me.svg', label: 'Me', path: '/me' },
        { svg: '/Dashboard/Hrpolicies.svg', label: 'HR Policies', path: '/hr-policies' },
        { svg: '/Dashboard/Myteam.svg', label: 'My Team', path: '/my-team' },
        { svg: '/Dashboard/myfinances.svg', label: 'My Finances', path: '/my-finances' },
        { svg: '/Dashboard/org.svg', label: 'Org', path: '/org' },
        { svg: '/Dashboard/Engage.svg', label: 'Engage', path: '/engage' },
        { svg: '/Dashboard/QuestionIcon.png', label: 'Info', path: '/info' },
    ];

    return (
        <div className="w-[60px] bg-[#073663] flex flex-col items-center pt-2 pb-4 gap-4 h-screen" style={{position: 'fixed', left: 0, top: 0, zIndex: 40}}>
            {/* Top Logo - occupies the full sidebar width and aligns with the navbar height */}
            <div className="w-full">
                <div className="flex items-center justify-center w-full h-15 px-2">
                    <button
                        onClick={() => { setActivePath('/'); navigate('/'); }}
                        className="w-full h-full flex items-center justify-center"
                        title="Home"
                        
                    >
                        <img src="/Dashboard/aidenaiShortLogo.png" alt="AideNexus Logo" className="max-w-full max-h-8 object-contain" style={{ marginTop: '2px' }}/>
                    </button>
                </div>

                <div className="w-full flex justify-center -mt-3">
                    <div className="w-[30px] h-px bg-white/10 rounded" />
                </div>
            </div>

            {/* Menu Icons */}
            <div className="flex flex-col gap-3 flex-1 -mt-2">
                {menuItems.map((item, index) => {
                    const isActive = activePath === item.path;
                    return (
                        <button
                            key={index}
                            onClick={() => {
                                setActivePath(item.path);
                                navigate(item.path);
                            }}
                            className={`p-2 transition relative group flex items-center justify-center rounded-sm ${!isActive ? 'hover:bg-white/10' : ''}`}
                            style={{ padding: "8px", backgroundColor: isActive ? '#1F89EF' : undefined }}
                            title={item.label}
                        >
                            <img
                                src={item.svg}
                                alt={item.label}
                                className="w-4 h-4 object-contain"
                                style={{ filter: 'brightness(0) invert(1)' }}
                            />
                            {/* <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                {item.label}
                            </div> */}
                        </button>
                    );
                })}
            </div>

            {/* Logout or bottom icon */}
            {/* <div className="mt-auto">
                <button className="p-2 hover:bg-white/10 rounded-sm transition" title="Logout">
                    <img src="/Dashboard/LogoutIcon.png" alt="Logout" className="w-6 h-6 object-contain" />
                </button>
            </div> */}
        </div>
    );
};

export default Sidebar;
