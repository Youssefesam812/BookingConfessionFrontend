import { useState } from "react";
import { ChevronDown, Clock, User, Church } from "lucide-react";

const days = [
  {
    name: "يوم السبت",
    masses: [
      {
        time: "7:30 ص",
        title: "القداس الاول",
        priest: "ابونا ارساني سيمون",
        altar: "مذبح مارجرجس - الكاتدرائية",
      },
      {
        time: "9:30 ص",
        title: "القداس الثاني",
        priest: "ابونا موسى فتحي",
        altar: "مذبح العذراء - الكنيسة",
      },
      {
        time: "11:00 ص",
        title: "القداس الثالث",
        priest: "ابونا يوحنا وديع",
        altar: "مذبح الانبا موسى - الكاتدرائية",
      },
    ],
  },
  { name: "يوم الاحد", masses: [] },
  { name: "يوم الاثنين", masses: [] },
  { name: "يوم الثلاثاء", masses: [] },
  { name: "يوم الاربعاء", masses: [] },
  { name: "يوم الخميس", masses: [] },
  { name: "يوم الجمعة", masses: [] },
];

export default function MassTime() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-0 py-8">
      <div className="w-full max-w-7xl flex flex-col gap-4">
        {days.map((day, idx) => (
          <div
            key={day.name}
            className="rounded-2xl bg-white/60 shadow-md overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 focus:outline-none transition-all duration-700 hover:bg-white/20"
              onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
              style={
                openIndex === idx ? { borderBottom: "1px solid black" } : {}
              }
            >
              <div
                className={`transform transition-transform duration-700 ${
                  openIndex === idx ? "rotate-180" : "rotate-0"
                }`}
              >
                <ChevronDown className="w-7 h-7 text-gray-700" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                {day.name}
              </span>
            </button>

            {/* Advanced animated content */}
            <div
              className={`transition-all duration-1000 ease-in-out overflow-hidden ${
                openIndex === idx
                  ? "max-h-[500px] opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-4"
              }`}
            >
              <div className="px-2 md:px-6 pb-4 transform transition-transform duration-700">
                {day.masses.length > 0 ? (
                  <div className="flex flex-col md:px-28 gap-3 animate-fade-in py-4">
                    {day.masses.map((mass) => (
                      <div
                        key={mass.time + mass.priest}
                        className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4 py-3 md:py-1 px-4 md:px-6 border-b md:border-0 border-gray-900 last:border-b-0 transition-all duration-500 hover:bg-white/30 rounded-lg"
                      >
                        <div className="text-right flex items-center justify-end gap-2">
                          <span className="text-gray-900 font-semibold">
                            {mass.altar}
                          </span>
                          <Church className="w-5 h-5 text-black" />
                        </div>
                        <div className="text-right flex items-center justify-end gap-2">
                          <span className="text-gray-900 font-semibold">
                            {mass.priest}
                          </span>
                          <User className="w-5 h-5 text-black" />
                        </div>
                        <div className="text-right flex items-center justify-end gap-2">
                          <span className="text-gray-900 font-semibold">
                            {mass.time}
                          </span>
                          <Clock className="w-5 h-5 text-black" />
                        </div>
                        <div className="text-right flex items-center justify-end gap-2">
                          <span className="text-gray-900 font-semibold">
                            {mass.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 animate-pulse">
                    <p className="text-gray-900 text-lg">
                      لا توجد قداسات في هذا اليوم
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
