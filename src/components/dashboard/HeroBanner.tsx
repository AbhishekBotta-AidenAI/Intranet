import { useState, useEffect } from 'react';

const slides = [
    {
        image: '/Dashboard/Hero.png',
        tag: 'FROM LEADERSHIP',
        title: "CEO's Vision for 2026",
        subtitle: "Building Tomorrow's Workplace Today",
        buttonText: 'READ MORE',
        tagStyle: {paddingLeft: '20px', paddingRight: '20px', border: '3px solid #75ff3fff', backgroundColor: '#D4FF7F', color: '#333'},
        buttonStyle: {border: '2px solid #75ff3fff', color: '#A7EC1C', backgroundColor: '#A7EC1C24', borderRadius:'8px',paddingBottom: '3px', paddingLeft: '20px', paddingRight: '20px'}
    },
    {
        image: '/Dashboard/centerforexcellence.png',
        tag: 'INTERNAL',
        title: 'What is a Demo Launcher?',
        subtitle: 'The Future For The COE Team',
        buttonText: 'TRY NOW',
        tagStyle: {paddingLeft: '20px', paddingRight: '20px', border: '3px solid #75ff3fff', backgroundColor: '#D4FF7F', color: '#333'},
        buttonStyle: {border: '2px solid #75ff3fff', color: '#A7EC1C', backgroundColor: '#A7EC1C24', borderRadius:'8px',paddingBottom: '3px', paddingLeft: '20px', paddingRight: '20px'}
    },
    {
        image: '/Dashboard/CoffeeCulture.png',
        tag: 'CULTURE',
        title: 'Coffee Culture at Aiden AI',
        subtitle: "You're not the only one on a coffee roll! See how others feel about this.",
        buttonText: 'READ MORE',
        tagStyle: {paddingLeft: '20px', paddingRight: '20px', border: '3px solid #75ff3fff', backgroundColor: '#D4FF7F', color: '#333'},
        buttonStyle: {border: '2px solid #75ff3fff', color: '#A7EC1C', backgroundColor: '#A7EC1C24', borderRadius:'8px',paddingBottom: '3px', paddingLeft: '20px', paddingRight: '20px'}
   },
    {
        image: '/Dashboard/engangementCommittee.png',
        tag: 'FROM LEADERSHIP',
        title: 'Engagement Committee Open',
        subtitle: 'Become a part of Aiden Internal, Apply Now',
        buttonText: 'READ MORE',
        tagStyle: {paddingLeft: '20px', paddingRight: '20px', border: '3px solid #75ff3fff', backgroundColor: '#D4FF7F', color: '#333'},
        buttonStyle: {border: '2px solid #75ff3fff', color: '#A7EC1C', backgroundColor: '#A7EC1C24', borderRadius:'8px',paddingBottom: '3px', paddingLeft: '20px', paddingRight: '20px'}
   }
];

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 10000); // 10 seconds

        return () => clearInterval(timer);
    }, []);

    const slide = slides[currentSlide];

    return (
        <div className="relative h-[150px] rounded-[20px] overflow-hidden" style={{padding:"5px"}}>

            {/* Background */}
            <img
                src={slide.image}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Hero Banner"
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col px-10 py-6">

                {/* LEFT */}
                <div className="flex flex-col" style={{padding:"10px"}}>
                    <div className="flex items-center gap-2 mb-4" style={{paddingBottom:"20px",paddingTop:"20px",paddingLeft:"30px"}}>
                        <div className="text-[10px] text-gray-800 rounded-full font-semibold" style={slide.tagStyle}>
                            {slide.tag}
                        </div>
                    </div>
                    <h2 className="text-[20px] leading-tight font-light text-white font-mulish" style={{fontWeight:'500',paddingLeft:"30px"}}>
                        {slide.title}
                    </h2>

                    <p className="text-white/90 text-[15px] font-mulish mt-1" style={{paddingLeft:"30px"}} >
                        {slide.subtitle}
                    </p>
                </div>

                {/* RIGHT BUTTON */}
                <button className="absolute right-10 bottom-4 font-medium text-sm font-mulish transition" style={slide.buttonStyle}>
                    <span style={{fontSize: '8px',paddingBottom: '10px'}}>{slide.buttonText}</span>
                </button>
            </div>
        </div>
    );
};

export default HeroBanner;
