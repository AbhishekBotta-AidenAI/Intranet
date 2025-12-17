import HeroBanner from '../components/dashboard/HeroBanner';
// import TextScroller from '../components/dashboard/TextScroller';
import HolidayCalendar from '../components/dashboard/HolidayCalendar/HolidayCalendar';
import QuickLinks from '../components/dashboard/QuickLinks';
import MoodTracker from '../components/dashboard/MoodTracker';
import OrganizationEngagement from '../components/dashboard/OrganizationEngagement';
import RecommendedSection from '../components/dashboard/RecommendedSection';
import UpcomingApps from '../components/dashboard/UpcomingApps';
import TimeWidget from '../components/dashboard/TimeWidget';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../context/ChatContext';

const Dashboard = () => {
    const { isChatExpanded } = useContext(ChatContext);
    const navigate = useNavigate();

    // Always keep the md breakpoint multi-column layout so the middle column
    // (Organization Engagement) doesn't get pushed below when the chat expands.
    const gridClass = 'flex flex-col md:flex-row gap-4 md:gap-4 items-start';

    return (
        <div className="w-full" style={{background: '#f0F2F5',paddingTop:"32px"}}>
            {/* Text Scroller - Dashboard only */}
            {/* <div className="mb-8 rounded-lg overflow-hidden" style={{paddingBottom:"20px"}}>
                <TextScroller />
            </div> */}

            {/* Hero Banner */}
            <div className="h-[160px] w-full mt-4 mb-6 rounded-lg overflow-hidden" style={{paddingLeft:"32px",paddingRight:"32px"}}>
                <HeroBanner />
            </div>

            <div
                className={`bg-white rounded-2xl flex flex-col flex-1 min-h-0 ${isChatExpanded ? 'overflow-y-auto h-full' : ''}`}
                style={{
                    marginLeft: "32px",
                    marginRight: "32px",
                    marginTop: "32px",
                    marginBottom: "32px",
                    maxHeight: isChatExpanded ? 'calc(100vh - 360px)' : undefined,
                }}
            >
                {/* Greeting Section */}
                <div className="mb-4 md:mb-6" style={{ padding:"32px"}}>
                    <h2 className="text-lg md:text-2xl font-bold mb-1">
                        <div className="justify-start"><span className="font-semibold font-['Mulish'] capitalize">Hey </span><span className="text-[#1F89EF] font-semibold font-['Mulish'] capitalize">Vaishno,</span></div>
                    </h2>
                    <p className="text-neutral-600 text-xs md:text-sm">
                        Happy To See You ! Have A Look At Your Personalised Dashboard.
                    </p>
                </div>

                {/* Make the main content area scrollable inside this white card */}
                <div className={`flex-1 px-4 pb-6 ${isChatExpanded ? 'overflow-y-auto h-full' : ''}`}>

                {/* Main Content Grid: Left (flexible) and Right (fixed 400px) */}
                <div className={gridClass} style={{paddingLeft:"32px",gap:"32px"}}>
                    {/* Left Column: Flexible width - fills remaining space */}
                    <div className={isChatExpanded ? "w-full md:w-[98%] flex flex-col gap-4" : "w-full md:flex-1 flex flex-col"}>
                        <div className={isChatExpanded ? "flex w-full gap-4 items-stretch" : "flex flex-col 2xl:flex-row items-start w-full"} style={{paddingBottom:"32px",gap:"32px"}}>
                            {!isChatExpanded ? (
                                <>
                                    <div className="w-full 2xl:w-[50%]">
                                        <QuickLinks />
                                    </div>

                                    <div className="w-full 2xl:w-[50%]">
                                        <UpcomingApps />
                                    </div>
                                </>
                            ) : (
                                <div className="flex w-full items-start" style={{paddingBottom:"32px"}}>
                                    {/* Left stack: QuickLinks + UpcomingApps on top, OrganisationEngagement below */}
                                    <div className="w-full md:w-[60%] flex flex-col">
                                        <div className="flex flex-col md:flex-row w-full" style={{gap:"32px",paddingBottom:"32px"}}>
                                            <div className="w-full md:w-1/2">
                                                <QuickLinks />
                                            </div>

                                            <div className="w-full md:w-1/2">
                                                <UpcomingApps />
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className="w-full rounded-2xl" style={{padding: '15px', border: '1px solid #e1e1e1'}}>
                                                <div className="bg-transparent rounded-lg p-3">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="md:text-[21px] font-bold text-neutral-800" style={{paddingBottom:"15px"}}>Organisation Engagement</h3>
                                                        <button
                                                            onClick={() => navigate('/engage')}
                                                            className="border-1 border-[#1F89EF] text-[#1F89EF] rounded-full font-semibold text-sm flex items-center gap-2 hover:text-black hover:scale-105 transition-transform"
                                                            style={{ padding: "5px 20px" ,marginBottom:"10px"}}
                                                        >
                                                            <span>Engage</span>
                                                            <img
                                                                src="/Dashboard/Engage.svg"
                                                                alt="Engage"
                                                                className="w-4 h-4"
                                                                style={{ filter: 'invert(34%) sepia(93%) saturate(1539%) hue-rotate(195deg) brightness(92%) contrast(91%)' }}
                                                            />
                                                        </button>
                                                    </div>

                                                    <div className="mt-3">
                                                        <OrganizationEngagement />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Recommended Reads directly under Organisation Engagement in expanded layout */}
                                        <div className="w-full">
                                            <RecommendedSection />
                                        </div>
                                    </div>

                                    {/* Right column: Daily Picks stays independent and won't affect left stack height */}
                                    <div className="w-full md:w-[40%]" style={{paddingLeft:"32px"}}>
                                        <div className="w-full rounded-2xl" style={{padding: '32px', border: '1px solid #e1e1e1'}}>
                                            <div className="bg-transparent rounded-lg p-3" style={{paddingBottom:"32px"}}>
                                                <h3 className="text-[21px] font-semibold" style={{paddingBottom:"10px",marginTop:"3px"}}>Daily Picks</h3>
                                                <div className={isChatExpanded ? "flex flex-col mt-3 items-center" : "flex flex-col md:flex-row  mt-3"} style={{gap:"32px"}}>
                                                    <div className="flex justify-center items-start">
                                                        <div className="w-[120px] md:w-[170px]">
                                                            <TimeWidget />
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-center items-start">
                                                        <div className="w-[120px] md:w-[170px]">
                                                            <HolidayCalendar />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full rounded-2xl mt-3" style={{ border: '1px solid #e1e1e1', marginTop: isChatExpanded ? '32px' : '0px' }}>
                                            <div className="bg-transparent rounded-lg p-3" style={{padding:isChatExpanded?"20px":"0px"}}>
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-md font-semibold" style={{paddingBottom:"10px",marginTop:"3px"}}>Mood Tracker</h3>
                                                </div>
                                                <div className="mt-3">
                                                    <MoodTracker />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {!isChatExpanded && (
                            <div className="mt-4" >
                                <div className="w-full rounded-2xl" style={{padding: '24px', border: '1px solid #e1e1e1'}}>
                                    <div className="bg-transparent rounded-lg p-3">
                                        <div className="flex items-center justify-between" style={{paddingBottom:"10px"}}>
                                            <h3 className="text-base md:text-[21px] font-bold text-neutral-800" style={{paddingBottom:"24px"}}>Organisation Engagement</h3>
                                            <button
                                                onClick={() => navigate('/engage')}
                                                className="border-1 border-[#1F89EF] text-[#1F89EF] rounded-full font-semibold text-sm flex items-center gap-2 hover:text-black transition-transform"
                                                style={{ padding: "5px 20px" ,marginBottom:"10px"}}
                                            >
                                                <span>Engage</span>
                                                <img
                                                    src="/Dashboard/Engage.svg"
                                                    alt="Engage"
                                                    className="w-4 h-4"
                                                    style={{ filter: 'invert(34%) sepia(93%) saturate(1539%) hue-rotate(195deg) brightness(92%) contrast(91%)' }}
                                                />
                                            </button>
                                        </div>

                                        <div className="mt-3">
                                            <OrganizationEngagement />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4" style={{paddingTop:"32px"}}>
                                    <RecommendedSection />
                                </div>
                            </div>
                        )}
                        {/* <div className="flex items-center justify-between">
                            <h3 className="text-base md:text-lg font-bold text-neutral-800">Recommended Reads</h3>
                            <button className="border-2 border-[#073663] text-[#073663] px-4 py-2 rounded font-semibold text-sm hover:bg-blue-50 transition" style={{height: '33px', width: '105px',borderRadius:'25px'}}>
                                Read All
                            </button>
                        </div> */}
                        {/* RecommendedSection is rendered inside the expanded left stack; render here for non-expanded layout instead */}
                        
                    </div>

                    {/* Right Column: Fixed width 400px - hidden when chat expanded */}
                    { !isChatExpanded ? (
                        <div className="hidden md:flex md:flex-col " style={{paddingRight:"20px", width: "440px", minWidth: "440px",gap:"32px"}}>
                                {/* Daily Picks Card moved to right column */}
                                <div className="w-full rounded-2xl" style={{border: '1px solid #e1e1e1',padding:"24px"}}>
                                    <div className="bg-transparent rounded-lg p-3">
                                        <h3 className="text-[21px] font-semibold" style={{paddingBottom:"24px"}}>Daily Picks</h3>
                                        <div className="flex flex-col md:flex-row gap-3 mt-3">
                                            <div className="flex-1 flex justify-center items-start">
                                                <div className="w-[120px] md:w-[170px]">
                                                    <TimeWidget />
                                                </div>
                                            </div>

                                            <div className="flex-1 flex justify-center items-start">
                                                <div className="w-[120px] md:w-[170px]">
                                                    <HolidayCalendar />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full rounded-2xl" style={{ border: '1px solid #e1e1e1'}}>
                                    <div className="bg-transparent rounded-lg p-3" style={{padding:"24px"}}>
                                        <MoodTracker />
                                    </div>
                                </div>
                        </div>
                    ) : (
                        <div className="hidden md:block md:w-[1%]" />
                    )}
                </div>
                </div>
            </div>

            {/* Removed bottom duplicate RecommendedSection — now rendered under OrganisationEngagement for expanded layout */}
            {/* ChatBot is mounted in MainLayout for split-screen behaviour */}
        </div>
    );
};

export default Dashboard;



