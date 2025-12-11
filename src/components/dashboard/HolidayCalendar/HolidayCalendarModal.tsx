// import { X, ChevronLeft, ChevronRight } from "lucide-react";
// import { useState } from "react";

// interface Holiday {
//     year:number;
//     date: string;
//     name: string;
//     weekday: string;
//     optional?: boolean;
// }

// interface MonthData {
//     month: string;
//     holidays: Holiday[];
// }

// const holidayData: MonthData[] = [
//     {
//         month: "JAN",
//         holidays: [
//             { year:2025, date: "1st", name: "New Year's Day", weekday: "Wednesday" },
//             { year:2025, date: "14th", name: "Makarsankranti/Pongal", weekday: "Tuesday" }
//         ]
//     },
//     {
//         month: "FEB",
//         holidays: [
//             { year:2025, date: "26th", name: "Maha Shivaratri", weekday: "Wednesday" },
//         ]
//     },
//     {
//         month: "MAR",
//         holidays: [
//             { year:2025, date: "14th", name: "Holi", weekday: "Friday" },
//             { year:2025, date: "31st", name: "Ramazan Eid / Idul Fitr", weekday: "Monday" }
//         ]
//     },
//     {
//         month: "APR",
//         holidays: [
//             { year:2025, date: "18th", name: "Good Friday", weekday: "Friday" },
//         ]
//     },
//     {
//         month: "MAY",
//         holidays: [
//             { year:2025, date: "1st", name: "Maharashtra Day / May Day / Labour Day", weekday: "Thursday" },
//         ]
//     },
//     {
//         month: "JUN",
//         holidays: [
          
//         ]
//     },
//     {
//         month: "JUL",
//         holidays: [
//             { year:2025, date: "21st", name: "Bonalu", weekday: "Monday" },
//         ]
//     },
//     {
//         month: "AUG",
//         holidays: [
//             { year:2025, date: "15th", name: "Independence Day", weekday: "Friday" },
//             { year:2025, date: "27th", name: "Ganesh Chaturthi", weekday: "Wednesday" }
//         ]
//     },
//     {
//         month: "SEP",
//         holidays: [
//             { year:2025, date: "5th", name: "Eid e Milad-un-Nabi", weekday: "Friday" , optional: true},
//         ]
//     },
//     {
//         month: "OCT",
//         holidays: [
//             { year:2025, date: "2nd", name: "Gandhi Jayanti / Vijaya Dashami", weekday: "Wednesday" },
//             { year:2025, date: "20th", name: "Diwali", weekday: "Monday" }
//         ]
//     },
//     {
//         month: "NOV",
//         holidays: [
//             { year:2025, date: "5th", name: "Guru Nanak Jayanti", weekday: "Wednesday" , optional: true}
//         ]
//     },
//     {
//         month: "DEC",
//         holidays: [
//             { year:2025, date: "25th", name: "Christmas", weekday: "Thursday" }
//         ]
//     }
// ];

// interface Props {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const HolidayCalendarModal = ({ isOpen, onClose }: Props) => {
//     const [year, setYear] = useState(2026);

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex justify-center items-center z-50" >
//             <div className="w-[80%] h-[80%] bg-white rounded-xl shadow-xl overflow-hidden">

//                 {/* Header */}
//                 <div className="flex items-center justify-between px-4 py-3 border-b bg-[#F7FBFF]]" style={{padding:"20px" ,borderColor:'#E1E1E1'}}>
//                     <h2 className="text-xl font-semibold text-[#2A5CAA]">Holiday Calendar</h2>

//                     <div className="flex items-center gap-3">
//                         <ChevronLeft
//                             className="cursor-pointer text-gray-600 hover:text-black"
//                             onClick={() => setYear(year - 1)}
//                         />

//                         <span className="text-lg font-medium" style={{paddingLeft:"20px",paddingRight:"20px"}}>{year}</span>

//                         <ChevronRight
//                             className="cursor-pointer text-gray-600 hover:text-black"
//                             onClick={() => setYear(year + 1)}
//                             style={{marginRight:"40px"}}
//                         />
//                         <div
//                             className="flex items-center justify-center rounded-md"
//                             style={{ background: '#F5D6D661', width: 30, height: 30 }}
//                             title="Close"
//                         >
//                             <X
//                                 className="text-red-500 cursor-pointer hover:text-red-700"
//                                 onClick={onClose}
//                                 style={{ width: 18, height: 18 }}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Grid (3 columns on md+, 12 cards -> 4 rows) */}
//                 {/* <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 96px)' }}>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{padding:"20px"}}>

