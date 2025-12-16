// import { useState, useRef, useEffect } from 'react';
// import { postsAPI } from '../services/api';

// const formatDate = (iso?: string) => {
//     if (!iso) return '';
//     try {
//         const d = new Date(iso);
//         if (Number.isNaN(d.getTime())) return '';
//         return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
//     } catch {
//         return '';
//     }
// };

// const OrganisationEngagement = () => {
//     const [activeTab, setActiveTab] = useState<'policies' | 'holidays'>('policies');
//     const [posts, setPosts] = useState<any[]>([]);
//     const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
//     const [commentsMap, setCommentsMap] = useState<Record<number, string>>({});

//     const currentUser = 'Vaishno Medavaram';

//     const refreshPosts = async () => {
//         try {
//             const controller = new AbortController();
//             const res = await postsAPI.listPosts(0, 50, { signal: controller.signal });
//             const postsList = res.posts || [];
//             // initialize likedMap from p.liked_users
//             const map: Record<number, boolean> = {};
//             postsList.forEach((p: any) => {
//                 const liked = Array.isArray(p.liked_users) && p.liked_users.some((u: string) => String(u).toLowerCase() === currentUser.toLowerCase());
//                 map[p.id] = !!liked;
//             });

//             // fetch replies for each post (so comments show)
//             const repliesPromises = postsList.map(async (p: any) => {
//                 try { const r = await postsAPI.listReplies(p.id); return r || []; } catch (e) { return []; }
//             });
//             const repliesArray = await Promise.all(repliesPromises);
//             const enriched = postsList.map((p: any, idx: number) => ({ ...p, replies: repliesArray[idx] || [] }));

//             setPosts(enriched);
//             setLikedMap(map);
//         } catch (err) {
//             console.error('Failed to load posts', err);
//         }
//     };

//     useEffect(() => {
//         // initial load
//         refreshPosts();
//     }, []);

//     const submitComment = async (postId: number) => {
//         const text = (commentsMap[postId] || '').trim();
//         if (!text) return;
//         try {
//             await postsAPI.addReply(postId, 'Vaishno Medavaram', text);
//             // clear input
//             setCommentsMap((m) => ({ ...m, [postId]: '' }));
//             // refresh posts list to show new reply counts / content
//             await refreshPosts();
//         } catch (e) {
//             console.error('Failed to post comment', e);
//             alert('Failed to post comment');
//         }
//     };

//     return (
//         <div className="w-full min-h-screen px-6 py-6" style={{ padding: "0 25px 50px 25px", backgroundColor: '#EBF5FF' }}>
            
//             {/* =========================
//                  BANNER + TABS
//             ========================== */}
//             <div className="relative w-full h-[150px] md:h-[150px] overflow-hidden rounded-b-3xl">
//                 <img 
//                     src="/Organisation/OrgBanner.png" 
//                     alt="HR Banner" 
//                     className="w-full h-full object-cover" 
//                 />

//                 <div className="absolute inset-0 bg-black/30"></div>

//                 {/* TABS ON BOTTOM OF BANNER */}
//                 <div className="absolute bottom-0 left-12 w-full px-6 flex gap-3 pb-2"  >

//                     {/* Policies */}
//                     <button
//                         onClick={() => setActiveTab('policies')}
//                         style={{padding:"10px"}}
//                         className={`px-4 py-1 rounded-t-lg text-[14px] transition-all 
//                             ${activeTab === 'policies' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-white'}`}
//                     >
//                         Announcements & Polls
//                     </button>

//                     {/*
//                         Holiday Calendar
//                         <button
//                             onClick={() => setActiveTab('holidays')}
//                             style={{padding:"10px"}}
//                             className={`px-4 py-1 rounded-t-lg text-[14px] transition-all ${activeTab === 'holidays' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-white'}`}
//                         >
//                             Holiday Calendar
//                         </button>
//                     */}
//                 </div>

