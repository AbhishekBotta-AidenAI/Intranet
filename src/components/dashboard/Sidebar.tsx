import { Home, Newspaper, FileText, Users, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: Home, label: 'Dashboard', active: true },
        { icon: Newspaper, label: 'News', active: false },
        { icon: FileText, label: 'Documents', active: false },
        { icon: Users, label: 'Directory', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                    A
                </div>
                <span className="text-xl font-bold tracking-tight">Aiden</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {menuItems.map((item) => (
                    <a
                        key={item.label}
                        href="#"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </a>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
