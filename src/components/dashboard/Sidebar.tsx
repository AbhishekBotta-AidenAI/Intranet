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
        <div className="w-[60px] bg-[#03172B] flex flex-col items-center py-4 gap-6 h-full" style={{boxShadow: '-23px 12px 62.9px 0px #1F89EF61 inset'}}>
            {/* Menu Icons */}
            <div className="flex flex-col gap-4 flex-1" style={{paddingTop:"20px"}}>
                {menuItems.map((item, index) => {
                    const isActive = activePath === item.path;
                    return (
                        <button
                            key={index}
                            onClick={() => {
                                setActivePath(item.path);
                                navigate(item.path);
                            }}
                            className={`p-2 transition relative group flex items-center justify-center ${
                                isActive ? 'bg-blue-600 rounded-sm' : 'hover:bg-white/10 rounded-sm'
                            }`}
                            style={{ padding: "8px" }}
                            title={item.label}
                        >
                            <img
                                src={item.svg}
                                alt={item.label}
                                className="w-5 h-5 object-contain"
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
            <div className="mt-auto">
                <button className="p-2 hover:bg-white/10 rounded-sm transition" title="Logout">
                    <img src="/Dashboard/LogoutIcon.png" alt="Logout" className="w-6 h-6 object-contain" />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
