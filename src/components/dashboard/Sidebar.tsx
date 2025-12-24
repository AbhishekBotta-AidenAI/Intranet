import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const activePath = location.pathname;

    const menuItems = [
        { svg: '/Dashboard/home.svg', label: 'Home', path: '/' },
        {svg: '/Dashboard/myappsIcon.png', label: 'MyApps', path: '/myapps'},
        { svg: '/Dashboard/me.svg', label: 'Me', path: '/me'},
        { svg: '/Dashboard/Hrpolicies.svg', label: 'HR Policies', path: '/hr-policies' },
        { svg: '/Dashboard/Myteam.svg', label: 'My Team', path: '/my-team', disabled: true },
        { svg: '/Dashboard/myfinances.svg', label: 'My Finances', path: '/my-finances', disabled: true },
        { svg: '/Dashboard/Engage.svg', label: 'Engage', path: '/engage' },
        { svg: '/Dashboard/QuestionIcon.png', label: 'Info', path: '/info', disabled: true  },
    ];

    return (
        <div className="w-[60px] bg-[#073663] flex flex-col items-center pt-2 pb-4 gap-4 h-screen" style={{position: 'fixed', left: 0, top: 0, zIndex: 40}}>
            {/* Top Logo - occupies the full sidebar width and aligns with the navbar height */}
            <div className="w-full">
                <div className="flex items-center justify-center w-full h-15 px-2">
                    <button
                        onClick={() => { navigate('/'); }}
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
                    const isDisabled = !!item.disabled;
                    return (
                        <button
                            key={index}
                            onClick={() => {
                                if (isDisabled) return;
                                navigate(item.path);
                            }}
                            className={`p-2 transition relative group flex items-center justify-center rounded-sm ${!isActive && !isDisabled ? 'hover:bg-white/10' : ''} ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                            style={{ padding: "8px", backgroundColor: isActive ? '#1F89EF' : undefined }}
                            disabled={isDisabled}
                            title={item.label}
                        >
                            <img
                                src={item.svg}
                                alt={item.label}
                                className= {item.label === "MyApps" ? "w-4 h-4 object-contain" : "w-5 h-5 object-contain"}
                                style={{ filter: 'brightness(0) invert(1)' }}
                            />
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
