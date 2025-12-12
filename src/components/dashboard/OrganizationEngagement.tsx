import { useState, useRef } from "react";


const OrganizationEngagement = () => {
    const [activeTab, setActiveTab] = useState("post");
    const descRef = useRef<HTMLDivElement | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const attachInputRef = useRef<HTMLInputElement | null>(null);

    const onImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const src = ev.target?.result as string | undefined;
            if (!src) return;
            const imgEl = new Image();
            imgEl.onload = () => {
                const MAX_WIDTH = 800;
                let { width, height } = imgEl;
                if (width > MAX_WIDTH) {
                    const ratio = MAX_WIDTH / width;
                    width = MAX_WIDTH;
                    height = Math.round(height * ratio);
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) ctx.drawImage(imgEl, 0, 0, width, height);
                const outData = canvas.toDataURL('image/jpeg', 0.85);

                const wrapper = document.createElement('div');
                wrapper.style.marginTop = '12px';
                const img = document.createElement('img');
                img.src = outData;
                img.style.maxWidth = '300px';
                img.style.maxHeight = '200px';
                img.style.width = '100%';
                img.style.height = 'auto';
                img.className = 'rounded-xl';
                wrapper.appendChild(img);
                descRef.current?.appendChild(wrapper);
                if (e.target) e.target.value = '';
            };
            imgEl.src = src;
        };
        reader.readAsDataURL(file);
    };

    const onAttachSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const name = file.name;
        const sizeKB = Math.round(file.size / 1024);
        const ext = name.split('.').pop()?.toLowerCase() ?? '';
        const blobUrl = URL.createObjectURL(file);

        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center gap-3 mt-2';

        const icon = document.createElement('div');
        icon.className = 'w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm';
        if (ext === 'pdf') icon.textContent = 'PDF';
        else if (ext === 'doc' || ext === 'docx') icon.textContent = 'DOC';
        else icon.textContent = 'FILE';

        const info = document.createElement('div');
        info.className = 'flex flex-col';

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = name;
        a.textContent = name;
        a.className = 'text-blue-600 underline text-sm';

        const meta = document.createElement('span');
        meta.className = 'text-xs text-gray-500';
        meta.textContent = `${sizeKB} KB`;

        info.appendChild(a);
        info.appendChild(meta);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'ml-3 text-xs text-red-500';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => { try { URL.revokeObjectURL(blobUrl); } catch {} ; wrapper.remove(); };

        wrapper.appendChild(icon);
        wrapper.appendChild(info);
        wrapper.appendChild(removeBtn);

        descRef.current?.appendChild(wrapper);
        if (e.target) e.target.value = '';
    };

    const redirectToOrganisationPage = () => {
        // redirect to the full Organisation Engagement page
        window.location.href = '/engage';
    };

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
                rounded-b-lg
                p-3 md:p-4
            ">
                
                <div
                    ref={descRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="w-full min-h-[100px] md:min-h-[100px] text-xs md:text-sm text-neutral-700 focus:outline-none p-4 rounded placeholder:text-neutral-400"
                    data-placeholder="Write your post here..."
                    style={{ padding: "10px", border: '1px solid transparent' }}
                    onFocus={() => redirectToOrganisationPage()}
                />

               
            </div>

            {/* Decorative Post Button Icon - Bottom Right (20x20 square, centered svg) */}
            <button type="button" aria-label="Send post" className="absolute bottom-3 right-3 w-8 h-8 bg-[#F4F4F4] flex items-center justify-center rounded-md" onClick={() => redirectToOrganisationPage()}>
                <img src="/Dashboard/OrganisationEngagement/send.svg" alt="Post" className="w-4 h-4 object-contain" />
            </button>
        </div>
    );
};

export default OrganizationEngagement;