//                         {holidayData.map((month) => (
//                             <div
//                                 key={month.month}
//                                 className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
//                                 style={{ borderColor: '#E1E1E1'}}
//                             >
//                                 <div className="bg-[#DFF0FF] text-[#003B73] font-semibold text-sm px-4 py-2 rounded-md mb-3 text-center" style={{padding:"10px",margin:"20px 10px 10px 10px"}}>
//                                     {month.month}
//                                 </div>
//                                 {month.holidays.map((h, index) => (
//                                     <div key={index} className="mb-3" style={{paddingLeft:"20px"}}>
//                                         <p className="font-semibold text-[14px]">{h.date}</p>
//                                         <p className="text-[13px]">{h.name}</p>
//                                         <p className="text-[10px] text-gray-500" style={{paddingBottom:"5px"}}>{h.weekday}</p>

//                                         {h.optional && (
//                                             <span className="inline-block mt-1 text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
//                                                 OPTIONAL
//                                             </span>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         ))}

//                     </div>
//                 </div> */}
//                 <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 96px)' ,backgroundColor:"#EFF1F5"}}>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ padding: "20px" }}>
//                         {holidayData.map((month) => (
//                             <div
//                                 key={month.month}
//                                 className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
//                                 style={{ borderColor: '#E1E1E1' }}
//                             >
//                                 <div
//                                     className="bg-[#DFF0FF] text-[#003B73] font-semibold text-sm px-4 py-2 rounded-md mb-3 text-center"
//                                     style={{ padding: "10px", margin: "20px 15px 10px 15px" }}
//                                 >
//                                     {month.month}
//                                 </div>

//                                 {month.holidays.map((h, index) => (
//                                     <div key={index} className="mb-4 flex items-start justify-between" style={{paddingBottom:"10px"}}>

//                                         <div className="flex items-start gap-2">
//                                             {/* Fixed-height vertical strip */}
//                                             <div className="w-1 bg-[#EBF5FF] rounded-full min-h-[40px]" style={{ margin: "5px 0px 0px 15px" }}></div>

//                                             {/* Holiday text block */}
//                                             <div>
//                                                 <p className="font-semibold text-[14px] leading-tight">{h.date}</p>
//                                                 <p className="text-[13px] leading-tight font-bold">{h.name}</p>
//                                                 <p className="text-[10px] text-gray-500 pb-1 leading-tight" style={{ paddingBottom: "10px" }}>{h.weekday}</p>
//                                             </div>
//                                         </div>

//                                         {h.optional && (
//                                             <div className="flex items-end" style={{padding:"20px 20px 0px 0px"}}>
//                                                 <span className="inline-block mt-1 text-xs bg-orange-500 text-white px-2 py-1 rounded-full" style={{padding:"3px 10px 3px 10px"}}>
//                                                     OPTIONAL
//                                                 </span>
//                                             </div>
//                                         )}

//                                     </div>
//                                 ))}

//                             </div>
//                         ))}

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HolidayCalendarModal;

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Holiday {
    year: number;
    date: string;
    name: string;
    weekday: string;
    optional?: boolean;
}

interface MonthData {
    month: string;
    holidays: Holiday[];
}

