import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItem {
    svg: string;
    label: string;
    path: string;
}

const LeftSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const menuItems: SidebarItem[] = [
        { svg: '/Dashboard/home.svg', label: 'Home', path: '/' },
        { svg: '/Dashboard/me.svg', label: 'Me', path: '/me' },
        { svg: '/Dashboard/Hrpolicies.svg', label: 'HR Policies', path: '/hr-policies' },
        { svg: '/Dashboard/Myteam.svg', label: 'My Team', path: '/my-team' },
        { svg: '/Dashboard/myfinances.svg', label: 'My Finances', path: '/my-finances' },
        { svg: '/Dashboard/org.svg', label: 'Org', path: '/org' },
        { svg: '/Dashboard/Engage.svg', label: 'Engage', path: '/engage' },
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-[77px] lg:top-0 left-0 z-30
                bg-white rounded-2xl border border-neutral-200 shadow-sm
                h-[calc(100vh-77px)] lg:h-[calc(100vh-77px)] 
                transform transition-all duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                ${isCollapsed ? 'w-16' : 'w-64'}
                flex flex-col
                lg:ml-5 lg:my-4
            `}>
                
                {/* Collapse Toggle Button - Desktop Only */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-white border border-neutral-200 rounded-full items-center justify-center hover:bg-neutral-50 transition-colors shadow-sm z-50"
                >
                    {isCollapsed ? (
                        <ChevronRight size={14} className="text-neutral-600" />
                    ) : (
                        <ChevronLeft size={14} className="text-neutral-600" />
                    )}
                </button>

                {/* Header Section */}
                <div className="flex-shrink-0">
                    {/* Mobile Header */}
                    <div className="px-4 py-3 border-b border-neutral-200 lg:hidden">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">AN</span>
                                </div>
                                <span className="text-sm font-semibold text-neutral-700">AIDEN NEXUS</span>
                            </div>
                            <button
                                className="p-1 hover:bg-neutral-100 rounded transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <X size={20} className="text-neutral-600" />
                            </button>
                        </div>
                    </div>

                    {/* Leadership Badge */}
                    <div className="px-4 py-4">
                    </div>
                </div>

                {/* Aiden Nexus Title */}
                <div className="px-4 py-3 text-center border-b border-neutral-200" style={{paddingTop: '30px'}}>
                    {!isCollapsed && (
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-sm font-semibold text-neutral-900">AIDEN NEXUS</span>
                        </div>
                    )}
                </div>
                {/* Navigation Menu */}
                <div  style ={{paddingLeft:"10px",paddingRight:"10px"}}>
                <nav className="flex-1 px-2 space-y-1.25 overflow-y-auto" style={{paddingTop: '20px', paddingBottom: '20px'}}>
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                        <button
                            key={index}
                            onClick={() => handleNavigation(item.path)}
                            title={isCollapsed ? item.label : ''}
                            className={`
                                w-full flex items-center rounded-lg transition-all duration-200
                                ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-3 py-3'}
                                ${isActive
                                    ? 'bg-[#073663] text-white shadow-sm font-semibold'
                                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                                }
                            `}
                           
                        >
                            <div className={`${isCollapsed ? '' : 'mr-3'}`} style={{padding:"10px"}}>
                                <img src={item.svg} alt={item.label} className="w-5 h-5 object-contain" />
                            </div>
                            {!isCollapsed && (
                                <span className="text-sm font-medium whitespace-nowrap">
                                    {item.label}
                                </span>
                            )}
                        </button>
                        );
                    })}
                </nav>
            </div>
            </aside>
        </>
    );
};

export default LeftSidebar;