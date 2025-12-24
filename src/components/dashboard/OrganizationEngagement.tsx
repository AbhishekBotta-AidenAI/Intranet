import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/useAuth";


const OrganizationEngagement = () => {
    // const [activeTab, setActiveTab] = useState("post");
    // const descRef = useRef<HTMLDivElement | null>(null);
    const { user } = useAuth();
    useEffect(() => {
        console.log('[OrganizationEngagement] render - user:', user, 'local user_name:', localStorage.getItem('user_name'));
    }, [user]);
    function Composer() {
        const [title, setTitle] = useState("");
        const [announceType, setAnnounceType] = useState("general");
        const filesRef = useRef<File[]>([]);
        const [isPosting, setIsPosting] = useState(false);
        const descRef = useRef<HTMLDivElement | null>(null);
        const [collapsed, setCollapsed] = useState<boolean>(true);
        const [activeFormats, setActiveFormats] = useState<{
            bold: boolean;
            italic: boolean;
            underline: boolean;
            ulist: boolean;
            olist: boolean;
            block: string | null;
        }>({ bold: false, italic: false, underline: false, ulist: false, olist: false, block: null });
        const [formatDropdownOpen, setFormatDropdownOpen] = useState<boolean>(false);
        const fontSizes = ['12px', '14px', '16px', '18px'];
        const [fontSizeIndex, setFontSizeIndex] = useState<number>(1); // default 14px
        const imageInputRef = useRef<HTMLInputElement | null>(null);
        const attachInputRef = useRef<HTMLInputElement | null>(null);
        // attachments are inserted directly into the editor DOM
        const [showLinkInput, setShowLinkInput] = useState<boolean>(false);
        const [linkInputValue, setLinkInputValue] = useState<string>('');
    
        // Poll-related states
        const [showPoll, setShowPoll] = useState<boolean>(false);
        const [pollQuestion, setPollQuestion] = useState<string>('');
        const [pollOptions, setPollOptions] = useState<string[]>(['', '', '']);
        const [pollExpiryDate, setPollExpiryDate] = useState<string>('');
        const [pollNotifyPeople, setPollNotifyPeople] = useState<boolean>(false);
        const [pollAnonymous, setPollAnonymous] = useState<boolean>(false);
    
        // Helper to execute commands
        const exec = (cmd: string, val?: string) => {
            document.execCommand(cmd, false, val);
            descRef.current?.focus();
            // small delay to let browser update selection/format state
            setTimeout(() => updateActiveFormats(), 50);
        };
    
        const normalizeBlockValue = (v: any): string | null => {
            if (!v) return null;
            const s = String(v).toLowerCase();
            return s.replace(/[^a-z0-9]/g, '');
        };
    
        const updateActiveFormats = () => {
            try {
                const bold = document.queryCommandState('bold');
                const italic = document.queryCommandState('italic');
                const underline = document.queryCommandState('underline');
                const ulist = document.queryCommandState('insertUnorderedList');
                const olist = document.queryCommandState('insertOrderedList');
                const raw = document.queryCommandValue('formatBlock');
                const block = normalizeBlockValue(raw);
                setActiveFormats({ bold, italic, underline, ulist, olist, block });
            } catch (e) {
                // ignore
            }
        };
    
        const handlePost = async () => {
            // build cleaned description (remove preview-only nodes)
            let description = '';
            if (descRef.current) {
                const clone = descRef.current.cloneNode(true) as HTMLElement;
                // remove any preview nodes inserted for local display
                clone.querySelectorAll('[data-preview="true"]').forEach((n) => n.remove());
                description = clone.innerHTML;
            }
            console.log({ title, description, announceType });
    
            // send multipart/form-data to backend
            const fd = new FormData();
            fd.append('title', title);
            fd.append('description', description);
            fd.append('announce_type', announceType);
            // author can be set client-side if you have identity; using TopNavbar name
    
            fd.append('author', user?.name || 'User');
            filesRef.current.forEach((f) => {
                fd.append('files', f, f.name);
            });
    
            try {
                setIsPosting(true);
                // lazy import to avoid circular
                const { postsAPI } = await import('../../services/api');
                await postsAPI.createPost(fd);
                setIsPosting(false);
                // Success: reset UI
                setTitle('');
                if (descRef.current) descRef.current.innerHTML = '';
                setAnnounceType('general');
                setCollapsed(true);
                filesRef.current = [];
                window.location.reload();
            } catch (err: any) {
                setIsPosting(false);
                const msg = err?.response?.data?.detail || err?.message || 'Failed to create post';
                console.error('Create post error', err);
                alert(msg);
            }
        };
    
        // Placeholder removed — image/attachment now use real file inputs
    
        // (no block sync needed; dropdown now controls font size)
    
        const labelForSize = (idx: number) => {
            const size = fontSizes[idx] ?? '14px';
            if (size === '14px') return 'Normal';
            return size;
        };
    
        const applyFontSize = (size: string) => {
            const sel = window.getSelection();
            if (!sel || sel.rangeCount === 0) return;
            const range = sel.getRangeAt(0);
    
            // Helper: decide if node is block-level we care about
            const isBlock = (el: Node | null) => {
                if (!el || el.nodeType !== 1) return false;
                const tag = (el as Element).tagName.toLowerCase();
                return ['p', 'div', 'h1', 'h2', 'li', 'ul', 'ol', 'blockquote'].includes(tag);
            };
    
            if (range.collapsed) {
                // Insert a zero-width space wrapped in a span so subsequent typing inherits size
                const span = document.createElement('span');
                span.style.fontSize = size;
                span.appendChild(document.createTextNode('\u200B'));
                range.insertNode(span);
    
                // place caret inside the span after the ZWSP
                const newRange = document.createRange();
                newRange.setStart(span.firstChild as Node, 1);
                newRange.collapse(true);
                sel.removeAllRanges();
                sel.addRange(newRange);
            } else {
                // If selection spans block-level elements, apply style to those blocks
                let common = range.commonAncestorContainer as Node;
                if (common.nodeType === 3) common = common.parentElement as Node;
    
                const children = Array.from(common.childNodes);
                // find indices where selection starts/ends
                const startIndex = children.findIndex((c) => c.contains(range.startContainer));
                const endIndex = children.findIndex((c) => c.contains(range.endContainer));
    
                if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
                    let applied = false;
                    for (let i = startIndex; i <= endIndex; i++) {
                        const node = children[i];
                        if (isBlock(node)) {
                            (node as HTMLElement).style.fontSize = size;
                            applied = true;
                        }
                    }
                    if (applied) {
                        // done
                        descRef.current?.focus();
                        setTimeout(() => updateActiveFormats(), 50);
                        return;
                    }
                }
    
                // Fallback: wrap extracted inline content in a span
                const frag = range.extractContents();
                const span = document.createElement('span');
                span.style.fontSize = size;
                span.appendChild(frag);
                range.insertNode(span);
    
                // reselect the newly inserted span contents
                const newRange = document.createRange();
                newRange.selectNodeContents(span);
                sel.removeAllRanges();
                sel.addRange(newRange);
            }
    
            descRef.current?.focus();
            setTimeout(() => updateActiveFormats(), 50);
        };
    
        const onImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            // include original image file for upload
            filesRef.current.push(file);
            const reader = new FileReader();
            reader.onload = (ev) => {
                const src = ev.target?.result as string | undefined;
                if (!src) return;
                // Create an image to determine original size
                const imgEl = new Image();
                imgEl.onload = () => {
                    // Resize on client to limit large images and compress
                    const MAX_WIDTH = 800; // max width for uploaded image
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
    
                    // use 0.85 quality for compression (jpeg)
                    const outData = canvas.toDataURL('image/jpeg', 0.85);
                    // insert compressed image directly into the editor DOM (preview only)
                    const wrapper = document.createElement('div');
                    wrapper.setAttribute('data-preview', 'true');
                    wrapper.style.marginTop = '12px';
                    const img = document.createElement('img');
                    img.src = outData;
                    img.style.maxWidth = '300px';
                    img.style.maxHeight = '200px';
                    img.style.alignItems = 'center';
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.style.objectFit = 'contain';
                    img.className = 'rounded-xl';
                    wrapper.appendChild(img);
                    descRef.current?.appendChild(wrapper);
                    descRef.current?.focus();
                    setTimeout(() => updateActiveFormats(), 50);
                };
                imgEl.src = src;
            };
            reader.readAsDataURL(file);
            // clear value so same file can be selected again
            if (e.target) e.target.value = '';
        };
    
        
    
        const onAttachSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            // track file so it can be uploaded with the post
            filesRef.current.push(file);
            const name = file.name;
            const sizeKB = Math.round(file.size / 1024);
            const ext = name.split('.').pop()?.toLowerCase() ?? '';
            const blobUrl = URL.createObjectURL(file);
    
            // Create a nicer attachment block with icon, name, size and remove
            const wrapper = document.createElement('div');
            wrapper.setAttribute('data-preview', 'true');
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
            removeBtn.onclick = () => {
                try { URL.revokeObjectURL(blobUrl); } catch {}
                wrapper.remove();
            };
    
            wrapper.appendChild(icon);
            wrapper.appendChild(info);
            wrapper.appendChild(removeBtn);
    
            descRef.current?.appendChild(wrapper);
            descRef.current?.focus();
            setTimeout(() => updateActiveFormats(), 50);
            if (e.target) e.target.value = '';
        };
    
        const handleAddLink = () => {
            const url = linkInputValue.trim();
            if (!url) return;
            // if selection exists, create link there; otherwise append link at end
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0 && !sel.getRangeAt(0).collapsed) {
                exec('createLink', url);
            } else {
                const aHtml = `<a href="${url}" target="_blank" class="text-blue-600 underline">${url}</a>`;
                document.execCommand('insertHTML', false, aHtml);
            }
            setShowLinkInput(false);
            setLinkInputValue('');
            descRef.current?.focus();
            setTimeout(() => updateActiveFormats(), 50);
        };
    
        const cycleFontSize = () => {
            const next = (fontSizeIndex + 1) % fontSizes.length;
            setFontSizeIndex(next);
            applyFontSize(fontSizes[next]);
        };
    
        
    
        // update formatting state when selection changes
        useEffect(() => {
            document.addEventListener('selectionchange', updateActiveFormats);
            return () => document.removeEventListener('selectionchange', updateActiveFormats);
        }, []);
    
        // Open specific composer mode based on URL param (mode=announcement|poll)
        useEffect(() => {
            try {
                const params = new URLSearchParams(window.location.search);
                const mode = params.get('mode');
                if (mode === 'poll') {
                    setCollapsed(false);
                    setShowPoll(true);
                } else if (mode === 'announcement') {
                    setCollapsed(false);
                    setShowPoll(false);
                }
            } catch {}
        }, []);
    
        if (collapsed) {
            return (
                <div className="w-full mx-auto mb-3">
                    <div className="flex items-center gap-3">
                        <img src="/Dashboard/UserPic.png" className="w-13 h-13 rounded-full border" />
                        <button
                            onClick={() => setCollapsed(false)}
                            className="flex-1 text-left p-2 text-sm text-black/70 bg-white rounded "
                        >
                            Share something with your organization…
                        </button>
                    </div>
    
                    <div className="my-3" style={{ height: 1, backgroundColor: '#E1E1E1' ,margin:"15px 0px 15px 0px"}} aria-hidden="true" />
    
                    <div className="flex items-center gap-4">
                        <button onClick={() => { setCollapsed(false); setAnnounceType('general'); }} className="flex items-center gap-2 hover:text-black text-sm">
                            <img src="/Organisation/announcements.png" alt="Announcement" className="w-4 h-4" />
                            <span>Announcement</span>
                        </button>
                        {/* <button className="flex items-center gap-2 hover:text-black text-sm">
                            <img src="/Organisation/Discussion.png" alt="Discussion" className="w-4 h-4" />
                            <span>Discussion</span>
                        </button> */}
                        <button onClick={() => { setCollapsed(false); setShowPoll(true); }} className="flex items-center gap-2 hover:text-black text-sm">
                            <img src="/Organisation/polls.png" alt="Poll" className="w-4 h-4" />
                            <span>Poll</span>
                        </button>
                    </div>
                </div>
            );
        }
    
        // Poll handlers
        const addPollOption = () => {
            setPollOptions([...pollOptions, '']);
        };
    
        const removePollOption = (index: number) => {
            if (pollOptions.length <= 2) return; // Keep at least 2 options
            setPollOptions(pollOptions.filter((_, i) => i !== index));
        };
    
        const updatePollOption = (index: number, value: string) => {
            const newOptions = [...pollOptions];
            newOptions[index] = value;
            setPollOptions(newOptions);
        };
    
        const handleCancelPoll = () => {
            setShowPoll(false);
            setPollQuestion('');
            setPollOptions(['', '', '']);
            setPollExpiryDate('');
            setPollNotifyPeople(false);
            setPollAnonymous(false);
            setCollapsed(true);
        };
    
        const handlePostPoll = () => {
            console.log({
                question: pollQuestion,
                options: pollOptions.filter(o => o.trim()),
                expiryDate: pollExpiryDate,
                notifyPeople: pollNotifyPeople,
                anonymous: pollAnonymous
            });
            // TODO: Send poll data to backend
            alert('Poll posted!');
            handleCancelPoll();
        };
    
        if (showPoll) {
            return (
                <div className="bg-white rounded-xl p-6 w-full mx-auto font-sans relative">
                    <div className="absolute right-0 top-0">
                        <button
                            onClick={handleCancelPoll}
                            className="text-sm text-[#1F89EF]"
                        >
                            <img src="/Organisation/compressIcon.svg" alt="Close" className="w-5 h-5" />
                        </button>
                    </div>
    
                    {/* Profile Initials Avatar */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-[#1F89EF] flex items-center justify-center text-white text-sm font-semibold">
                            {(user?.name ?? localStorage.getItem('user_name') ?? 'U').split(' ').map(s=>s[0]).join('').slice(0,2)}
                        </div>
                        <div>
                            <p className="text-sm font-medium">{user?.name ?? localStorage.getItem('user_name') ?? 'User'}</p>
                            <p className="text-xs text-gray-500">Creating a poll</p>
                        </div>
                    </div>
    
                    {/* Poll Question */}
                    <div className="mb-6" style={{padding:"20px 0px 5px 10px"}}>
                        <label className="block text-sm font-medium mb-2" style={{paddingBottom:"10px"}}>What is this poll about?</label>
                        <input
                            value={pollQuestion}
                            onChange={(e) => setPollQuestion(e.target.value)}
                            placeholder="Enter poll question"
                            className="w-full p-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            style={{height:"40px",paddingLeft:"10px"}}
                        />
                    </div>
    
                    {/* Poll Options */}
                    <div className="mb-6" style={{padding:"0px 0px 20px 10px"}}>
                        
                        {pollOptions.map((option, index) => (
                            <div key={index} className="flex items-center gap-2 mb-3" style={{paddingTop:"10px"}}>
                                <input
                                    value={option}
                                    onChange={(e) => updatePollOption(index, e.target.value)}
                                    placeholder={`Option ${index + 1}`}
                                    className="w-130 p-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    style={{height:"40px",paddingLeft:"10px"}}
                                />
                                {pollOptions.length > 2 && (
                                    <button
                                        onClick={() => removePollOption(index)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete option"
                                    >
                                        <img src="/Organisation/deleteIcon.svg" alt="Delete option" className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={addPollOption}
                            className="flex items-center gap-2 text-sm text-white bg-[#1F89EF] hover:bg-blue-700 rounded-lg px-4 py-2 mt-2 h-[35px]"
                            style={{padding:"10px 30px 10px 30px",borderRadius:"25px",marginTop:"10px"}}
                        >
                            
                            <span>ADD OPTION</span>
                            <span className="text-[25px]">+</span>
                        </button>
                    </div>
    
                    {/* Poll Expiry Date */}
                    <div className="mb-6" style={{padding:"0px 0px 0px 10px"}}>
                        <label className="block text-sm text-[14px] mb-2" style={{paddingBottom:"10px"}}>Poll expires on</label>
                        <div className="relative w-[520px]">
                            <input
                                type="date"
                                value={pollExpiryDate}
                                onChange={(e) => setPollExpiryDate(e.target.value)}
                                className="w-full p-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                style={{height:"40px",paddingLeft:"10px",paddingRight:"45px"}}
                            />
                            <style>{`
                                input[type="date"]::-webkit-calendar-picker-indicator {
                                    display: none;
                                }
                            `}</style>
                            <img 
                                src="/Organisation/calendarIcon.png" 
                                alt="Calendar" 
                                className="absolute w-5 h-5 cursor-pointer"
                                style={{right:"12px",top:"50%",transform:"translateY(-50%)"}}
                                onClick={(e) => {
                                    const input = (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement);
                                    input?.showPicker?.();
                                }}
                            />
                        </div>
                    </div>
    
                    {/* Checkboxes */}
                    <div className="flex gap-6 mb-6" style={{padding:"20px 0px 0px 10px"}}>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="notifyPeople"
                                checked={pollNotifyPeople}
                                onChange={(e) => setPollNotifyPeople(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="notifyPeople" className="text-sm text-gray-700">Notify people</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="anonymousPoll"
                                checked={pollAnonymous}
                                onChange={(e) => setPollAnonymous(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="anonymousPoll" className="text-sm text-gray-700">Anonymous poll</label>
                        </div>
                    </div>
    
                    <div className="my-3" style={{ height: 1, backgroundColor: '#E1E1E1', margin:"15px 0px 15px 0px" }} />
    
                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleCancelPoll}
                            className="px-6 py-2 text-sm font-medium border-2 border-[#1F89EF] text-[#1F89EF] rounded-lg "
                            style={{paddingLeft:"30px",paddingRight:"30px",height:"35px" ,borderRadius:"25px"}}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePostPoll}
                            className="text-white font-medium px-6 py-2 rounded-md text-sm flex items-center"
                            style={{paddingLeft:"30px",paddingRight:"30px",height:"35px" ,borderRadius:"25px",backgroundColor:"#1F89EF"}}
                        >
                            POST     
                            <img src="/Dashboard/OrganisationEngagement/postdownArrow.svg" alt="Post down arrow" className="ml-2 w-4 h-4 inline-block"  style={{paddingLeft:"5px"}}/>
                        </button>
                    </div>
                </div>
            );
        }
    
        return (
            <div className="bg-white rounded-xl p-6 w-full mx-auto font-sans relative">
                <div className="absolute right-0 top-0 tex-[#1F89EF]" >
                    <button
                        onClick={() => setCollapsed(true)}
                        className="text-sm text-[#1F89EF]"
                    >
                        <img src="/Organisation/compressIcon.svg" alt="Collapse" className="w-4 h-4 inline-block mr-1" />
                    </button>
                </div>  
                <div className="flex items-center gap-3 mb-6" style={{padding:"10px"}}>
                    <div className="w-12 h-12 rounded-full bg-[#000000] flex items-center justify-center text-white font-semibold">
                        {(user?.name ?? localStorage.getItem('user_name') ?? 'U').split(' ').map(s=>s[0]).join('').slice(0,2)}
                    </div>
                    <div>
                        <p className="text-sm font-medium">{user?.name ?? localStorage.getItem('user_name') ?? 'User'}</p>
                        <p className="text-xs text-gray-500">Creating an announcement</p>
                    </div>
                </div>
                {/* Title Input */}
                <div className="mb-4" style={{padding:"30px 0px 5px 10px"}}>
                     <label className="block text-sm font-medium mb-1" >Title</label>
                     <span className="text-xs float-right text-gray-400 mt-1">{title.length}/120</span>
                     <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        style={{height:"40px",paddingLeft:"10px"}}
                        className="w-full p-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                </div>
                
                <label className="block text-sm font-medium mb-2" style={{padding:"10px"}}>Description</label>
                {/* Editor Container */}
                <div className="border border-[#E1E1E1] rounded-lg overflow-hidden" style={{marginLeft:"10px"}}>
    
                    {/* Toolbar */} 
                    <div className="flex items-center gap-3 p-2 bg-[#E0F2FE] border-b border-blue-200" style={{paddingRight:"10px"}}>
                        
                        {/* Dropdown (Normal/Heading) */}
                        <div className="relative mr-2 h-8" style={{padding:"5px"}}>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFormatDropdownOpen((v) => !v);
                                    }}
                                    className={`p-1.5 text-sm bg-transparent flex items-center gap-2 min-w-[100px] justify-between ${activeFormats.block && activeFormats.block !== 'p' ? 'pb-1 border-b-2 border-[#1F89EF]' : ''}`}
                                >
                                    <span>{labelForSize(fontSizeIndex)}</span>
                                </button>
    
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); cycleFontSize(); }}
                                    aria-label="Cycle font size"
                                    className="ml-2 p-1"
                                >
                                    <img src="/Dashboard/OrganisationEngagement/dropdown.svg" alt="cycle" className="w-3 h-3" />
                                </button>
                            </div>
    
                            {formatDropdownOpen && (
                                <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md  z-10">
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => { applyFontSize(fontSizes[0]); setFontSizeIndex(0); setFormatDropdownOpen(false); setTimeout(() => updateActiveFormats(), 50); }}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    >
                                        {fontSizes[0]}
                                    </div>
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => { applyFontSize(fontSizes[1]); setFontSizeIndex(1); setFormatDropdownOpen(false); setTimeout(() => updateActiveFormats(), 50); }}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        style={{ fontSize: '18px', fontWeight: 'bold' }}
                                    >
                                        {fontSizes[1]}
                                    </div>
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => { applyFontSize(fontSizes[2]); setFontSizeIndex(2); setFormatDropdownOpen(false); setTimeout(() => updateActiveFormats(), 50); }}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        style={{ fontSize: '16px', fontWeight: 'bold' }}
                                    >
                                        {fontSizes[2]}
                                    </div>
                                </div>
                            )}
                        </div>
    
                        {/* Hidden file inputs for image and attachment uploads */}
                        <input ref={imageInputRef} type="file" accept="image/*" onChange={onImageSelected} className="hidden" />
                        <input ref={attachInputRef} type="file" onChange={onAttachSelected} className="hidden" />
    
                        {/* Divider */}
                        <div className="w-px h-5 bg-white mx-1"></div>
    
                        <button onClick={() => exec("bold")} className={`p-1.5 text-gray-600 hover:text-gray-900 hover:bg-blue-200/50 rounded transition-colors ${activeFormats.bold ? 'pb-1 border-b-2 border-[#1F89EF]' : ''}`} type="button">
                            <img src="/Dashboard/OrganisationEngagement/Bold.svg" alt="Bold" className="w-4 h-4" />
                        </button>
                        <button onClick={() => exec("italic")} className={`p-1.5 text-gray-600 hover:text-gray-900 hover:bg-blue-200/50 rounded transition-colors ${activeFormats.italic ? 'pb-1 border-b-2 border-[#1F89EF]' : ''}`} type="button">
                            <img src="/Dashboard/OrganisationEngagement/italicise.svg" alt="Italic" className="w-4 h-4" />
                        </button>
                        <div className="relative">
                            <button onClick={() => setShowLinkInput((s) => !s)} className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-blue-200/50 rounded transition-colors" type="button">
                                <img src="/Dashboard/OrganisationEngagement/link.svg" alt="Link" className="w-4 h-4" />
                            </button>
                            {showLinkInput && (
                                <div className="absolute top-8 left-0 bg-white border rounded-md p-2  z-20 flex items-center gap-2">
                                    <input value={linkInputValue} onChange={(e) => setLinkInputValue(e.target.value)} placeholder="https://example.com" className="text-sm p-1 border rounded w-48" />
                                    <button onClick={handleAddLink} className="px-2 py-1 bg-blue-600 text-white rounded text-sm">Add</button>
                                    <button onClick={() => { setShowLinkInput(false); setLinkInputValue(''); }} className="px-2 py-1 text-sm">Cancel</button>
                                </div>
                            )}
                        </div>
    
                        
    
                        {/* Lists & Code Group */}
                        <button onClick={() => exec("insertUnorderedList")} className={`p-1.5 text-gray-600 hover:text-gray-900 hover:bg-blue-200/50 rounded transition-colors ${activeFormats.ulist ? 'pb-1 border-b-2 border-[#1F89EF]' : ''}`} type="button">
                            <img src="/Dashboard/OrganisationEngagement/dotlist.svg" alt="Bulleted list" className="w-4 h-4" />
                        </button>
                        <button onClick={() => exec("insertOrderedList")} className={`p-1.5 text-gray-600 hover:text-gray-900 hover:bg-blue-200/50 rounded transition-colors ${activeFormats.olist ? 'pb-1 border-b-2 border-[#1F89EF]' : ''}`} type="button">
                            <img src="/Dashboard/OrganisationEngagement/numlist.svg" alt="Numbered list" className="w-4 h-4" />
                        </button>
                        <button onClick={() => exec("formatBlock", "pre")} className={`p-1.5 text-gray-600 hover:text-gray-900 hover:bg-blue-200/50 rounded transition-colors ${activeFormats.block === 'pre' ? 'pb-1 border-b-2 border-[#1F89EF]' : ''}`} type="button">
                            <img src="/Dashboard/OrganisationEngagement/code.svg" alt="Code" className="w-4 h-4" />
                        </button>
    
                        
    
                        {/* Media/Extras Group */}
                        <button onClick={() => console.log('emoji picker')} className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-blue-200/50 rounded transition-colors" type="button">
                            <img src="/Dashboard/OrganisationEngagement/emoji.svg" alt="Emoji" className="w-4 h-4" />
                        </button>
                        <button onClick={() => imageInputRef.current?.click()} className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-blue-200/50 rounded transition-colors" type="button">
                            <img src="/Dashboard/OrganisationEngagement/picAttach.svg" alt="Image Upload" className="w-4 h-4" />
                        </button>
                        <button onClick={() => attachInputRef.current?.click()} className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-blue-200/50 rounded transition-colors" type="button">
                            <img src="/Dashboard/OrganisationEngagement/attach.svg" alt="Attachment" className="w-4 h-4" />
                        </button>
    
                    </div>
    
                    {/* Editable Content Area */}
                    <div
                        ref={descRef}
                        contentEditable
                        suppressContentEditableWarning
                        className="min-h-[200px] p-4 text-sm text-gray-800 outline-none leading-relaxed"
                        data-placeholder="Enter Description"
                        style={{padding:"10px"}}
                    ></div>
                </div>
    
                {/* Announcement Type */}
                <div className="mt-4 px-2" style={{padding:"10px"}}>
                    <label className="block mb-2 font-medium text-sm" style={{paddingBottom:"10px"}} >Announcement Type <span className="text-red-500">*</span></label>
    
                    <div className="flex gap-6 text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="announceType"
                                checked={announceType === 'general'}
                                onChange={() => setAnnounceType('general')}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-gray-700">General</span>
                        </label>
    
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="announceType"
                                checked={announceType === 'team'}
                                onChange={() => setAnnounceType('team')}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-gray-700">Team</span>
                        </label>
                    </div>
                </div>
    
                 <div className="my-3" style={{ height: 1, backgroundColor: '#E1E1E1' ,margin:"15px 0px 15px 0px"}} aria-hidden="true" />
                {/* Post Button (Styled as per image reference) */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handlePost}
                        disabled={isPosting}
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors text-sm flex items-center ${isPosting ? 'opacity-60 cursor-not-allowed' : ''}`}
                        style={{paddingLeft:"20px",paddingRight:"20px",height:"30px" ,borderRadius:"25px"}}
                    >
                        {isPosting ? 'Posting...' : 'POST'}
                        <img src="/Dashboard/OrganisationEngagement/postdownArrow.svg" alt="Post down arrow" className="ml-2 w-4 h-4 inline-block" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-neutral-200 rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6 relative" style={{padding:"20px"}}>

            {/* TAB BAR */}
            {/* <div className="
                bg-white border border-neutral-200 rounded-lg 
                flex items-center overflow-hidden mb-3 md:mb-4
                h-[40px] md:h-[44px]
            "
                style={{ padding: "5px" }}> */}

                {/* POST TAB */}
                {/* <button
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
                {/* <button
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
                </button>  */}
                <Composer />
            </div>
        // </div>
    );
};

export default OrganizationEngagement;
