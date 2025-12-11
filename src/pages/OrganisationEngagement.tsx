import { useState } from 'react';
import posts from '../data/organisationPosts';

const formatDate = (iso?: string) => {
    if (!iso) return '';
    try {
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return '';
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
    } catch {
        return '';
    }
};

const OrganisationEngagement = () => {
    const [activeTab, setActiveTab] = useState<'policies' | 'holidays'>('policies');

    return (
        <div className="w-full min-h-screen px-6 py-6" style={{ padding: "0 25px 50px 25px", backgroundColor: '#EBF5FF' }}>
            
            {/* =========================
                 BANNER + TABS
            ========================== */}
            <div className="relative w-full h-[150px] md:h-[150px] overflow-hidden rounded-b-3xl">
                <img 
                    src="/Organisation/OrgBanner.png" 
                    alt="HR Banner" 
                    className="w-full h-full object-cover" 
                />

                <div className="absolute inset-0 bg-black/30"></div>

                {/* TABS ON BOTTOM OF BANNER */}
                <div className="absolute bottom-0 left-12 w-full px-6 flex gap-3 pb-2"  >

                    {/* Policies */}
                    <button
                        onClick={() => setActiveTab('policies')}
                        style={{padding:"10px"}}
                        className={`px-4 py-1 rounded-t-lg text-[14px] transition-all 
                            ${activeTab === 'policies' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-white'}`}
                    >
                        Announcements & Polls
                    </button>

                    {/* Holiday Calendar
                    <button
                        onClick={() => setActiveTab('holidays')}
                        style={{padding:"10px"}}
                        className={`px-4 py-1 rounded-t-lg text-[14px] transition-all 
                            ${activeTab === 'holidays' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-white'}`}
                    >
                        Holiday Calendar
                    </button> */}

                </div>
            </div>

            {/* =========================
                 MAIN CONTENT WRAPPER
            ========================== */}
            <div className="bg-white rounded-2xl shadow-md p-6 mt-6" style={{marginTop:"30px",padding:"20px"}}>

                {/* Greeting */}
                <div>
                    <h3 className="text-[25px] font-medium">
                        Hey, <span className="text-[#1F89EF]">Vaishno</span>
                    </h3>

                    <p className="text-black/60 text-[12px] pb-4">
                        Welcome To Organisation Engagement
                    </p>
                </div>

                {/* =========================
                     CREATE POST CARD
                ========================== */}
                <div className="bg-white rounded-xl p-4 mb-6 " style={{padding:"20px",marginBottom:"40px",marginTop:"20px", border: '1px solid #E1E1E1'}}>
                    <div className="flex items-center gap-3 mb-3" style={{paddingBottom:"15px"}}>
                        <img 
                            src="/Dashboard/UserPic.png" 
                            className="w-13 h-13 rounded-full border"
                        />
                        <input 
                            placeholder="Share something with your organization…" 
                            className="flex-1 p-2  text-sm focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #E1E1E1' }}>
                        <div className="flex gap-4 text-gray-500" style={{paddingTop:"10px"}}>
                            <button className="flex items-center gap-2 hover:text-black">
                                <img src="/Organisation/announcements.png" alt="Announcement" className="w-4 h-4" />
                                <span>Announcement</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-black">
                                <img src="/Organisation/Discussion.png" alt="Discussion" className="w-4 h-4" />
                                <span>Discussion</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-black">
                                <img src="/Organisation/polls.png" alt="Poll" className="w-4 h-4" />
                                <span>Poll</span>
                            </button>
                        </div>

                        {/* <button className="flex items-center gap-1 bg-[#1F89EF] text-white px-4 py-1.5 rounded-lg hover:bg-blue-600">
                            Post <Send size={16}/>
                        </button> */}
                    </div>
                </div>

                {/* =========================
                     POST CARDS LIST
                ========================== */}
                
                <div className="text-[20px] font-semibold mb-4" style={{padding:"0px 0px 20px 0px"}}>Newsfeed</div>

                <div className="space-y-6">
                    {posts.map((p) => (
                        <div key={p.id} className="bg-white border rounded-xl p-4 shadow-sm"  style={{border: '1px solid #E1E1E1' ,padding:"20px",marginBottom:"30px"}}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3"> 
                                    <img src={p.avatar ?? '/profile.png'} className="w-10 h-10 rounded-full"/>
                                    <div>
                                        <p className="font-semibold text-sm">{p.author} | {p.role}</p>
                                        <p className="text-[12px] text-gray-500">{formatDate(p.CreatedOn)}</p>
                                    </div>
                                </div>
                            </div>


                            <p className="text-sm mt-3" style={{padding:"20px 0px 20px 0px"}}>{p.text}</p>
                            {p.image && (
                                <div className="mt-4">
                                    <img src={p.image} className="rounded-xl w-full" />
                                </div>
                            )}

                            <div style={{ borderTop: '1px solid #E1E1E1', marginTop: 4 ,marginBottom:16}} />

                            <div className="flex justify-start text-gray-600 mt-4 text-sm" >
                                <button className="flex items-center gap-2 hover:text-blue-600" style={{paddingRight:"20px"}}>
                                    <img src="/Organisation/like.png" alt="Like" className="w-4 h-4" />
                                    <span className='font-semibold text-black'>Like</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-blue-600" style={{paddingRight:"20px"}}>
                                    <img src="/Organisation/comment.png" alt="Comment" className="w-4 h-4" />
                                    <span className='font-semibold text-black'> Comment</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-blue-600">
                                    <img src="/Organisation/share.png" alt="Share" className="w-4 h-4" />
                                    <span className='font-semibold text-black' > Share</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default OrganisationEngagement;