//             </div>

//             {/* =========================
//                  MAIN CONTENT WRAPPER
//             ========================== */}
//             <div className="bg-white rounded-2xl shadow-md p-6 mt-6" style={{marginTop:"30px",padding:"20px"}}>

//                 {/* Greeting */}
//                 <div>
//                     <h3 className="text-[25px] font-medium">
//                         Hey, <span className="text-[#1F89EF]">Vaishno</span>
//                     </h3>

//                     <p className="text-black/60 text-[12px] pb-4">
//                         Welcome To Organisation Engagement
//                     </p>
//                 </div>

//                 {/* =========================
//                      CREATE POST CARD
//                 ========================== */}
//                 <div className="bg-white rounded-xl p-4 mb-6 " style={{padding:"20px",marginBottom:"40px",marginTop:"20px", border: '1px solid #E1E1E1'}}>
//                     <Composer />
//                 </div>

//                 {/* =========================
//                      POST CARDS LIST
//                 ========================== */}
                
//                 <div className="text-[20px] font-semibold mb-4" style={{padding:"0px 0px 20px 0px"}}>Newsfeed</div>

//                 <div className="space-y-6">
//                     {/* fetched posts from backend */}
//                     {posts && posts.map((p: any) => {
//                         const imageAtt = (p.attachments || []).find((a: any) => a.is_image);
//                         const otherAtts = (p.attachments || []).filter((a: any) => !a.is_image);
//                         const imgSrc = imageAtt ? postsAPI.attachmentUrl(p.id, imageAtt.id) : null;
//                         return (
//                         <div key={p.id} className="bg-white border rounded-xl p-4 shadow-sm"  style={{border: '1px solid #E1E1E1' ,padding:"20px",marginBottom:"30px"}}>
//                             <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-3"> 
//                                     <img src={'/Dashboard/UserPic.png'} className="w-10 h-10 rounded-full"/>
//                                     <div>
//                                         <p className="font-semibold text-sm">{p.author || 'Unknown Poster'}</p>
//                                         <p className="text-[12px] text-gray-500">{formatDate(p.created_at)}</p>
//                                     </div>
//                                 </div>
//                                 <div className="text-sm text-gray-500">Seen by {p.views_count ?? 0}</div>
//                             </div>

//                             <h4 className="font-medium mt-3" style={{paddingTop:"20px"}}>{p.title}</h4>
//                             {p.description && (() => {
//                                 // remove any data-URL images or preview wrappers that may remain
//                                 let sanitized = String(p.description);
//                                 // remove elements with data-preview="true"
//                                 sanitized = sanitized.replace(/<[^>]*data-preview=["']true["'][^>]*>[\s\S]*?<\/[a-z0-9]+>/gi, '');
//                                 // remove inline data: images
//                                 sanitized = sanitized.replace(/<img[^>]*src=["']data:[^"']*["'][^>]*>/gi, '');
//                                 return (
//                                     <div className="text-sm mt-2" style={{padding:"10px 0px 10px 0px"}} dangerouslySetInnerHTML={{__html: sanitized}} />
//                                 );
//                             })()}

//                             {imgSrc && (
//                                 <div className="mt-4 flex justify-center">
//                                     <img src={imgSrc} alt="Post attachment" className="rounded-xl max-w-full object-contain" style={{maxHeight: 400}} />
//                                 </div>
//                             )}

//                             {otherAtts && otherAtts.length > 0 && (
//                                 <div className="mt-4">
//                                     <div className="text-sm font-semibold mb-2">Attachments</div>
//                                     <ul className="space-y-2">
//                                         {otherAtts.map((a: any) => (
//                                             <li key={a.id} className="flex items-center gap-2">
//                                                 <a
//                                                     href={postsAPI.attachmentUrl(p.id, a.id)}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="text-blue-600 hover:underline text-sm"
//                                                 >
//                                                     {a.filename || 'Download file'}
//                                                 </a>
//                                                 {typeof a.size === 'number' && (
//                                                     <span className="text-xs text-gray-500">{Math.round(a.size / 1024)} KB</span>
//                                                 )}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )}

