import { useState } from 'react';

const MoodTracker = () => {
    const [selectedMood, setSelectedMood] = useState(3);

    const moods = [
        { label: 'Not Great', svg: '/Dashboard/moodTracker/notGreat.svg' },
        { label: 'Okay', svg: '/Dashboard/moodTracker/Okay.svg' },
        { label: 'Good', svg: '/Dashboard/moodTracker/Good.svg' },
        { label: 'Awesome!', svg: '/Dashboard/moodTracker/Awesome.svg' },
    ];

    return (
        <div className="bg-white rounded-lg md:rounded-lg px-3 md:px-4 py-2 md:py-3 w-full max-w-full md:max-w-[370px] h-[100px] md:h-[110px] flex flex-col gap-2">
            <div className="flex items-center gap-2" style={{ padding: "4px 8px" }}>
                <h3 className="text-[12px] md:text-[14px] font-semibold text-neutral-700">
                    Your Mood For The Day ?
                </h3>
            </div>
            <div className="flex justify-between items-end" style={{ paddingLeft: "8px", paddingRight: "8px"}}>
                {moods.map((mood, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedMood(index)}
                        className="flex-1 flex flex-col items-center gap-1 transition-all hover:opacity-80"
                    >
                        
                        <div className="mood-wrapper" style={{ width: 'auto' }}>
                            <div
                                className={`mood-circle flex items-center justify-center transition-all w-8 h-8 md:w-10 md:h-10 rounded-lg ${selectedMood === index ? '' : ''}`}
                                style={{
                                    backgroundColor: selectedMood === index ? '#F0FFDE' : 'transparent',
                                    position: 'relative',
                                    zIndex: 5
                                }}
                            >
                                {selectedMood === index ? (
                                    <div
                                        aria-hidden
                                        className="w-5 h-6 md:w-7 md:h-7"
                                        style={{
                                            backgroundColor: '#4A8403',
                                            WebkitMaskImage: `url(${mood.svg})`,
                                            WebkitMaskRepeat: 'no-repeat',
                                            WebkitMaskSize: 'contain',
                                            maskImage: `url(${mood.svg})`,
                                            maskRepeat: 'no-repeat',
                                            maskSize: 'contain',
                                            display: 'inline-block'
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={mood.svg}
                                        alt={mood.label}
                                        className="w-5 h-5 md:w-7 md:h-7 object-contain transition-all"
                                    />
                                )}
                            </div>

                            {/* Hover mask: appears on hover and fills the SVG with #E0FEA5 */}
                            {/* <div
                                className="mood-hover-mask"
                                style={{
                                    WebkitMaskImage: `url(${mood.svg})`,
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskSize: 'contain',
                                    maskImage: `url(${mood.svg})`,
                                    maskRepeat: 'no-repeat',
                                    maskSize: 'contain',
                                    backgroundColor: '#E0FEA5'
                                }}
                            /> */}
                        </div>
                        <span className="text-[10px] md:text-[11px] font-medium text-black" style={{ color: selectedMood === index ? '#095196' : undefined }}>
                            {mood.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodTracker;