const holidayData: MonthData[] = [
    { month: "JAN", holidays: [
        { year: 2025, date: "1st", name: "New Year's Day", weekday: "Wednesday" },
        { year: 2025, date: "14th", name: "Makarsankranti/Pongal", weekday: "Tuesday" }
    ]},
    { month: "FEB", holidays: [
        { year: 2025, date: "26th", name: "Maha Shivaratri", weekday: "Wednesday" },
    ]},
    { month: "MAR", holidays: [
        { year: 2025, date: "14th", name: "Holi", weekday: "Friday" },
        { year: 2025, date: "31st", name: "Ramazan Eid / Idul Fitr", weekday: "Monday" }
    ]},
    { month: "APR", holidays: [
        { year: 2025, date: "18th", name: "Good Friday", weekday: "Friday" },
    ]},
    { month: "MAY", holidays: [
        { year: 2025, date: "1st", name: "Maharashtra Day / May Day / Labour Day", weekday: "Thursday" },
    ]},
    { month: "JUN", holidays: [] },
    { month: "JUL", holidays: [
        { year: 2025, date: "21st", name: "Bonalu", weekday: "Monday" },
    ]},
    { month: "AUG", holidays: [
        { year: 2025, date: "15th", name: "Independence Day", weekday: "Friday" },
        { year: 2025, date: "27th", name: "Ganesh Chaturthi", weekday: "Wednesday" }
    ]},
    { month: "SEP", holidays: [
        { year: 2025, date: "5th", name: "Eid e Milad-un-Nabi", weekday: "Friday", optional: true },
    ]},
    { month: "OCT", holidays: [
        { year: 2025, date: "2nd", name: "Gandhi Jayanti / Vijaya Dashami", weekday: "Wednesday" },
        { year: 2025, date: "20th", name: "Diwali", weekday: "Monday" }
    ]},
    { month: "NOV", holidays: [
        { year: 2025, date: "5th", name: "Guru Nanak Jayanti", weekday: "Wednesday", optional: true }
    ]},
    { month: "DEC", holidays: [
        { year: 2025, date: "25th", name: "Christmas", weekday: "Thursday" }
    ]},
];

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const HolidayCalendarModal = ({ isOpen, onClose }: Props) => {
    const [year, setYear] = useState(2025);

    if (!isOpen) return null;

    // Filtering holidays by selected year
    const filteredHolidayData = holidayData.map(month => ({
        ...month,
        holidays: month.holidays.filter(h => h.year === year)
    }));

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="w-[80%] h-[80%] bg-white rounded-xl shadow-xl overflow-hidden">

                {/* Header */}
                <div
                    className="flex items-center justify-between px-4 py-3 border-b"
                    style={{ padding: "20px", borderColor: "#E1E1E1" }}
                >
                    <h2 className="text-xl font-semibold text-[#1F89EF]">Holiday Calendar</h2>

                    <div className="flex items-center gap-3">
                        <ChevronLeft
                            className="cursor-pointer text-gray-600 hover:text-black"
                            onClick={() => setYear(year - 1)}
                        />

                        <span className="text-lg font-medium" style={{ padding: "0 20px" }}>{year}</span>

                        <ChevronRight
                            className="cursor-pointer text-gray-600 hover:text-black"
                            onClick={() => setYear(year + 1)}
                            style={{ marginRight: "40px" }}
                        />

                        <div
                            className="flex items-center justify-center rounded-md"
                            style={{ background: "#F5D6D661", width: 30, height: 30 }}
                        >
                            <X
                                className="text-red-500 cursor-pointer hover:text-red-700"
                                onClick={onClose}
                                style={{ width: 18, height: 18 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(80vh - 96px)", backgroundColor: "#F7FBFF" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ padding: "20px" }}>

                        {filteredHolidayData
                            .filter(month => month.holidays.length > 0) // HIDE EMPTY MONTHS
                            .map((month) => (
                                <div
                                    key={month.month}
                                    className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
                                    style={{ borderColor: "#E1E1E1" , }}
                                >
                                    <div
                                        className="bg-[#DFF0FF] text-[#003B73] font-semibold text-sm px-4 py-2 rounded-md mb-3 text-center"
                                        style={{ margin: "20px 15px 10px 15px", padding:"8px 10px 8px 10px"}}
                                    >
                                        {month.month}
                                    </div>

                                    {month.holidays.map((h, index) => (
                                        <div
                                            key={index}
                                            className="mb-4 flex items-start justify-between"
                                            style={{ paddingBottom: "10px" }}
                                        >
                                            <div className="flex items-start gap-2">
                                                <div
                                                    className="w-1 bg-[#EBF5FF] rounded-full min-h-[40px]"
                                                    style={{ margin: "5px 0 0 15px" }}
                                                ></div>

                                                <div>
                                                    <p className="font-semibold text-[14px] leading-tight">{h.date}</p>
                                                    <p className="text-[13px] font-bold leading-tight">{h.name}</p>
                                                    <p
                                                        className="text-[10px] text-gray-500 leading-tight"
                                                        style={{ paddingBottom: "10px" }}
                                                    >
                                                        {h.weekday}
                                                    </p>
                                                </div>
                                            </div>

                                            {h.optional && (
                                                <div className="flex items-end" style={{ padding: "20px 20px 0 0" }}>
                                                    <span
                                                        className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full"
                                                        style={{ padding: "3px 10px" }}
                                                    >
                                                        OPTIONAL
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))
                        }

                    </div>
                </div>

            </div>
        </div>
    );
};

export default HolidayCalendarModal;
