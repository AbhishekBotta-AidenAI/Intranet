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
        <div className="bg-white rounded-md md:rounded-md border border-neutral-200 p-4 md:p-7 shadow-sm flex-1" style={{ padding: "16px" }}>
            {/* RECOMMENDED ITEMS */}
            <div className="space-y-2 md:space-y-4">
                {recommendations.map((item, index) => (
                    <div
                        key={index}
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