import React, { useContext } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import TopNavbar from '../components/dashboard/TopNavbar';
import Footer from '../components/dashboard/Footer';
import ChatBot from '../components/dashboard/ChatBot';
import { ChatContext } from '../context/ChatContext';
import TextScroller from '../components/dashboard/TextScroller';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { isChatExpanded } = useContext(ChatContext);
    const location = useLocation();
    const isDashboard = location.pathname === '/';
    return (
        <div className="flex flex-col h-screen" style={{backgroundColor: '#E7EEFF'}}>
            {/* Top Navbar - Fixed */}
            <div className="flex-shrink-0">
                <TopNavbar />
            </div>

            {/* Dashboard-only text scroller placed in layout so it's above page content */}
            {isDashboard && (
                <div className="w-full" style={{ marginTop: '60px', marginLeft: '60px', width: 'calc(100% - 60px)' }}>
                    <div className="mb-2 relative z-30">
                        <TextScroller />
                    </div>
                </div>
            )}

            {/* Main Content Area with Sidebar, Pages and optional Chat panel */}
            <div className="flex flex-1 overflow-hidden" style={{ paddingTop: '20px', paddingLeft: '60px' }}>
                {/* Sidebar is fixed on the left via its own styles; still render it here for accessibility/markup fallback */}
                <div className="flex-shrink-0 h-full" aria-hidden>
                    <Sidebar />
                </div>

                {/* Pages Content */}
                <div className={`flex-1 flex flex-col ${!isChatExpanded ? 'overflow-y-auto' : ''}`}>
                    {/* Page Content */}
                    <main className="flex flex-col flex-1 min-h-0 p-4 md:p-6 bg-[#E7EEFF] m-4 rounded-lg shadow-md">
                        {children}
                    </main>

                    {/* Footer - Sticks to bottom */}
                    <div className="flex-shrink-0">
                        <Footer />
                    </div>
                </div>
                {/* ChatBot mounted here so when expanded the panel participates in layout */}
                    <div className={`flex-shrink-0 h-full ${isChatExpanded ? 'w-96 md:w-[400px] p-4  relative z-40' : ''}`}>
                    <ChatBot />
                </div>
            </div>
            {/* When not expanded ChatBot will render floating UI itself (it is also imported above) */}
        </div>
    );
};

export default MainLayout;
