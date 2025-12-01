import React from 'react';
import LeftSidebar from '../components/dashboard/LeftSidebar';
import TopNavbar from '../components/dashboard/TopNavbar';
import Footer from '../components/dashboard/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col" style={{backgroundColor: '#EBF5FF'}}>
            <TopNavbar />
            <div className="flex flex-1" style={{padding:"20px"}}>
                <LeftSidebar/>
                <main className="flex-1">
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;
