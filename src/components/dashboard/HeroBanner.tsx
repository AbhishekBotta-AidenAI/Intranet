import { useState, useEffect } from 'react';
import '../../index.css';

const HeroBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Banner images and content - will be updated with content later
    const banners = [
        {
            image: '/Dashboard/heroBanner/CEOVision.png',
            tag: 'FROM LEADERSHIP',
            title: 'A Bold Vision for 2026 - Discover What\'s Next',
            subtitle: "Explore our CEO’s strategic priorities for 2026: operational excellence, AI transformation, culture-first innovation, and long-term customer impact",
            buttonText: 'READ MORE'
        },
        {
            image: '/Dashboard/heroBanner/coffeeCulture.png',
            tag: 'FROM LEADERSHIP',
            title: 'Coffee Culture at Aiden Ai - Caffeine  Nerds',
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

    

    return (
        <div className="relative w-full h-[160px] overflow-hidden rounded-2xl">
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
                        <div className="text-[10px] md:text-sm font-semibold px-2 md:px-3 py-1 hero-tag">
                            {currentBanner.tag}
                        </div>
                    </div>
                        <h2 className="text-xl md:text-2xl font-semi-bold leading-tight max-w-[36ch] md:max-w-[48ch] whitespace-normal break-words" style={{paddingTop:"10px"}}>
                            <div style={{paddingRight:"61px"}}>{currentBanner.title}</div>
                        </h2>
                </div>

                <div className="flex items-end gap-4 max-w-xl">
                    {currentBanner.subtitle && (
                        <p className="hidden md:block text-[13px] text-white/90 max-w-md">
                            {currentBanner.subtitle}
                        </p>
                    )}

                    <button className="font-medium text-xs md:text-sm transition flex-shrink-0 hero-button">
                        <span>{currentBanner.buttonText}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