//                             {/* Render recent replies (comments) */}
//                             {/* {p.replies && p.replies.length > 0 && (
//                                 <div className="mt-4">
//                                     <div className="text-sm font-semibold mb-2">Comments</div>
//                                     <div className="space-y-2">
//                                         {p.replies.map((r: any) => (
//                                             <div key={r.id} className="flex items-start gap-3">
//                                                 <img src="/Dashboard/UserPic.png" className="w-7 h-7 rounded-full" />
//                                                 <div className="bg-gray-50 p-2 rounded-lg">
//                                                     <div className="text-xs text-gray-600 font-semibold">{r.user}</div>
//                                                     <div className="text-sm" dangerouslySetInnerHTML={{ __html: String(r.content) }} />
//                                                     <div className="text-xs text-gray-400">{formatDate(r.created_at)}</div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )} */}

//                             <div style={{ borderTop: '1px solid #E1E1E1', marginTop: 4 ,marginBottom:16}} />

//                             <div className="flex items-center justify-between text-gray-600 mt-4 text-sm">
//                                 <div className="flex items-center gap-4">
//                                     <button
//                                         className={`flex items-center gap-2 ${likedMap[p.id] ? 'text-[#1F89EF]' : 'hover:text-blue-600'}`}
//                                         style={{ paddingRight: "8px", background: 'transparent', border: 'none' }}
//                                         onClick={async () => {
//                                             // optimistic toggle
//                                             setLikedMap((m) => ({ ...m, [p.id]: !m[p.id] }));
//                                             try {
//                                                 await postsAPI.addReaction(p.id, 'Vaishno Medavaram', 'like');
//                                                 // refresh from backend to reflect persisted state
//                                                 await refreshPosts();
//                                             } catch (e) {
//                                                 console.error('Failed to record like', e);
//                                                 // revert optimistic toggle on error
//                                                 setLikedMap((m) => ({ ...m, [p.id]: !m[p.id] }));
//                                             }
//                                         }}
//                                     >
//                                         <svg className="w-4 h-4" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
//                                             <path d="M5.41671 9.74967V22.7497H1.08337V9.74967H5.41671ZM9.75004 22.7497C9.17541 22.7497 8.6243 22.5214 8.21798 22.1151C7.81165 21.7087 7.58337 21.1576 7.58337 20.583V9.74967C7.58337 9.15384 7.82171 8.61217 8.22254 8.22217L15.3509 1.08301L16.4992 2.23134C16.7917 2.52384 16.9759 2.92467 16.9759 3.36884L16.9434 3.71551L15.9142 8.66634H22.75C23.3247 8.66634 23.8758 8.89461 24.2821 9.30094C24.6884 9.70727 24.9167 10.2584 24.9167 10.833V12.9997C24.9167 13.2813 24.8625 13.5413 24.765 13.7905L21.4934 21.428C21.1684 22.208 20.3992 22.7497 19.5 22.7497H9.75004ZM9.75004 20.583H19.5325L22.75 12.9997V10.833H13.2275L14.4517 5.06967L9.75004 9.78217V20.583Z"
//                                                 fill={likedMap[p.id] ? '#1F89EF' : 'currentColor'} />
//                                         </svg>
//                                         <span className={`font-semibold ${likedMap[p.id] ? 'text-[#1F89EF]' : 'text-black'}`}>Like</span>
//                                     </button>
//                                     <button className="flex items-center gap-2 hover:text-blue-600" style={{paddingRight:"8px"}}>
//                                         <img src="/Organisation/comment.png" alt="Comment" className="w-4 h-4" />
//                                         <span className='font-semibold text-black'> Comment</span>
//                                     </button>
//                                     <button className="flex items-center gap-2 hover:text-blue-600">
//                                         <img src="/Organisation/share.png" alt="Share" className="w-4 h-4" />
//                                         <span className='font-semibold text-black' > Share</span>
//                                     </button>
//                                 </div>

