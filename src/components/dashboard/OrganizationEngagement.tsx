import { useState } from "react";
import { Plus, MessageSquare, BarChart2 } from "lucide-react";

const OrganizationEngagement = () => {
    const [activeTab, setActiveTab] = useState("post");

    return (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 mb-6" >

            {/* TAB BAR */}
            <div className="
                bg-white border border-neutral-200 rounded-lg 
                flex items-center overflow-hidden mb-4
                h-[44px]
            "
            style={{padding:"5px"}}>

                {/* POST TAB */}
                <button
                    onClick={() => setActiveTab("post")}
                    className={`
                        flex-1 h-full flex items-center justify-center gap-2 
                        text-sm font-semibold transition rounded-sm
                        ${activeTab === "post"
                            ? "bg-[#002D62] text-white"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }
                    `}
                >
                    <MessageSquare size={16} />
                    Post
                </button>

                {/* POLL TAB */}
                <button
                    onClick={() => setActiveTab("poll")}
                    className={`
                        flex-1 h-full flex items-center justify-center gap-2 
                        text-sm font-semibold transition rounded-sm
                        ${activeTab === "poll"
                            ? "bg-[#002D62] text-white"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }
                    `}
                >
                    <BarChart2 size={16} />
                    Poll
                </button>
            </div>

            {/* TEXT BOX */}
            {/* TEXT INPUT CARD */}
            <div className="
                w-full bg-white 
                border border-neutral-200 
               shadow-sm rounded-lg
                p-4
            ">
                <textarea
                    placeholder="Write your post here..."
                    className="
                        w-full h-[80px]
                        text-sm text-neutral-700
                        focus:outline-none
                        resize-none
                        placeholder:text-neutral-400
                    "
                    style={{padding:"10px"}}
                />
            </div>
        </div>
    );
};

export default OrganizationEngagement;
