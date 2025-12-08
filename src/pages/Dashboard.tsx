import HeroBanner from '../components/dashboard/HeroBanner';
import TextScroller from '../components/dashboard/TextScroller';
import HolidayCalendar from '../components/dashboard/HolidayCalendar';
import QuickLinks from '../components/dashboard/QuickLinks';
import MoodTracker from '../components/dashboard/MoodTracker';
import OrganizationEngagement from '../components/dashboard/OrganizationEngagement';
import RecommendedSection from '../components/dashboard/RecommendedSection';
import UpcomingApps from '../components/dashboard/UpcomingApps';
import TimeWidget from '../components/dashboard/TimeWidget';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const Dashboard = () => {
    const { isChatExpanded } = useContext(ChatContext);

    // Always keep the md breakpoint multi-column layout so the middle column
    // (Organization Engagement) doesn't get pushed below when the chat expands.
    const gridClass = 'flex flex-col md:flex-row gap-3 md:gap-4 items-start';

    return (
        <div className="w-full" style={{ paddingBottom :"20px",background: 'radial-gradient(circle at 20% 80%, #a4d8ff 0%, transparent 40%), radial-gradient(circle at 80% 20%, #cfeaff 0%, transparent 50%), #f9fbe5ff' }}>
            {/* Text Scroller - Dashboard only */}
            <div className="mb-4">
                <TextScroller />
            </div>

            {/* Hero Banner */}
            <div className="h-[110px] w-full mb-4" style={{paddingLeft:"10px", paddingRight:"10px"}}>
                <HeroBanner />
            </div>

            {/* Greeting Section */}
            <div className="mb-4 md:mb-6" style={{ paddingBottom: "12px", paddingTop: "20px" ,paddingLeft:"15px"}}>
                <h2 className="text-lg md:text-2xl font-bold text-neutral-900 mb-1">
                    <div className="justify-start"><span className="text-stone-900 font-normal font-['Mulish'] capitalize">Hey </span><span className="text-sky-900 font-bold font-['Mulish'] capitalize italic">Vaishno,</span></div>
                </h2>
                <p className="text-neutral-600 text-xs md:text-sm">
                    Happy To See You ! Have A Look At Your Personalised Dashboard.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className={gridClass} style={{paddingLeft:"20px"}}>
                {/* Left Column: Quick Access */}
                <div className="flex flex-col gap-3 md:gap-4 w-full md:w-[320px] flex-shrink-0">
                    <h3 className="text-base md:text-lg font-bold text-neutral-800">Quick Access</h3>
                    <QuickLinks />
                    {/* Time Widget and Holiday Calendar Side by Side */}
                    <h3 className="text-base md:text-lg font-bold text-neutral-800">Daily Picks</h3>
                    <div className="flex flex-col md:flex-row gap-3 w-full">
                        <div className="flex-1">
                            <TimeWidget />
                        </div>
                        <div className="flex-1">    
                            <HolidayCalendar />
                        </div>
                    </div>
                    
                    <MoodTracker />
                </div>

                {/* Middle Column: Recommended Reads */}
                <div className="flex-1 flex flex-col gap-3 md:gap-5 w-full min-w-0 md:flex-[1.5] md:max-w-3xl">
                    <h3 className="text-base md:text-lg font-bold text-neutral-800">Organization Engagement</h3>
                    <OrganizationEngagement />
                    <div className="flex items-center justify-between">
                        <h3 className="text-base md:text-lg font-bold text-neutral-800">Recommended Reads</h3>
                        <button className="border-2 border-[#073663] text-[#073663] px-4 py-2 rounded font-semibold text-sm hover:bg-blue-50 transition" style={{height: '33px', width: '105px',borderRadius:'25px'}}>
                            Read All
                        </button>   
                    </div>
                    <RecommendedSection />
                    
                </div>

                {/* Right Column: Organization Engagement & Upcoming Apps (hidden when chat expanded) */}
                {!isChatExpanded && (
                    <div className="flex-1 flex flex-col gap-3 md:gap-5 w-full min-w-0 md:flex-[1] md:max-w-md" style={{ paddingRight: '10px' }}>
                        <h3 className="text-base md:text-lg font-bold text-neutral-800">Upcoming On The Apps</h3>
                        <UpcomingApps />
                    </div>
                )}
            </div>

            {/* When chat is expanded, move UpcomingApps below content for responsive layout */}
            {isChatExpanded && (
                <div className="w-full px-5" style={{ paddingRight: '10px', paddingTop: '20px', paddingLeft: '20px' }}>
                    <h3 className="text-base md:text-lg font-bold text-neutral-800" style={{paddingBottom:"20px"}}>Upcoming On The Apps</h3>
                    <UpcomingApps />
                </div>
            )}
            {/* ChatBot is mounted in MainLayout for split-screen behaviour */}
        </div>
    );
};

export default Dashboard;