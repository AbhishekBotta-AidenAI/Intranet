import { Search, Bell, Home, LogOut } from 'lucide-react';

const TopNavbar = () => {
    return (
        <nav className="bg-white border-b border-neutral-200 px-6 py-3 sticky top-0 z-40">
            <div className="flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center">
                    <img src="/Dashboard/HeaderLogo.png" alt="Aiden Nexus" height={20} style={{paddingLeft:"30px"}} className="h-5 justify-center" />
                </div>

                {/* Center: Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="https://dev.iapps.aidenai.com:3000/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors">
                        <img src ="/Dashboard/myapps.svg" alt="My Apps" width={18} height={18} />
                        <span className="text-sm font-medium">My Apps</span>
                    </a>   
                    <button className="flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors">
                        <Search size={18} />
                        <span className="text-sm font-medium">Search</span>
                    </button>
                    <button className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors">
                        Help
                    </button>
                </div>

                {/* Right: User Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                        <Home size={20} className="text-neutral-600" />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors relative">
                        <Bell size={20} className="text-neutral-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    
                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-3 border-l border-neutral-200">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-neutral-900">Vaishno Medavarom</p>
                            <p className="text-xs text-neutral-500">Center of Excellence</p>
                            <p className="text-xs text-neutral-400">Seat at COE</p>
                        </div>
                        <div className="w-10 h-10 bg-neutral-300 rounded-full overflow-hidden">
                            <img 
                                src="/Dashboard/UserPic.png" 
                                alt="User Avatar" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                        <LogOut size={20} className="text-neutral-600" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