//                                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                                     <svg className="w-4 h-4" width="18" height="18" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
//                                         <path d="M5.41671 9.74967V22.7497H1.08337V9.74967H5.41671ZM9.75004 22.7497C9.17541 22.7497 8.6243 22.5214 8.21798 22.1151C7.81165 21.7087 7.58337 21.1576 7.58337 20.583V9.74967C7.58337 9.15384 7.82171 8.61217 8.22254 8.22217L15.3509 1.08301L16.4992 2.23134C16.7917 2.52384 16.9759 2.92467 16.9759 3.36884L16.9434 3.71551L15.9142 8.66634H22.75C23.3247 8.66634 23.8758 8.89461 24.2821 9.30094C24.6884 9.70727 24.9167 10.2584 24.9167 10.833V12.9997C24.9167 13.2813 24.8625 13.5413 24.765 13.7905L21.4934 21.428C21.1684 22.208 20.3992 22.7497 19.5 22.7497H9.75004ZM9.75004 20.583H19.5325L22.75 12.9997V10.833H13.2275L14.4517 5.06967L9.75004 9.78217V20.583Z" fill={likedMap[p.id] ? '#1F89EF' : 'currentColor'} />
//                                     </svg>
//                                     <div className="text-gray-700">{(p.liked_users && p.liked_users.length) ? p.liked_users[p.liked_users.length - 1] : ''}</div>
//                                 </div>
//                             </div>
//                             {/* Comment input (like a search bar) */}
//                             <div className="mt-3" style={{paddingTop:"20px"}}>
//                                 <div className="flex items-center gap-3">
//                                     <img src="/Dashboard/UserPic.png" className="w-8 h-8 rounded-full" />
//                                     <input
//                                         value={commentsMap[p.id] || ''}
//                                         onChange={(e) => setCommentsMap((m) => ({ ...m, [p.id]: e.target.value }))}
//                                         onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitComment(p.id); } }}
//                                         placeholder="Write a comment..."
//                                         className="flex-1 px-4 py-2 border border-[#E1E1E1] rounded-md "
//                                         style={{height:"30px",padding:"10px",backgroundColor:"#F3F3F3"}}
//                                     />
//                                     {/* Enter key posts the comment; no separate button per spec */}
//                                 </div>
//                             </div>
//                         </div>
//                         )
//                     })}
//                 </div>

//             </div>
//         </div>

//     );
// };

