import { useState } from "react";


const OrganizationEngagement = () => {
    const [activeTab, setActiveTab] = useState("post");

    return (
        <div className="bg-white border border-neutral-200 rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6 relative" >

            {/* TAB BAR */}
            <div className="
                bg-white border border-neutral-200 rounded-lg 
                flex items-center overflow-hidden mb-3 md:mb-4
                h-[40px] md:h-[44px]
            "
                style={{ padding: "5px" }}>

                {/* POST TAB */}
                <button
                    onClick={() => setActiveTab("post")}
                    className={`
                        flex-1 h-full flex items-center justify-center gap-2 
                        text-xs md:text-sm font-semibold transition rounded-sm
                        ${activeTab === "post"
                            ? "bg-[#002D62] text-white"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }
                    `}
                >
                    Post
                    <img src="/Dashboard/postIcon.png" style={{ width: "14px", height: "14px" }} />
                </button>

                {/* POLL TAB */}
                <button
                    onClick={() => setActiveTab("poll")}
                    className={`
                        flex-1 h-full flex items-center justify-center gap-2 
                        text-xs md:text-sm font-semibold transition rounded-sm
                        ${activeTab === "poll"
                            ? "bg-[#002D62] text-white"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }
                    `}
                >
                    Poll
                    <img src="/Dashboard/PollIcon.png" style={{ width: "14px", height: "14px" }} />
                </button>
            </div>

            {/* TEXT BOX */}
            {/* TEXT INPUT CARD */}
            <div className="
                w-full bg-white 
                border border-neutral-200 
               shadow-sm rounded-lg
                p-3 md:p-4
            ">
                <textarea
                    placeholder="Write your post here..."
                    className="
                        w-full h-[60px] md:h-[80px]
                        text-xs md:text-sm text-neutral-700
                        focus:outline-none
                        resize-none
                        placeholder:text-neutral-400
                    "
                    style={{ padding: "8px" }}
                />
            </div>

            {/* Decorative Post Button Icon - Bottom Right */}
            <div className="absolute bottom-1 right-1 ">
                <img src="/Dashboard/postButton.png" alt="Post" className="w-9 h-9 md:w-9 md:h-9 object-contain" />
            </div>
        </div>
    );
};

export default OrganizationEngagement;
