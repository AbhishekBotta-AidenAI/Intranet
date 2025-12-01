interface RecommendationItem {
    title: string;
    description: string;
    stats: string;
    image: string;
}

const RecommendedSection = () => {
    const recommendations: RecommendationItem[] = [
        {
            title: 'Trending In Digital Accelerators',
            description: 'We are currently experiencing a rise in digital solution...',
            stats: '1 month ago | 24 Impressions',
            image: '/Dashboard/DigitalAccelerator.svg',
        },
        {
            title: 'From Ideas to Solutions',
            description: 'We are currently experiencing a rise in digital solution...',
            stats: '1 month ago | 24 Impressions',
            image: '/Dashboard/IdeatoSolution.png',
        },
        {
            title: 'AideNexus: What it Stands for',
            description: 'We are currently experiencing a rise in digital solution...',
            stats: '1 month ago | 24 Impressions',
            image: '/Dashboard/AideNexus.png',
        },
        {
            title: 'About Employee Culture',
            description: 'We are currently experiencing a rise in digital solution...',
            stats: '1 month ago | 24 Impressions',
            image: '/Dashboard/culture.png',
        },
    ];

    return (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm" style={{padding:"20px"}}>
            {/* HEADER WITH FOR YOU AND READ ALL */}
            <div className="flex justify-between items-center mb-6">
                <span className="text-[16px] font-semibold text-neutral-900">
                    For You
                </span>
                <button className="text-[12px] font-medium text-blue-600 hover:text-blue-700 transition">
                    READ ALL
                </button>
            </div>

            {/* RECOMMENDED ITEMS */}
            <div className="space-y-4">
                {recommendations.map((item, index) => (
                    <div
                        key={index}
                        className="
                            flex gap-4 p-3 rounded-xl 
                            hover:bg-neutral-50 transition cursor-pointer
                        "
                        style={{paddingBottom:"10px",paddingTop:"10px"}}
                    >
                        
                        {/* IMAGE */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />

                        {/* TEXT CONTENT */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[14px] font-semibold text-neutral-900 leading-tight mb-1">
                                {item.title}
                            </h4>

                            <p className="text-[12px] text-neutral-600 leading-tight line-clamp-2 mb-2">
                                {item.description}
                            </p>

                            <p className="text-[11px] text-neutral-400">
                                {item.stats}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedSection; 