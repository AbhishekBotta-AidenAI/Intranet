// import { useContext } from 'react';
// import { ChatContext } from '../../context/ChatContext';

// const UpcomingApps = () => {
//     const { isChatExpanded } = useContext(ChatContext);
//     const apps = [
//         { icon: '/Dashboard/AidenTech.png', label: 'Aiden Tech', color: 'bg-orange-500' },
//         { icon: '/Dashboard/AidenBot.png', label: 'Aiden Bot', color: 'bg-green-500' },
//         { icon: '/Dashboard/AidenLearn.png', label: 'Aiden Learn', color: 'bg-blue-500' },
//         { icon: '/Dashboard/TimeSheets.png', label: 'Timesheets', color: 'bg-primary' },
//         { icon: '/Dashboard/people.svg', label: 'People', color: 'bg-cyan-500' },
//     ];

//     return (
//         // <div className={`w-full max-w-full md:max-w-[370px] rounded-2xl ${isChatExpanded ? 'h-full' : ''}`} style={{padding: "16px 5px 12px 20px",border:"1px solid #e1e1e1" }}>
//         // <div className={`w-full max-w-full rounded-2xl ${isChatExpanded ? 'h-full' : ''}`} style={{padding: "24px 5px 7px 14px",border:"1px solid #e1e1e1" }}>
//         <div className={`w-full max-w-full rounded-2xl ${isChatExpanded ? 'h-full' : ''}`} style={{padding: "24px",border:"1px solid #e1e1e1" }}>
//             <div className="bg-transparent rounded-lg p-3 h-full flex flex-col">
//                 <div className="flex flex-col gap-2 flex-1" >
//                     <div className="flex items-center justify-between">
//                         <h3 className="text-[21px] font-semibold" style={{paddingBottom:"24px"}}>Upcoming On The App</h3>
//                     </div>

//                     <div className={isChatExpanded ? "grid grid-cols-1 gap-2 items-start justify-items-start" : "grid grid-cols-3 md:grid-cols-5 items-start justify-items-start"}  style={{gap:"24px"}}>
//                         {apps.map((app, index) => (
//                             <button
//                                 key={index}
//                                 className={isChatExpanded ? "flex flex-col items-center gap-2 hover:scale-105 transition-transform w-full max-w-[120px] p-2" : "flex flex-col items-center gap-1 hover:scale-105 transition-transform w-full"}
//                                 style={isChatExpanded ? {maxWidth: 120} : {maxWidth: 80}}
//                             >
//                                 <div className={isChatExpanded ? `w-12 h-12 ${app.color} rounded-lg flex items-center justify-center text-white p-1` : `w-8 h-8 md:w-10 md:h-10 ${app.color} rounded-lg flex items-center justify-center text-white p-1`}>
//                                     <img 
//                                         src={app.icon} 
//                                         alt={app.label}
//                                         className="w-full h-full object-contain"
//                                     />
//                                 </div>
//                                 <span className={isChatExpanded ? "mt-2 text-sm text-black font-medium text-center" : "text-[9px]  text-black font-medium text-center truncate w-full"}>
//                                     {app.label}
//                                 </span>
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UpcomingApps;
import { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';

const UpcomingApps = () => {
    const { isChatExpanded } = useContext(ChatContext);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 640px)'); // Tailwind sm breakpoint

        const handleChange = () => setIsSmallScreen(mediaQuery.matches);

        handleChange(); // initial check
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const apps = [
        { icon: '/myApps/aidenDemand.png', label: 'Aiden Demand', color: 'bg-orange-500' },
        { icon: '/myApps/aidenBot.png', label: 'Aiden Bot', color: 'bg-green-500' },
        { icon: '/myApps/projectTracker.png', label: 'Project Tracker', color: 'bg-blue-500' },
        { icon: '/Dashboard/TimeSheets.png', label: 'Timesheets', color: 'bg-primary' },
        { icon: '/Dashboard/people.svg', label: 'People', color: 'bg-cyan-500', link: 'https://dev.iapps.aidenai.com:3000/people' },
    ];

    // 🔑 layout rule
    const shouldStackVertically = isChatExpanded && !isSmallScreen;

    return (
        <div
            className="w-full max-w-full rounded-2xl"
            style={{ padding: '24px', border: '1px solid #e1e1e1' }}
        >
            <div className="bg-transparent rounded-lg p-3 h-full flex flex-col">
                <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center justify-between gap-4">
                        <h3 className="text-[21px] font-semibold pb-6" style={{paddingBottom:"22px"}}>
                           My Apps
                        </h3>
                        <button className="text-black font-semibold bg-[#F4F4F4] px-4 py-2 rounded-[25px] font-['Mulish'] text-[10px] h-[33px] w-[105px]" style={{marginBottom:"15px"}} onClick={() => window.location.href = '/myapps'}>
                             READ ALL
                        </button>
                    </div>

                    {/* GRID */}
                    <div
                        className={
                            shouldStackVertically
                                ? 'grid grid-cols-1 gap-4'
                                : 'grid grid-cols-3 sm:grid-cols-5 gap-4'
                        }
                    >
                        {apps.map((app, index) => (
                            <button
                                key={index}
                                type="button"
                                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform w-full"
                                onClick={() => {
                                    if (app.link) {
                                        window.location.href = app.link;
                                    }
                                }}
                                style={app.link ? { cursor: 'pointer' } : { cursor: 'default' }}
                            >
                                <div
                                    className={`${
                                        shouldStackVertically
                                            ? 'w-12 h-12'
                                            : 'w-8 h-8 sm:w-10 sm:h-10'
                                    } ${app.color} rounded-lg flex items-center justify-center text-white p-1`}
                                >
                                    <img
                                        src={app.icon}
                                        alt={app.label}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <span
                                    className={`text-center font-medium ${
                                        shouldStackVertically
                                            ? 'text-sm'
                                            : 'text-[9px] truncate'
                                    }`}
                                >
                                    {app.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingApps;
