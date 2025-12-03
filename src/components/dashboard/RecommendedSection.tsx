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
        // {
        //     title: 'About Employee Culture',
        //     description: 'We are currently experiencing a rise in digital solution...',
        //     stats: '1 month ago | 24 Impressions',
        //     image: '/Dashboard/culture.png',
        // },
    ];

    return (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex-1" style={{ padding: "20px" }}>
            {/* RECOMMENDED ITEMS */}
            <div className="space-y-4">
                {recommendations.map((item, index) => (
                    <div
                        key={index}
                        className="
                            flex gap-3 p-2 rounded-xl 
                            hover:bg-neutral-50 transition cursor-pointer
                        "
                        style={{ paddingBottom: "8px", paddingTop: "8px" }}
                    >

                        {/* IMAGE */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        />

                        {/* TEXT CONTENT */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[12px] font-semibold text-neutral-900 leading-tight mb-1">
                                {item.title}
                            </h4>

                            <p className="text-[10px] text-neutral-600 leading-tight line-clamp-2 mb-1">
                                {item.description}
                            </p>

                            <p className="text-[9px] text-neutral-400">
                                {item.stats}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-end mt-4" >
                <button
                    className="text-[12px] font-bold text-[#073663] border border-[#073663] rounded-xl px-4 py-1 uppercase hover:bg-[#073663] hover:text-white transition"
                    style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "2px", paddingBottom: "2px" }}
                >
                    VIEW ALL
                </button>
            </div>
        </div>
    );
};

export default RecommendedSection;