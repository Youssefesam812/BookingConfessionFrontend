import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronDown,
  Clock,
  User,
  Church,
  Plus,
  Edit,
  X,
  ChevronRight,
} from "lucide-react";

const initialDays = [
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

export default function CreateMassTime() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(-1);
  const [editing, setEditing] = useState(false);
  const [days, setDays] = useState(initialDays);
  const [showModal, setShowModal] = useState(false);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number | null>(null);
  const [modalRows, setModalRows] = useState(
    [] as Array<{
      id: string;
      time: string;
      title: string;
      priest: string;
      altar: string;
    }>
  );

  const genId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-0 py-2">
      <div className="w-full max-w-7xl flex flex-col gap-4">
        <div className="w-full flex items-center justify-between px-6">
          <div>
            {!editing ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className=" cursor-pointer flex items-center gap-2 bg-[#195E8B] text-white px-6 py-2 rounded-lg hover:bg-[#195E9B] transition"
                  onClick={() => {
                    setEditing(true);
                    setOpenIndex(-1);
                  }}
                >
                  <span className="text-sm font-semibold">تعديل المواعيد</span>
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className=" cursor-pointer flex items-center gap-2 bg-[#195E8B] text-white px-6 py-2 rounded-lg hover:bg-[#195E9B] transition"
                  onClick={() => navigate("/dashboard/mass-times/add-event")}
                >
                  <span className="text-sm font-semibold">إضافة مناسبة</span>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="cursor-pointer flex items-center gap-2 bg-white border border-gray-300 text-[#195E8B] px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                onClick={() => {
                  setEditing(false);
                  setOpenIndex(-1); // collapse all when exiting editing
                }}
                aria-label="خروج من وضع التعديل"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* right: editing title + arrow (visible only in editing) */}
          <div className="flex items-center gap-2">
            {editing && (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setEditing(false);
                  setOpenIndex(-1); // collapse all when exiting editing
                }}
              >
                <span className="text-2xl font-bold text-[#0D304D]">
                  تعديل المواعيد
                </span>
                <ChevronRight className="w-6 h-6 text-[#0D304D]" />
              </div>
            )}
          </div>
        </div>

        {days.map((day, idx) => (
          <div
            key={day.name}
            className="rounded-2xl bg-white/60 shadow-md overflow-hidden"
          >
            <button
              className=" cursor-pointer w-full flex items-center justify-between px-6 py-4 focus:outline-none transition-all duration-700 hover:bg-white/20"
              onClick={() => {
                if (editing) {
                  // open modal to edit this day
                  setSelectedDayIdx(idx);
                  setModalRows(
                    day.masses.length > 0
                      ? day.masses.map((m) => ({ id: genId(), ...m }))
                      : [
                          {
                            id: genId(),
                            time: "",
                            title: "",
                            priest: "",
                            altar: "",
                          },
                        ]
                  );
                  setShowModal(true);
                } else {
                  setOpenIndex(idx === openIndex ? -1 : idx);
                }
              }}
              style={
                editing || openIndex === idx
                  ? { borderBottom: "1px solid black" }
                  : {}
              }
            >
              <div
                className={` transform transition-transform duration-700 ${
                  !editing
                    ? editing || openIndex === idx
                      ? "rotate-180"
                      : "rotate-0"
                    : "rotate-0"
                }`}
              >
                {editing ? (
                  <Edit className="w-6 h-6 text-[#0D304D]" />
                ) : (
                  <ChevronDown className="w-7 h-7 text-[#0D304D]" />
                )}
              </div>
              <span className="text-xl font-bold text-[#0D304D]">
                {day.name}
              </span>
            </button>

            {/* Advanced animated content */}
            <div
              className={`transition-all duration-1000 ease-in-out overflow-hidden ${
                editing || openIndex === idx
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
                          <span className="text-[#0D304D] font-semibold">
                            {mass.altar}
                          </span>
                          <Church className="w-5 h-5 text-[#0D304D]" />
                        </div>
                        <div className="text-right flex items-center justify-end gap-2">
                          <span className="text-[#0D304D] font-semibold">
                            {mass.priest}
                          </span>
                          <User className="w-5 h-5 text-[#0D304D]" />
                        </div>
                        <div className="text-right flex items-center justify-end gap-2">
                          <span className="text-[#0D304D] font-semibold">
                            {mass.time}
                          </span>
                          <Clock className="w-5 h-5 text-[#0D304D]" />
                        </div>
                        <div className="text-right flex items-center justify-end gap-2">
                          <span className="text-[#0D304D] font-semibold">
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

        {showModal && selectedDayIdx !== null && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowModal(false)}
            />
            <div className="relative bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] flex flex-col shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  aria-label="إغلاق"
                  className="text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-bold">
                  {days[selectedDayIdx].name}
                </h3>
              </div>

              <div className="overflow-y-auto flex-1 p-6">
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  dir="rtl"
                >
                  {modalRows.map((row, revIdx) => {
                    const numberWords = [
                      "الاول",
                      "الثاني",
                      "الثالث",
                      "الرابع",
                      "الخامس",
                      "السادس",
                      "السابع",
                      "الثامن",
                      "التاسع",
                      "العاشر",
                    ];
                    const autoTitle = `القداس ${
                      numberWords[revIdx] || revIdx + 1
                    }`;

                    return (
                      <div
                        key={row.id}
                        className="flex flex-col gap-3 rounded-lg p-4"
                      >
                        {/* Title with delete button */}
                        <div className="flex justify-between items-center mb-2">
                          <h4 className=" text-base font-bold text-[#0D304D]">
                            {autoTitle}
                          </h4>
                          <button
                            className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                            onClick={() => {
                              const next = modalRows.filter(
                                (r) => r.id !== row.id
                              );
                              setModalRows(
                                next.length
                                  ? next
                                  : [
                                      {
                                        id: genId(),
                                        time: "",
                                        title: "",
                                        priest: "",
                                        altar: "",
                                      },
                                    ]
                              );
                            }}
                          >
                            ✕ حذف
                          </button>
                        </div>

                        {/* Time input */}
                        <div className="flex flex-col">
                          <input
                            type="time"
                            value={row.time}
                            onChange={(e) =>
                              setModalRows((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, time: e.target.value }
                                    : r
                                )
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 cursor-pointer text-right placeholder-gray-400 placeholder-opacity-100"
                            required
                          />
                        </div>

                        {/* Priest input */}
                        <div className="flex flex-col">
                          <select
                            value={row.priest}
                            onChange={(e) =>
                              setModalRows((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, priest: e.target.value }
                                    : r
                                )
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 cursor-pointer text-right placeholder-gray-400 placeholder-opacity-100"
                            required
                          >
                            <option value="">اختر الاب الكاهن</option>
                            <option value="ابونا ارساني سيمون">ابونا ارساني سيمون</option>
                            <option value="ابونا موسى فتحي">ابونا موسى فتحي</option>
                            <option value="ابونا يوحنا وديع">ابونا يوحنا وديع</option>
                          </select>
                        </div>

                        {/* Altar input */}
                        <div className="flex flex-col">
                          <select
                            value={row.altar}
                            onChange={(e) =>
                              setModalRows((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, altar: e.target.value }
                                    : r
                                )
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 cursor-pointer text-right placeholder-gray-400 placeholder-opacity-100"
                            required
                          >
                            <option value="">اختر المذبح</option>
                            <option value="مذبح مارجرجس - الكاتدرائية">مذبح مارجرجس - الكاتدرائية</option>
                            <option value="مذبح العذراء - الكنيسة">مذبح العذراء - الكنيسة</option>
                            <option value="مذبح الانبا موسى - الكاتدرائية">مذبح الانبا موسى - الكاتدرائية</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 p-6 bg-white">
                <button
                  className="px-4 py-2 w-[130px] border rounded-lg text-gray-700 cursor-pointer hover:bg-[#0D304D] hover:text-white transition"
                  onClick={() =>
                    setModalRows((prev) => [
                      ...prev,
                      {
                        id: genId(),
                        time: "",
                        title: "",
                        priest: "",
                        altar: "",
                      },
                    ])
                  }
                >
                  إضافة قداس
                </button>
                <button
                  className="px-6 py-2 w-[130px] bg-[#0D304D] border-1 border-[#0D304D] text-white rounded-lg cursor-pointer hover:bg-white hover:text-[#0D304D] transition"
                  onClick={() => {
                    // Validate all fields are filled
                    const hasEmptyFields = modalRows.some(
                      (row) => !row.time || !row.priest || !row.altar
                    );
                    
                    if (hasEmptyFields) {
                      alert('الرجاء ملء جميع الحقول');
                      return;
                    }
                    
                    if (selectedDayIdx !== null) {
                      setDays((prev) => {
                        const copy = prev.map((d) => ({
                          ...d,
                          masses: d.masses.map((m) => ({ ...m })),
                        }));
                        copy[selectedDayIdx] = {
                          ...copy[selectedDayIdx],
                          masses: modalRows.map(({ id, ...rest }) => ({
                            ...rest,
                          })),
                        };
                        return copy;
                      });
                    }
                    setShowModal(false);
                  }}
                >
                  حفظ
                </button>

                <button
                  className="px-4 py-2 w-[130px] border rounded-lg text-gray-700 cursor-pointer hover:bg-[#0D304D] hover:text-white transition"
                  onClick={() => setShowModal(false)}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
