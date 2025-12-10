import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Holiday {
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
    {
        month: "JAN",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday" }
        ]
    },
    {
        month: "FEB",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday", optional: true }
        ]
    },
    {
        month: "MAR",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday" }
        ]
    },
    {
        month: "APR",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday" }
        ]
    },
    {
        month: "MAY",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday" }
        ]
    },
    {
        month: "JUN",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday" }
        ]
    },
    {
        month: "JUL",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday" }
        ]
    },
    {
        month: "AUG",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday" }
        ]
    },
    {
        month: "SEP",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday" }
        ]
    },
    {
        month: "OCT",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday", optional: true }
        ]
    },
    {
        month: "NOV",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday", optional: true }
        ]
    },
    {
        month: "DEC",
        holidays: [
            { date: "1st", name: "New Year's Day", weekday: "Wednesday" },
            { date: "15th", name: "Makarsankranti", weekday: "Tuesday" }
        ]
    }
];

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const HolidayCalendarModal = ({ isOpen, onClose }: Props) => {
    const [year, setYear] = useState(2026);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="w-[50%] h-[80%] bg-white rounded-xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b bg-[#F7FBFF]">
                    <h2 className="text-xl font-semibold text-[#2A5CAA]">Holiday Calendar</h2>

                    <div className="flex items-center gap-3">
                        <ChevronLeft
                            className="cursor-pointer text-gray-600 hover:text-black"
                            onClick={() => setYear(year - 1)}
                        />

                        <span className="text-lg font-medium">{year}</span>

                        <ChevronRight
                            className="cursor-pointer text-gray-600 hover:text-black"
                            onClick={() => setYear(year + 1)}
                        />

                        <X
                            className="ml-4 text-red-500 cursor-pointer hover:text-red-700"
                            onClick={onClose}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 p-4">

                    {holidayData.map((month) => (
                        <div
                            key={month.month}
                            className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition"
                        >
                            <div className="bg-[#DFF0FF] text-[#003B73] font-semibold text-sm px-4 py-2 rounded-md mb-3 text-center">
                                {month.month}
                            </div>

                            {month.holidays.map((h, index) => (
                                <div key={index} className="mb-3">
                                    <p className="font-semibold">{h.date}</p>
                                    <p className="text-sm">{h.name}</p>
                                    <p className="text-xs text-gray-500">{h.weekday}</p>

                                    {h.optional && (
                                        <span className="inline-block mt-1 text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                                            OPTIONAL
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default HolidayCalendarModal;
