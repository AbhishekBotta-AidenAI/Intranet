import React from 'react';
import LeftSidebar from '../components/dashboard/LeftSidebar';
import TopNavbar from '../components/dashboard/TopNavbar';
import Footer from '../components/dashboard/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col" style={{backgroundColor: '#eff7ffff'}}>
            <TopNavbar />
            <div className="flex flex-1" style={{paddingLeft:"20px",paddingTop:"10px", paddingBottom:"10px",paddingRight:"10px"}}>
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
