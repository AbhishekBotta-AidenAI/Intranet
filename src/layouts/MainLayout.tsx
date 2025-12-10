import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import TopNavbar from '../components/dashboard/TopNavbar';
import Footer from '../components/dashboard/Footer';
import ChatBot from '../components/dashboard/ChatBot';
// import { ChatContext } from '../context/ChatContext';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    // const { isChatExpanded } = useContext(ChatContext);
    return (
        <div className="flex flex-col h-screen" style={{background: 'radial-gradient(circle at 20% 80%, #a4d8ff 0%, transparent 40%), radial-gradient(circle at 80% 20%, #cfeaff 0%, transparent 50%), #f9fbe5ff'}}>
            {/* Top Navbar - Fixed */}
            <div className="flex-shrink-0">
                <TopNavbar />
            </div>

            {/* Main Content Area with Sidebar, Pages and optional Chat panel */}
            <div className="flex flex-1 overflow-hidden" style={{ paddingTop: '60px', paddingLeft: '60px' }}>
                {/* Sidebar is fixed on the left via its own styles; still render it here for accessibility/markup fallback */}
                <div className="flex-shrink-0 h-full" aria-hidden>
                    <Sidebar />
                </div>

                {/* Pages Content - Scrollable */}
                <div className={`flex-1 flex flex-col overflow-y-auto`}>
                    {/* Page Content */}
                    <main className="flex-1 p-4 md:p-6 bg-[#E7EEFF] m-4 rounded-lg shadow-md">
                        {children}
                    </main>

                    {/* Footer - Sticks to bottom */}
                    <div className="flex-shrink-0">
                        <Footer />
                    </div>
                </div>
                {/* ChatBot mounted here so when expanded the panel participates in layout */}
                <div className="flex-shrink-0 h-full">
                    <ChatBot />
                </div>
            </div>
            {/* When not expanded ChatBot will render floating UI itself (it is also imported above) */}
        </div>
    );
};

export default MainLayout;
