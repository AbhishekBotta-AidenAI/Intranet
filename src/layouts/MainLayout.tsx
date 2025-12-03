import React from 'react';
import TextScroller from '../components/dashboard/TextScroller';
import TopNavbar from '../components/dashboard/TopNavbar';
import Footer from '../components/dashboard/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[#F5F9FF]">
            <TopNavbar />
            <TextScroller />
            <div className="flex flex-1">
                {/* <LeftSidebar/> */}
                <main className="flex-1 bg-white m-4 rounded-lg shadow-md">
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;
