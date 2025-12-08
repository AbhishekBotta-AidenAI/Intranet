const UpcomingApps = () => {
    const apps = [
        { icon: '/Dashboard/AidenTech.png', label: 'Aiden Tech', color: 'bg-orange-500' },
        { icon: '/Dashboard/AidenBot.png', label: 'Aiden Bot', color: 'bg-green-500' },
        { icon: '/Dashboard/AidenLearn.png', label: 'Aiden Learn', color: 'bg-blue-500' },
        { icon: '/Dashboard/TimeSheets.png', label: 'Timesheets', color: 'bg-primary' },
        { icon: '/Dashboard/people.svg', label: 'People', color: 'bg-cyan-500' },
    ];

    return (
        <div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3" >
                {apps.map((app, index) => (
                    <button
                        key={index}
                        className="flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                    >
                        <div className={`w-8 md:w-10 h-8 md:h-10 ${app.color} rounded-lg flex items-center justify-center text-white shadow-md p-1`}>
                            <img 
                                src={app.icon} 
                                alt={app.label}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-[8px] md:text-xs text-neutral-700 font-medium text-center">
                            {app.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UpcomingApps;
