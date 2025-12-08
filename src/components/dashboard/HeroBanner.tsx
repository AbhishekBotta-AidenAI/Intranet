import { useState, useEffect } from 'react';

const HeroBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Banner images and content - will be updated with content later
    const banners = [
        {
            image: '/Dashboard/heroBanner/CEOVision.png',
            tag: 'FROM LEADERSHIP',
            title: 'A Bold Vision for 2026 - Discover What’s Next',
            buttonText: 'READ MORE'
        },
        {
            image: '/Dashboard/heroBanner/coffeeCulture.png',
            tag: 'FROM LEADERSHIP',
            title: 'Coffee Culture at Aiden Ai - Caffiene Nerds',
            buttonText: 'READ MORE'
            },
        {
            image: '/Dashboard/heroBanner/EngagementCommitteOpen.png',
            tag: 'FROM LEADERSHIP',
            title: 'Engagement Committee Open for New Joinees',
            buttonText: 'READ MORE'
        },
        {
            image: '/Dashboard/heroBanner/OngoingCOETeam.png',
            tag: 'FROM AIDEN INTERNAL',
            title: 'On-going with the COE Team: Revolution with Demos',
            buttonText: 'READ MORE'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 2 * 60 * 1000); // 2 minutes in milliseconds

        return () => clearInterval(timer);
    }, [banners.length]);

    const currentBanner = banners[currentIndex];

    const tagStyle = { 
        paddingLeft: '10px', 
        paddingRight: '10px', 
        border: '1px solid #75ff3fff', 
        backgroundColor: '#dbff93ff', 
        color: '#333',
        borderRadius: '10px',
        fontSize: '10px'
    };

    const buttonStyle = { 
        border: '1px solid #75ff3fff', 
        color: '#A7EC1C', 
        backgroundColor: '#A7EC1C24', 
        borderRadius: '8px', 
        paddingBottom: '3px', 
        paddingLeft: '10px', 
        paddingRight: '10px',
        fontSize: '10px'
    };

    return (
        <div className="relative w-full h-[110px] overflow-hidden rounded-b-3xl">
            {/* Background Image - with transition */}
            <img
                src={currentBanner.image}
                className="w-full h-full object-cover transition-opacity duration-500"
                alt="Hero Banner"
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content - with transition */}
            <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 text-white transition-opacity duration-500" style={{paddingLeft:"30px",paddingRight:"30px"}}>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="text-[10px] md:text-sm font-semibold px-2 md:px-3 py-1" style={tagStyle}>
                            {currentBanner.tag}
                        </div>
                    </div>
                    <h2 className="text-sm md:text-base font-semi-bold leading-tight max-w-lg" style={{paddingTop:"10px"}}>
                        {currentBanner.title}
                    </h2>
                </div>

                <button className="font-medium text-xs md:text-sm transition flex-shrink-0" style={buttonStyle}>
                    <span>{currentBanner.buttonText}</span>
                </button>
            </div>
        </div>
    );
};

export default HeroBanner;
