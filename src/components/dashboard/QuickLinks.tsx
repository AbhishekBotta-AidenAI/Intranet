// const QuickLinks = () => {
//     const links = [
//         { label: "Payroll", sublabel: "ADP", url: "https://www.adp.com/", bg: '#FF6B0E' },
//         { label: "Time & Attendance", sublabel: "KEKA", url: "https://www.keka.com/", bg: '#7B24EB' },
//         { label: "Wellness", sublabel: "SEQUIOA", url: "https://www.sequoia.com/", bg: '#076363' },
//     ];

//     return (
//         <div className="w-full max-w-full md:max-w-[390px] rounded-2xl" style={{padding:"10px",border:"1px solid #e1e1e1" }}>
//             {/* Single transparent card wrapper */}
//             <div className="bg-transparent rounded-lg p-3">
//                 <div className="flex flex-col gap-2">
//                     <div className="flex items-center justify-between">
//                         <h3 className="text-sm font-semibold">Quick Access</h3>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         {links.map((item, index) => (
//                             <div key={index} className="flex-1 flex flex-col items-start">
//                                 <div>
//                                     <p className="text-[9px] md:text-[10px] text-black font-semibold mb-1" style={{padding: "10px"}}>
//                                         {item.label}
//                                     </p>
//                                 </div>

//                                 <div className="flex flex-col items-start w-full">
//                                     <button
//                                         onClick={() => window.open(item.url, '_blank')}
//                                         className="w-full h-7 text-white text-[10px] md:text-[13px] font-semibold rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition"
//                                         style={{ backgroundColor: item.bg, border: '1px solid rgba(0,0,0,0.08)' }}
//                                     >
//                                         <span style={{ color: '#ffffff', textDecoration: 'underline' }}>{item.sublabel}</span>
//                                         <img src="/Dashboard/LinkArrow.svg" alt="arrow" className="w-3 h-3" />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default QuickLinks;
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const QuickLinks = () => {
    const { isChatExpanded } = useContext(ChatContext);
    const links = [
        { label: "Wellness", sublabel: "Sequoia", url: "https://www.sequoia.com/", bg: '#076363' },
        { label: "Attendance", sublabel: "Keka", url: "https://www.keka.com/", bg: '#7B24EB' },
        { label: "Payroll", sublabel: "ADP", url: "https://www.adp.com/", bg: '#FF6B0E' },
    ];

    const cardStyle = {
        padding: "20px 20px 25px 20px",
        border: "1px solid #e1e1e1",
        minHeight: isChatExpanded ? '320px':"auto"
    };

    return (
        // <div className={`w-full max-w-full md:max-w-[370px] rounded-2xl ${isChatExpanded ? 'h-full' : ''}`} style={cardStyle}>
        <div className={`w-full max-w-full rounded-2xl ${isChatExpanded ? 'h-full' : ''}`} style={cardStyle}>
            <div className="bg-transparent rounded-lg p-3 h-full flex flex-col">
                <div className="flex flex-col gap-2 flex-1" style={{paddingBottom: isChatExpanded ? "20px" : "0px"}}>
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold" style={{paddingBottom: isChatExpanded ? "20px" : "0px"}}>Quick Access</h3>
                    </div>

                    <div className={isChatExpanded ? "flex flex-col gap-3" : "flex items-start gap-3"}>
                        {links.map((item, index) => (
                            <div key={index} className={isChatExpanded ? "w-full flex flex-col items-start gap-2" : "flex-1 flex flex-col items-center"}>
                                
                                {/* FIXED HEIGHT LABEL → prevents button shifting */}
                                <div className={isChatExpanded ? "w-full mb-2" : "h-[32px] flex items-center"} style={{paddingBottom:"10px"}}>
                                    <p className={isChatExpanded ? "text-[11px] text-[#767A8B] font-semibold" : "text-[10px] md:text-[11px] text-[#767A8B] font-semibold leading-tight"}>
                                        {item.label}
                                    </p>
                                </div>

                                {/* BUTTON ALWAYS STARTS AT SAME LINE */}
                                <button
                                    onClick={() => window.open(item.url, '_blank')}
                                    className={isChatExpanded ? "ml-0 w-full h-10 text-white text-[13px] font-semibold rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition" : "w-full h-9 text-white text-[11px] md:text-[13px] font-semibold rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition"}
                                    style={{ backgroundColor: item.bg, border: '1px solid rgba(0,0,0,0.08)', padding: isChatExpanded ? '40px' : '0px' }}
                                >
                                    <span className="text-white hover:underline">{item.sublabel}</span>
                                    <img src="/Dashboard/LinkArrow.svg" alt="arrow" className="w-3 h-3 md:w-4 md:h-4" />
                                </button>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickLinks;
