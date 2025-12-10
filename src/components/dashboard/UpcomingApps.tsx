const UpcomingApps = () => {
    const apps = [
        { icon: '/Dashboard/AidenTech.png', label: 'Aiden Tech', color: 'bg-orange-500' },
        { icon: '/Dashboard/AidenBot.png', label: 'Aiden Bot', color: 'bg-green-500' },
        { icon: '/Dashboard/AidenLearn.png', label: 'Aiden Learn', color: 'bg-blue-500' },
        { icon: '/Dashboard/TimeSheets.png', label: 'Timesheets', color: 'bg-primary' },
        { icon: '/Dashboard/people.svg', label: 'People', color: 'bg-cyan-500' },
    ];

    return (
        <div className="w-full max-w-full md:max-w-[370px] rounded-2xl" style={{padding: "10px 5px 12px 10px",border:"1px solid #e1e1e1" }}>
            <div className="bg-transparent rounded-lg p-3">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Upcoming On The App</h3>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3 items-center justify-items-center" style={{padding:"10px"}}>
                        {apps.map((app, index) => (
                            <button
                                key={index}
                                className="flex flex-col items-center gap-1 hover:scale-105 transition-transform w-full"
                                style={{maxWidth: 80}}
                            >
                                <div className={`w-8 h-8 md:w-10 md:h-10 ${app.color} rounded-lg flex items-center justify-center text-white shadow-md p-1`}>
                                    <img 
                                        src={app.icon} 
                                        alt={app.label}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-[9px]  text-black font-medium text-center truncate w-full">
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