// export default OrganisationEngagement;
import { useState, useRef, useEffect } from 'react';
import { postsAPI } from '../services/api';

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
    const [posts, setPosts] = useState<any[]>([]);
    const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
    const [commentsMap, setCommentsMap] = useState<Record<number, string>>({});
    const abortRef = useRef<AbortController | null>(null);

    const currentUser = 'Vaishno Medavaram';

    /* =========================
       OPTIMIZED POSTS FETCH
    ========================== */
    const refreshPosts = async () => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const res = await postsAPI.listPosts(0, 10);

            const postsList = res.posts || [];

            const liked: Record<number, boolean> = {};
            postsList.forEach((p: any) => {
                liked[p.id] =
                    Array.isArray(p.liked_users) &&
                    p.liked_users.some(
                        (u: string) =>
                            String(u).toLowerCase() === currentUser.toLowerCase()
                    );
            });

            setLikedMap(liked);
            setPosts(postsList);
        } catch (err: any) {
            if (err.name !== 'AbortError') {
                console.error('Failed to load posts', err);
            }
        }
    };

    useEffect(() => {
        refreshPosts();
        return () => abortRef.current?.abort();
    }, []);

    /* =========================
       OPTIMIZED COMMENT
    ========================== */
    const submitComment = async (postId: number) => {
        const text = (commentsMap[postId] || '').trim();
        if (!text) return;

        // optimistic UI
        setPosts((prev) =>
            prev.map((p) =>
                p.id === postId
                    ? { ...p, reply_count: (p.reply_count || 0) + 1 }
                    : p
            )
        );
        setCommentsMap((m) => ({ ...m, [postId]: '' }));

        try {
            await postsAPI.addReply(postId, currentUser, text);
        } catch (e) {
            console.error('Failed to post comment', e);
        }
    };

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

                    {/*
                        Holiday Calendar
                        <button
                            onClick={() => setActiveTab('holidays')}
                            style={{padding:"10px"}}
                            className={`px-4 py-1 rounded-t-lg text-[14px] transition-all ${activeTab === 'holidays' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-white'}`}
                        >
                            Holiday Calendar
                        </button>
                    */}
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
                    <Composer />
                </div>

                {/* =========================
                     POST CARDS LIST
                ========================== */}
                
                <div className="text-[20px] font-semibold mb-4" style={{padding:"0px 0px 20px 0px"}}>Newsfeed</div>

                <div className="space-y-6">
                    {/* fetched posts from backend */}
                    {posts && posts.slice(0, 10).map((p: any) => {
                        const imageAtt = (p.attachments || []).find((a: any) => a.is_image);
                        const otherAtts = (p.attachments || []).filter((a: any) => !a.is_image);
                        const imgSrc = imageAtt ? postsAPI.attachmentUrl(p.id, imageAtt.id) : null;
                        return (
                        <div key={p.id} className="bg-white border rounded-xl p-4 shadow-sm"  style={{border: '1px solid #E1E1E1' ,padding:"20px",marginBottom:"30px"}}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3"> 
                                    <img src={'/Dashboard/UserPic.png'} className="w-10 h-10 rounded-full"/>
                                    <div>
                                        <p className="font-semibold text-sm">{p.author || 'Unknown Poster'}</p>
                                        <p className="text-[12px] text-gray-500">{formatDate(p.created_at)}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">Seen by {p.views_count ?? 0}</div>
                            </div>

                            <h4 className="font-medium mt-3" style={{paddingTop:"20px"}}>{p.title}</h4>
                            {p.description && (() => {
                                // remove any data-URL images or preview wrappers that may remain
                                let sanitized = String(p.description);
                                // remove elements with data-preview="true"
                                sanitized = sanitized.replace(/<[^>]*data-preview=["']true["'][^>]*>[\s\S]*?<\/[a-z0-9]+>/gi, '');
                                // remove inline data: images
                                sanitized = sanitized.replace(/<img[^>]*src=["']data:[^"']*["'][^>]*>/gi, '');
                                return (
                                    <div className="text-sm mt-2" style={{padding:"10px 0px 10px 0px"}} dangerouslySetInnerHTML={{__html: sanitized}} />
                                );
                            })()}

                            {imgSrc && (
                                <div className="mt-4 flex justify-center">
                                    {/* <img src={imgSrc} alt="Post attachment" className="rounded-xl max-w-full object-contain" style={{maxHeight: 400}} /> */}
                                    <img
                                            src={imgSrc}
                                            alt="Post attachment"
                                            loading="lazy"
                                            decoding="async"
                                            className="rounded-xl max-w-full object-contain"
                                            style={{ maxHeight: 400 }}
                                        />
                                </div>
                            )}

                            {otherAtts && otherAtts.length > 0 && (
                                <div className="mt-4">
                                    <div className="text-sm font-semibold mb-2">Attachments</div>
                                    <ul className="space-y-2">
                                        {otherAtts.map((a: any) => (
                                            <li key={a.id} className="flex items-center gap-2">
                                                <a
                                                    href={postsAPI.attachmentUrl(p.id, a.id)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline text-sm"
                                                >
                                                    {a.filename || 'Download file'}
                                                </a>
                                                {typeof a.size === 'number' && (
                                                    <span className="text-xs text-gray-500">{Math.round(a.size / 1024)} KB</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Render recent replies (comments) */}
                            {/* {p.replies && p.replies.length > 0 && (
                                <div className="mt-4">
                                    <div className="text-sm font-semibold mb-2">Comments</div>
                                    <div className="space-y-2">
                                        {p.replies.map((r: any) => (
                                            <div key={r.id} className="flex items-start gap-3">
                                                <img src="/Dashboard/UserPic.png" className="w-7 h-7 rounded-full" />
                                                <div className="bg-gray-50 p-2 rounded-lg">
                                                    <div className="text-xs text-gray-600 font-semibold">{r.user}</div>
                                                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: String(r.content) }} />
                                                    <div className="text-xs text-gray-400">{formatDate(r.created_at)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}  */}

                            <div style={{ borderTop: '1px solid #E1E1E1', marginTop: 4 ,marginBottom:16}} />

                            <div className="flex items-center justify-between text-gray-600 mt-4 text-sm">
                                <div className="flex items-center gap-4">
                                    <button
                                        className={`flex items-center gap-2 ${likedMap[p.id] ? 'text-[#1F89EF]' : 'hover:text-blue-600'}`}
                                        style={{ paddingRight: "8px", background: 'transparent', border: 'none' }}
                                        onClick={async () => {
                                            const wasLiked = likedMap[p.id];
                                            setLikedMap((m) => ({ ...m, [p.id]: !wasLiked }));

                                            setPosts(prev =>
                                                prev.map(post =>
                                                    post.id === p.id
                                                        ? {
                                                            ...post,
                                                            like_count: (post.like_count || 0) + (wasLiked ? -1 : 1)
                                                        }
                                                        : post
                                                )
                                            );

                                            try {
                                                await postsAPI.addReaction(p.id, 'Vaishno Medavaram', 'like');
                                            } catch (e) {
                                                // rollback on failure
                                                setLikedMap((m) => ({ ...m, [p.id]: wasLiked }));
                                            }
                                        }}

                                    >
                                        <svg className="w-4 h-4" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                            <path d="M5.41671 9.74967V22.7497H1.08337V9.74967H5.41671ZM9.75004 22.7497C9.17541 22.7497 8.6243 22.5214 8.21798 22.1151C7.81165 21.7087 7.58337 21.1576 7.58337 20.583V9.74967C7.58337 9.15384 7.82171 8.61217 8.22254 8.22217L15.3509 1.08301L16.4992 2.23134C16.7917 2.52384 16.9759 2.92467 16.9759 3.36884L16.9434 3.71551L15.9142 8.66634H22.75C23.3247 8.66634 23.8758 8.89461 24.2821 9.30094C24.6884 9.70727 24.9167 10.2584 24.9167 10.833V12.9997C24.9167 13.2813 24.8625 13.5413 24.765 13.7905L21.4934 21.428C21.1684 22.208 20.3992 22.7497 19.5 22.7497H9.75004ZM9.75004 20.583H19.5325L22.75 12.9997V10.833H13.2275L14.4517 5.06967L9.75004 9.78217V20.583Z"
                                                fill={likedMap[p.id] ? '#1F89EF' : 'currentColor'} />
                                        </svg>
                                        <span className={`font-semibold ${likedMap[p.id] ? 'text-[#1F89EF]' : 'text-black'}`}>Like</span>
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-blue-600" style={{paddingRight:"8px"}}>
                                        <img src="/Organisation/comment.png" alt="Comment" className="w-4 h-4" />
                                        <span className='font-semibold text-black'> Comment</span>
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-blue-600">
                                        <img src="/Organisation/share.png" alt="Share" className="w-4 h-4" />
                                        <span className='font-semibold text-black' > Share</span>
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="w-4 h-4" width="18" height="18" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                        <path d="M5.41671 9.74967V22.7497H1.08337V9.74967H5.41671ZM9.75004 22.7497C9.17541 22.7497 8.6243 22.5214 8.21798 22.1151C7.81165 21.7087 7.58337 21.1576 7.58337 20.583V9.74967C7.58337 9.15384 7.82171 8.61217 8.22254 8.22217L15.3509 1.08301L16.4992 2.23134C16.7917 2.52384 16.9759 2.92467 16.9759 3.36884L16.9434 3.71551L15.9142 8.66634H22.75C23.3247 8.66634 23.8758 8.89461 24.2821 9.30094C24.6884 9.70727 24.9167 10.2584 24.9167 10.833V12.9997C24.9167 13.2813 24.8625 13.5413 24.765 13.7905L21.4934 21.428C21.1684 22.208 20.3992 22.7497 19.5 22.7497H9.75004ZM9.75004 20.583H19.5325L22.75 12.9997V10.833H13.2275L14.4517 5.06967L9.75004 9.78217V20.583Z" fill={likedMap[p.id] ? '#1F89EF' : 'currentColor'} />
                                    </svg>
                                    <div className="text-gray-700">{(p.liked_users && p.liked_users.length) ? p.liked_users[p.liked_users.length - 1] : ''}</div>
                                </div>
                            </div>
                            {/* Comment input (like a search bar) */}
                            <div className="mt-3" style={{paddingTop:"20px"}}>
                                <div className="flex items-center gap-3">
                                    <img src="/Dashboard/UserPic.png" className="w-8 h-8 rounded-full" />
                                    <input
                                        value={commentsMap[p.id] || ''}
                                        onChange={(e) => setCommentsMap((m) => ({ ...m, [p.id]: e.target.value }))}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitComment(p.id); } }}
                                        placeholder="Write a comment..."
                                        className="flex-1 px-4 py-2 border border-[#E1E1E1] rounded-md "
                                        style={{height:"30px",padding:"10px",backgroundColor:"#F3F3F3"}}
                                    />
                                    {/* Enter key posts the comment; no separate button per spec */}
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>

            </div>
        </div>

    );
};

export default OrganisationEngagement;

/* =====================================================
   COMPOSER COMPONENT — UNCHANGED UI, NO RELOAD
===================================================== */

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
        fd.append('author', 'Vaishno Medavaram');

        filesRef.current.forEach((f) => {
            fd.append('files', f, f.name);
        });

        try {
            setIsPosting(true);
            const { postsAPI } = await import('../services/api');
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
            <div className="max-w-[1100px] mx-auto mb-3">
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
            <div className="bg-white rounded-xl p-6 max-w-[1100px] mx-auto font-sans relative">
                <div className="absolute right-0 top-0">
                    <button
                        onClick={handleCancelPoll}
                        className="text-sm text-[#1F89EF]"
                    >
                        <img src="/Organisation/compressIcon.svg" alt="Close" className="w-5 h-5" />
                    </button>
                </div>

                {/* Profile Picture */}
                <div className="flex items-center gap-3 mb-6">
                    <img src="/Dashboard/UserPic.png" className="w-12 h-12 rounded-full border" alt="User" />
                    <div>
                        <p className="text-sm font-medium">Vaishno Medavaram</p>
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
        <div className="bg-white rounded-xl p-6 max-w-[1100px] mx-auto font-sans relative">
            <div className="absolute right-0 top-0 tex-[#1F89EF]" >
                <button
                    onClick={() => setCollapsed(true)}
                    className="text-sm text-[#1F89EF]"
                >
                    <img src="/Organisation/compressIcon.svg" alt="Collapse" className="w-4 h-4 inline-block mr-1" />
                </button>
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
                            <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
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
                            <div className="absolute top-8 left-0 bg-white border rounded-md p-2 shadow z-20 flex items-center gap-2">
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
