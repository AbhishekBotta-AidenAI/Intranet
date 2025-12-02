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
        <div className="bg-white border border-neutral-200 rounded-2xl px-4 py-2 h-[90px] flex flex-col justify-between">
            <div className="flex items-center gap-2" style={{padding:"10px"}}>
                <h3 className="text-[13px] font-semibold text-neutral-700">
                    How are you feeling today?  
                </h3>
            </div>
            <div className="flex justify-between" style={{paddingLeft:"10px", paddingRight:"10px", paddingBottom:"10px"}}>
                {moods.map((mood, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedMood(index)}
                        className="flex-1 flex flex-col items-center gap-1 transition-all hover:opacity-80"
                    >
                        <span className={`text-[8px] font-medium ${selectedMood === index ? 'text-primary' : 'text-neutral-600'}`}>
                            {mood.label}
                        </span>
                        <div 
                            className="rounded-full p-3 transition-all"
                            style={{
                                backgroundColor: selectedMood === index ? '#000000' : '#DCDCDC'
                            }}
                        >
                            <img 
                                src={mood.svg} 
                                alt={mood.label} 
                                className="h-6 w-6 object-contain transition-all max-w-6 max-h-6"
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
