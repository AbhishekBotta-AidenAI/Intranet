import { useState } from 'react';

const MoodTracker = () => {
    const [selectedMood, setSelectedMood] = useState(3);

    const moods = [
        { label: 'Not Great', svg: '/Dashboard/NotGood.svg' },
        { label: 'Okay', svg: '/Dashboard/okay.svg' },
        { label: 'Good', svg: '/Dashboard/Good.svg' },
        { label: 'Awesome!', svg: '/Dashboard/awesome.svg' },
    ];

    return (
        <div className="bg-white border-[5px] border-neutral-200 rounded-2xl px-4 py-3 w-full max-w-[370px] h-[110px] flex flex-col gap-2">
            <div className="flex items-center gap-2" style={{ padding: "5px 10px" }}>
                <h3 className="text-[14px] font-semibold text-neutral-700">
                    How are you feeling today?
                </h3>
            </div>
            <div className="flex justify-between items-end" style={{ paddingLeft: "10px", paddingRight: "10px", paddingBottom: "5px" }}>
                {moods.map((mood, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedMood(index)}
                        className="flex-1 flex flex-col items-center gap-1.5 transition-all hover:opacity-80"
                    >
                        <span className={`text-[9px] font-medium ${selectedMood === index ? 'text-primary' : 'text-neutral-600'}`}>
                            {mood.label}
                        </span>
                        <div
                            className="rounded-full p-3 shadow-sm transition-all"
                            style={{
                                backgroundColor: selectedMood === index ? '#000000' : '#DCDCDC'
                            }}
                        >
                            <img
                                src={mood.svg}
                                alt={mood.label}
                                className="h-6 w-6 object-contain transition-all"
                                style={{
                                    filter: selectedMood === index ? 'brightness(0) saturate(100%) invert(75%) sepia(64%) saturate(453%) hue-rotate(57deg) brightness(106%)' : 'none'
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
