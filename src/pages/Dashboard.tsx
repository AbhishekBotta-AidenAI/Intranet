import HeroBanner from '../components/dashboard/HeroBanner';
import TimeWidget from '../components/dashboard/TimeWidget';
import HolidayCalendar from '../components/dashboard/HolidayCalendar';
import QuickLinks from '../components/dashboard/QuickLinks';
import MoodTracker from '../components/dashboard/MoodTracker';
import OrganizationEngagement from '../components/dashboard/OrganizationEngagement';
import RecommendedSection from '../components/dashboard/RecommendedSection';
import UpcomingApps from '../components/dashboard/UpcomingApps';
import ChatBot from '../components/dashboard/ChatBot';
import { Plus } from 'lucide-react';

// style={{backgroundColor: '#EBF5FF'}}
const Dashboard = () => {
    return (
        <div className="min-h-screen flex flex-col" style={{backgroundColor: '#ecf3faff'}}>
            {/* Hero Banner - Full Width */}
            <div className="w-full px-6 pt-5" style={{paddingLeft:"20px"}}>
                <HeroBanner />
            </div>

            {/* Main Content */}
            <div className="w-full px-6 pt-5" style={{paddingLeft:"20px", paddingRight:"20px"}}>
                {/* Greeting Section */}
                <div className="mb-6 mt-6" style={{padding:"10px"}}>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-1">
                       <div className="justify-start"><span className="text-stone-900 font-normal font-['Mulish'] capitalize">Hey </span><span className="text-sky-900 font-bold font-['Mulish'] capitalize italic">Vaishno,</span></div>
                    </h2>
                    <p className="text-neutral-600 text-sm">
                        Happy To See You ! Have A Look At Your Personalised Dashboard.
                    </p>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6" style={{padding:"10px"}}>
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6" style={{padding:"10px"}}>
                        {/* Quick Access Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-4 font-mulish">Quick Access</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{paddingTop:"10px"}}>
                                <TimeWidget />
                                <HolidayCalendar />
                            </div>
                        </div>

                        {/* Quick Links and Mood Tracker Side by Side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{paddingTop:"10px"}}>
                            {/* Quick Links */}
                            <QuickLinks />

                            {/* Mood Tracker */}
                            <MoodTracker />
                        </div>

                        {/* Organization Engagement */}
                        <div style={{paddingTop:"20px"}}>
                            <div className="flex items-center justify-between mb-4" style={{paddingBottom:"10px"}}>
                                <h1 className="text-lg font-semibold text-neutral-1000 font-mulish" >Organisation Engagement</h1>
                                <button className="bg-[#0A3D62] text-white px-6 py-2 rounded-sm text-xs font-semibold flex items-center gap-2 hover:bg-[#082E4A] transition-colors"style={{padding:"10px"}}>
                                    MAKE ANNOUNCEMENT
                                    <Plus size={18} />
                                </button>
                            </div>
                            <OrganizationEngagement />
                        </div>

                        {/* Upcoming Apps */}
                        <UpcomingApps />
                    </div>

                    {/* Right Column - Recommended Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-4" style={{padding:"10px"}}>Recommended</h3>
                        <RecommendedSection />
                    </div>
                </div>
            </div>

            {/* Chat Bot */}
            <ChatBot />
        </div>
    );
};

export default Dashboard;
