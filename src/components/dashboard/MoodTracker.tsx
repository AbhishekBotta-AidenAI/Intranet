import { useState } from 'react';

const MoodTracker = () => {
    const [selectedMood, setSelectedMood] = useState(3);

    const moods = [
        { label: 'Not Great', svg: '/Dashboard/notGood.png' },
        { label: 'Okay', svg: '/Dashboard/okay.svg' },
        { label: 'Good', svg: '/Dashboard/Good.svg' },
        { label: 'Awesome!', svg: '/Dashboard/awesome.svg' },
    ];

    return (
        <div className="bg-white rounded-lg md:rounded-lg px-3 md:px-4 py-2 md:py-3 w-full max-w-full md:max-w-[370px] h-[100px] md:h-[110px] flex flex-col gap-2">
            <div className="flex items-center gap-2" style={{ padding: "4px 8px" }}>
                <h3 className="text-[12px] md:text-[14px] font-semibold text-neutral-700">
                    How are you feeling today?
                </h3>
            </div>
            <div className="flex justify-between items-end" style={{ paddingLeft: "8px", paddingRight: "8px", paddingBottom: "4px" }}>
                {moods.map((mood, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedMood(index)}
                        className="flex-1 flex flex-col items-center gap-1 transition-all hover:opacity-80"
                    >
                        <span className={`text-[7px] md:text-[9px] font-medium ${selectedMood === index ? 'text-primary' : 'text-neutral-600'}`}>
                            {mood.label}
                        </span>
                        <div className="mood-wrapper" style={{ width: 'auto' }}>
                            <div
                                className={`mood-circle rounded-full flex items-center justify-center transition-all border border-gray-200 w-6 h-6 md:w-8 md:h-8`}
                                style={{
                                    backgroundColor: selectedMood === index ? '#095299' : '#F3F4F6',
                                    position: 'relative',
                                    zIndex: 5
                                }}
                            >
                                {selectedMood === index ? (
                                    <div
                                        aria-hidden
                                        style={{
                                            width: '18px',
                                            height: '18px',
                                            backgroundColor: '#8FEC1C',
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
                                        className="w-4 h-4 md:w-5 md:h-5 object-contain transition-all"
                                    />
                                )}
                            </div>

                            {/* Hover mask: appears on hover and fills the SVG with #E0FEA5 */}
                            <div
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
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodTracker;
