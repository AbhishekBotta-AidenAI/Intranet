interface RecommendationItem {
    title: string;
    description: string;
    stats: string;
    image: string;
    link:string;
}

const RecommendedSection = () => {
    const recommendations: RecommendationItem[] = [
        {
            title: 'AI at Work: Momentum Builds, but Gaps Remain (2025)',
            description: 'AI adoption is accelerating, but organizations struggle with uneven readiness and capability gaps.',
            stats: '2025 Report | 12k Impressions',
            image: '/Dashboard/DigitalAccelerator.svg',
            link:'https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain?utm_source=chatgpt.com'
        },
        {
            title: 'How Does AI Transform Cyber Risk Management?',
            description: 'AI reshapes cyber defense by enhancing threat detection, response speed, and predictive risk analysis.',
            stats: 'Research Article | 8.4k Impressions',
            image: '/Dashboard/IdeatoSolution.png',
            link:'https://www.mdpi.com/2079-8954/13/10/835?utm_source=chatgpt.com'
        },
        {
            title: 'AI in the Workplace: A Systematic Review of Skill Transformation in the Industry',
            description: 'A broad review of how AI is changing workforce skill requirements across modern industries.',
            stats: 'Systematic Review | 10.1k Impressions',
            image: '/Dashboard/AideNexus.png',
            link:'https://www.mdpi.com/2076-3387/14/6/127?utm_source=chatgpt.com'
        },
        // {
        //     title: 'About Employee Culture',
        //     description: 'We are currently experiencing a rise in digital solution...',
        //     stats: '1 month ago | 24 Impressions',
        //     image: '/Dashboard/culture.png',
        // },
    ];

    return (
        <div className="bg-white rounded-2xl md:rounded-2xl border border-neutral-200 p-4 md:p-7 flex-1" style={{ padding: "16px",marginBottom:"35px" }}>
            {/* RECOMMENDED ITEMS */}
             <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[21px] text-neutral-800">Recommended Reads</h3>
                <button className="text-black font-semibold bg-[#F4F4F4] px-4 py-2 rounded-[25px] font-['Mulish'] text-[10px] h-[33px] w-[105px]">
                        READ ALL
                </button>
            </div>
            <div className="space-y-2 md:space-y-4">
                {recommendations.map((item, index) => (
                    <div
                        key={index}
                        role="link"
                        tabIndex={0}
                        onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.open(item.link, '_blank', 'noopener,noreferrer'); } }}
                        className="
                            flex gap-3 md:gap-4 p-2 md:p-3 rounded-lg md:rounded-xl 
                            hover:bg-neutral-50 transition cursor-pointer
                        "
                        style={{ paddingBottom: "8px", paddingTop: "20px" }}
                    >

                        {/* IMAGE */}
                        <img
                            src={item.image}
                            alt={item.title}    
                            className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover flex-shrink-0"
                        />

                        {/* TEXT CONTENT */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[12px] md:text-[14px] font-semibold text-neutral-900 leading-tight mb-1">
                                {item.title}
                            </h4>

                            <p className="text-[10px] md:text-[12px] text-neutral-600 leading-tight line-clamp-2 mb-1">
                                {item.description}
                            </p>

                            <p className="text-[9px] md:text-[11px] text-neutral-900 font-semibold">
                                {item.stats}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button
            <div className="flex justify-end mt-3 md:mt-4" >
                <button
                    className="text-[10px] md:text-[12px] font-bold text-[#073663] border border-[#073663] rounded-lg md:rounded-xl px-3 md:px-4 py-1 uppercase hover:bg-[#073663] hover:text-white transition"
                    style={{ paddingLeft: "8px", paddingRight: "8px", paddingTop: "2px", paddingBottom: "2px" }}
                >
                    VIEW ALL
                </button>
            </div> */}
        </div>
    );
};

export default RecommendedSection;