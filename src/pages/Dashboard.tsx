import HeroBanner from '../components/dashboard/HeroBanner';
import HolidayCalendar from '../components/dashboard/HolidayCalendar';
import QuickLinks from '../components/dashboard/QuickLinks';
import MoodTracker from '../components/dashboard/MoodTracker';
import OrganizationEngagement from '../components/dashboard/OrganizationEngagement';
import RecommendedSection from '../components/dashboard/RecommendedSection';
import UpcomingApps from '../components/dashboard/UpcomingApps';

import ChatBot from '../components/dashboard/ChatBot';
import TimeWidget from '../components/dashboard/TimeWidget';

// style={{backgroundColor: '#EBF5FF'}}
const Dashboard = () => {
    return (
        <div className="flex flex-1" style={{ backgroundColor: '#e2e8f0' }}>
            {/* Left side Hero Banner */}
            <div className="w-[35%]">
                <HeroBanner />
            </div>

            {/* Right side Content */}
            <div className="w-[65%] p-6 space-y-6" style={{ paddingLeft: "20px",paddingRight: "40px" }}>
                {/* Greeting Section */}
                <div className="mb-6" style={{ paddingBottom: "20px", paddingTop: "20px" }}>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-1">
                        <div className="justify-start"><span className="text-stone-900 font-normal font-['Mulish'] capitalize">Hey </span><span className="text-sky-900 font-bold font-['Mulish'] capitalize italic">Vaishno,</span></div>
                    </h2>
                    <p className="text-neutral-600 text-sm">
                        Happy To See You ! Have A Look At Your Personalised Dashboard.
                    </p>
                </div>

                {/* Quick Access Section */}
                {/* Main Content Grid */}
                <div className="flex gap-4 items-stretch">
                    {/* Left Column: Quick Access */}
                    <div className="flex flex-col gap-5 min-w-[370px]">
                        <h3 className="text-lg font-bold text-neutral-800">Quick Access</h3>
                        <QuickLinks />
                        <TimeWidget />
                        <HolidayCalendar />
                        <MoodTracker />
                    </div>

                    {/* Right Column: Engagement & Recommended */}
                    <div className="flex-1 flex flex-col gap-5">
                        <h3 className="text-lg font-bold text-neutral-800">Organization Engagement</h3>
                        <OrganizationEngagement />
                        <h3 className="text-lg font-bold text-neutral-800">Recommended For You</h3>
                        <RecommendedSection />
                        {/* <UpcomingApps /> */}
                    </div>
                </div>

                {/* Upcoming Apps Section */}
                <div className="pt-2" style={{ paddingBottom: "20px" }}>
                    <UpcomingApps />
                </div>
            </div>
            <ChatBot />
        </div>
    );
};


export default Dashboard;
