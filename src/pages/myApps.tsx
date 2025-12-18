import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
	'All',
	'Utilities',
	'Project Management',
	'Employee Expenses',
	'IT Desk',
	'Human Resources',
];

const featuredApps = [
	{
		id: 'aiden-demand',
		title: 'Aiden Demand',
		description: 'Simplify Technical Support using Aiden Tech.',
		icon: '/myApps/aidenDemand.png',
		url: 'https://apps.aiden.ai/demand',
	},
	{
		id: 'aiden-demand',
		title: 'Aiden SAP',
		description: 'Simplify Technical Support using Aiden Tech.',
		icon: '/myApps/SAP.png',
		url: 'https://apps.aiden.ai/demand',
	},
	{
		id: 'aiden-bot',
		title: 'Aiden Bot',
		description: 'Simplify Technical Support using Aiden Tech.',
		icon: '/myApps/aidenBot.png',
		url: 'https://apps.aiden.ai/demand',
	},
	{
		id: 'project-tracker',
		title: 'Project Tracker',
		description: 'Simplify Technical Support using Aiden Tech.',
		icon: '/myApps/projectTracker.png',
		url: 'https://apps.aiden.ai/demand',
	},
];

const MyAppsPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<'apps' | 'favorites' | 'requests'>("apps");
	const navigate = useNavigate();

	const getStatusColor = (url?: string) => {
		if (!url) {
			return 'group-hover:bg-red-400';
		}
		if (url.includes('staging')) {
			return 'group-hover:bg-orange-400';
		}
		return 'group-hover:bg-green-400';
	};

	return (
		<div style={{padding:"32px",backgroundColor:"#f0F2F5"}}>
			{/* Top Banner */}
			<div className="relative h-[190px] md:h-[190px] w-full overflow-hidden">
				<img
					src="myApps/myAppsBanner.png"
					alt=""
					className="absolute inset-0 h-[190px] md:h-[190px] object-cover rounded-b-[45px]"
				/>
		        <button
		        	type="button"
		        	onClick={() => navigate(-1)}
		        	className="absolute left-6 top-8 flex items-center gap-2  px-4 py-1.5 text-white text-[12px] font-medium text-white/90 backdrop-blur-sm transition hover:bg-black/60"
		        >
		        	<span aria-hidden="true" className="text-white/60">←</span> Back
		        </button>
				<div className="absolute left-5 top-4 inset-0 flex flex-col items-start justify-center px-6">
					<h1 className="text-white text-[21px] font-semibold">My Apps</h1>
					<p className="text-white/90 text-sm ">
						Explore the tools designed to help you optimize your workflow efficiently.
					</p>
				</div>
				{/* Banner bottom tabs */}
				{/* <div className="absolute left-0 right-0 bottom-0 z-40 flex items-center gap-6 justify-center pb-2">
					{/* APPS TAB */}
					<button
						type="button"
						onClick={() => setActiveTab('apps')}
						className={`px-4 py-1 rounded-t-lg text-[14px] transition-all font-semibold ${activeTab === 'apps' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-black'} shadow`}
						style={{
							padding: "5px 10px 5px 10px",
							borderBottom: activeTab === 'apps' ? '4px solid #909F7E' : 'none',
							boxShadow: activeTab === 'apps' ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
						}}
					>
						My Apps
					</button>
					{/* FAVORITES TAB */}
					<button
						type="button"
						onClick={() => setActiveTab('favorites')}
						className={`px-4 py-1 rounded-t-lg text-[14px] transition-all font-semibold ${activeTab === 'favorites' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-black'} shadow`}
						style={{
							padding: "5px 10px 5px 10px",
							borderBottom: activeTab === 'favorites' ? '4px solid #909F7E' : 'none',
							boxShadow: activeTab === 'favorites' ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
						}}
					>
						Favorites
					</button>
					{/* REQUESTS TAB */}
					<button
						type="button"
						onClick={() => setActiveTab('requests')}
						className={`px-4 py-1 rounded-t-lg text-[14px] transition-all font-semibold ${activeTab === 'requests' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-black'} shadow`}
						style={{
							padding: "5px 10px 5px 10px",
							borderBottom: activeTab === 'requests' ? '4px solid #909F7E' : 'none',
							boxShadow: activeTab === 'requests' ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
						}}
					>
						Requests
					</button>
				{/* </div>       */}
			</div>
			{/* Main content area */}
			<div className="-mt-16 pb-10" style={{ paddingTop: "24px"}}>
				<div className="bg-white rounded-3xl shadow p-8 space-y-5" style={{padding:"32px"}}>
					<p className="text-[25px] font-semibold font-['Mulish'] text-gray-900">
						Hey <span className="text-[#1F89EF] font-['Mulish'] text-[25px]">Vaishno</span>
					</p>
					<p className="text-gray-400 text-sm">Welcome to My Apps</p>
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between" style={{paddingTop:"24px"}}>
						<h2 className="text-[21px] font-semibold text-gray-900">My Apps</h2>
						<div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 w-full md:w-auto">
							<div className="relative hidden md:flex items-center">
                                <div className="absolute left-3 flex items-center pointer-events-none">
                                    <img
                                        src="/Dashboard/searchIcon.png"
                                        className="w-4 h-4"
                                        alt="search"
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search Apps"
                                    // value={searchQuery}
                                    // onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 h-8 w-72 text-sm bg-white border border-[#E6E7E8] rounded-[12px] placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400"
                                    style={{ paddingLeft: "35px" }}
                                />
                            </div>
							<div className="flex items-center gap-2">
								
								<div className="rounded-[12px] border border-gray-200 px-4 py-2 text-sm text-gray-700 flex items-center gap-2 cursor-pointer select-none h-[30px] w-[150px]" style={{padding:"5px"}}>
									<span className="text-black/50" style={{paddingLeft:"10px"}}>Filter By</span>
									{/* <span aria-hidden="true">▾</span> */}
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap gap-3 pt-6" style={{paddingTop:"32px"}}>
						{categories.map((category) => (
							<button
								key={category}
								type="button"
								className="rounded-full border border-gray-400 px-5 py-2 text-black/50 text-sm font-medium  transition hover:border-[#1F89EF] hover:text-white"
                                style={{padding:"8px 20px",backgroundColor:'#F2F2F2'}}
							>
								{category}
							</button>
						))}
					</div>
					<div className="pt-8" style={{paddingTop:"32px"}}>
						<div className="flex flex-wrap gap-7">
							{featuredApps.map((app) => (
								<div
									key={app.id}
									className="group relative flex h-[140px] w-[160px] flex-col items-center justify-between rounded-[15px] border border-gray-200 bg-white p-4 text-center "
								>
									<span
										className={`absolute right-3 top-3 h-3 w-3 rounded-full border border-gray-300 bg-transparent transition-colors ${getStatusColor(app.url)}`}
									/>
									<div className="flex flex-col items-center gap-1" style={{padding:"10px"}}>
										<div className="flex h-full w-full items-center justify-center">
											<img src={app.icon} alt={app.title} className="h-[50px] w-[50px] object-contain" />
										</div>
										<h3 className="text-[14px] font-semibold text-gray-900">{app.title}</h3>
										<p className="text-[12px] text-gray-500">{app.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyAppsPage;
