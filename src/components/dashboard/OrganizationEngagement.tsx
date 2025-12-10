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
                        text-xs md:text-sm font-semibold transition rounded-lg
                        ${activeTab === "post"
                            ? "bg-[#1F89EF] text-white"
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
                        text-xs md:text-sm font-semibold transition rounded-lg
                        ${activeTab === "poll"
                            ? "bg-[#1F89EF] text-white"
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
               shadow-sm rounded-b-lg
                p-3 md:p-4
            ">
                <textarea
                    placeholder="Write your post here..."
                    className="
                        w-full h-[100px] md:h-[100px]
                        text-xs md:text-sm text-neutral-700
                        focus:outline-none
                        resize-none
                        placeholder:text-neutral-400
                    "
                    style={{ padding: "20px" }}
                />
            </div>

            {/* Decorative Post Button Icon - Bottom Right (20x20 square, centered svg) */}
            <button type="button" aria-label="Send post" className="absolute bottom-3 right-3 w-8 h-8 bg-[#F4F4F4] flex items-center justify-center rounded-md">
                <img src="/Dashboard/OrganisationEngagement/send.svg" alt="Post" className="w-4 h-4 object-contain" />
            </button>
        </div>
    );
};

export default OrganizationEngagement;
