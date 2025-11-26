"use client";

import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
// NOTE: network calls removed for now; using static mock data
import { useAuth } from "../../contexts/AuthContext";

type TimeSlot = {
  id: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  priestName: string;
  priestId: string;
};

// ApiResponse removed — using local mock data

type DaySlot = {
  iso: string;
  display: string;
  slots: {
    time: string;
    reserved: boolean;
    id: number;
    startTime: string;
  }[];
  noSlots: boolean;
};

// Booking request/response types removed — using local mocks

// BookingApiResponse and BASE_URL removed — no external endpoints

export default function FatherBookingConfessions() {
  const { priestId } = useParams<{ priestId: string }>();
  const location = useLocation();
  const { user } = useAuth();

  const priestName = location.state?.priestName;
  const priestImage =
    location.state?.priestImage || "/src/assets/images/Logo.png";

  const [days, setDays] = useState<DaySlot[]>([]);
  const [weekStart, setWeekStart] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    id: number;
    time: string;
    date: string;
    startTime: string;
    reserved: boolean;
  } | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [lastBookedSlot, setLastBookedSlot] = useState<{
    id: number;
    time: string;
    date: string;
    startTime: string;
    reserved: boolean;
    priestName?: string | undefined;
  } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // getMemberId removed — no backend calls

  const isAuthenticated = () => {
    return !!user;
  };

  useEffect(() => {
    if (priestId) {
      fetchTimeSlots();
    }
  }, [priestId]);

  const fetchTimeSlots = async () => {
    try {
      setLoading(true);
      setError(null);

      // Static mock time slots for the priest
      const MOCK_TIMESLOTS: TimeSlot[] = [
        {
          id: 201,
          startTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
          endTime: new Date(
            Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 30
          ).toISOString(),
          isAvailable: true,
          priestName: priestName || "القس مثال",
          priestId: priestId || "p-mock",
        },
        {
          id: 202,
          startTime: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
          endTime: new Date(
            Date.now() + 1000 * 60 * 60 * 26 + 1000 * 60 * 30
          ).toISOString(),
          isAvailable: false,
          priestName: priestName || "القس مثال",
          priestId: priestId || "p-mock",
        },
        {
          id: 203,
          startTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
          endTime: new Date(
            Date.now() + 1000 * 60 * 60 * 48 + 1000 * 60 * 30
          ).toISOString(),
          isAvailable: true,
          priestName: priestName || "القس مثال",
          priestId: priestId || "p-mock",
        },
      ];

      const transformedData = transformTimeSlotsToDays(MOCK_TIMESLOTS);
      setDays(transformedData);
    } catch (err) {
      setError("حدث خطأ محلي أثناء تحميل المواعيد");
      console.error("Error fetching time slots (mock):", err);
    } finally {
      setLoading(false);
    }
  };

  const transformTimeSlotsToDays = (timeSlots: TimeSlot[]): DaySlot[] => {
    if (!timeSlots || timeSlots.length === 0) return [];

    // Group time slots by date
    const slotsByDate = timeSlots.reduce((acc, slot) => {
      const dt = new Date(slot.startTime);
      const iso = dt.toISOString().split("T")[0];
      const display = dt.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      acc[iso] = acc[iso] || { display, slots: [] };
      acc[iso].slots.push({
        time: dt.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        reserved: !slot.isAvailable,
        id: slot.id,
        startTime: slot.startTime,
      });

      return acc;
    }, {} as Record<string, { display: string; slots: { time: string; reserved: boolean; id: number; startTime: string }[] }>);

    return Object.entries(slotsByDate)
      .map(([iso, data]) => ({
        iso,
        // keep original localized text if needed elsewhere
        display: data.display,
        slots: data.slots.sort(
          (a, b) =>
            new Date(`1970/01/01 ${a.time}`).getTime() -
            new Date(`1970/01/01 ${b.time}`).getTime()
        ),
        noSlots: data.slots.length === 0,
      }))
      .sort((a, b) => new Date(a.iso).getTime() - new Date(b.iso).getTime());
  };

  const startOfWeek = (d: Date) => {
    const dt = new Date(d);
    const day = dt.getDay();
    dt.setDate(dt.getDate() - day);
    dt.setHours(0, 0, 0, 0);
    return dt;
  };

  const formatWeekLabel = (start: Date) => {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const startDay = start.getDate();
    const endDay = end.getDate();
    const startMonth = start.toLocaleDateString("ar-EG", { month: "long" });
    const endMonth = end.toLocaleDateString("ar-EG", { month: "long" });
    const year = end.getFullYear();
    if (startMonth === endMonth) {
      return { startDay, endDay, endMonth, year };
    }
    return { startDay, endDay, startMonth, endMonth, year };
  };
  useEffect(() => {
    if (days.length > 0) {
      setWeekStart(startOfWeek(new Date(days[0].iso)));
    } else {
      setWeekStart(startOfWeek(new Date()));
    }
  }, [days]);

  // Build exactly 7 days (current week) including days with no slots
  const weekDays: DaySlot[] = weekStart
    ? Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        const iso = d.toISOString().split("T")[0];

        const existing = days.find((x) => x.iso === iso);
        if (existing) {
          return {
            ...existing,
            display: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
          };
        }

        // empty day with no slots
        return {
          iso,
          display: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
          slots: [],
          noSlots: true,
        };
      })
    : [];

  const prevWeek = () => {
    if (!weekStart) return;
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    setWeekStart(prev);
  };

  const nextWeek = () => {
    if (!weekStart) return;
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  };

  const handleSlotSelect = (slot: {
    id: number;
    time: string;
    date: string;
    startTime: string;
    reserved: boolean;
  }) => {
    if (slot.reserved) return;

    // Check if user is authenticated before allowing selection
    if (!isAuthenticated()) {
      setError("يرجى تسجيل الدخول أولاً لاختيار ميعاد");
      return;
    }

    setSelectedSlot(slot);
    setBookingSuccess(null);
    setError(null); // Clear any previous errors
  };

  const handleBookClick = () => {
    if (!selectedSlot || !priestId) {
      setError("يرجى اختيار ميعاد للحجز أولاً");
      return;
    }

    if (!isAuthenticated()) {
      setError("يرجى تسجيل الدخول أولاً");
      return;
    }

    // Show confirmation popup instead of directly booking
    setShowConfirmation(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlot || !priestId) return;
    // Simulate local booking
    setBookingLoading(true);
    setError(null);
    setShowConfirmation(false);

    // Mark the selected slot as reserved in local state
    setTimeout(() => {
      setDays((prev) =>
        prev.map((d) => ({
          ...d,
          slots: d.slots.map((s) =>
            s.id === selectedSlot.id ? { ...s, reserved: true } : s
          ),
        }))
      );
      setBookingSuccess("تم الحجز بنجاح");
      // keep a copy of the booked slot to show in the success modal
      setLastBookedSlot({ ...selectedSlot, priestName });
      setSelectedSlot(null);
      setBookingLoading(false);
    }, 400);
  };

  const handleCloseSuccess = () => {
    setBookingSuccess(null);
    setLastBookedSlot(null);
  };

  const handleCancelBooking = () => {
    setShowConfirmation(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-2 md:px-0 py-8">
        <div className="text-xl text-gray-600">جاري تحميل المواعيد...</div>
      </div>
    );
  }

  if (error && !bookingLoading && !selectedSlot) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-2 md:px-0 py-8">
        <div className="text-xl text-red-600 text-center mb-4">{error}</div>
        {!isAuthenticated() && (
          <div className="flex gap-4">
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              تسجيل الدخول
            </button>
            <button
              onClick={fetchTimeSlots}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              تحديث الصفحة
            </button>
          </div>
        )}
        {isAuthenticated() && (
          <button
            onClick={fetchTimeSlots}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            حاول مرة أخرى
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-0 py-8">
      {/* Priest name and image */}
      <div className="flex mb-6 gap-4 justify-end w-full max-w-3xl items-center">
        <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-5">
          {priestName}
        </div>
        <img
          src={priestImage || "/placeholder.svg"}
          alt={priestName}
          className="w-28 h-28 md:w-40 md:h-40 rounded-2xl object-cover"
        />
      </div>

      {/* Authentication Warning */}
      {!isAuthenticated() && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-center">
          <p>يجب تسجيل الدخول لحجز ميعاد للاعتراف</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-2 px-4 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
          >
            تسجيل الدخول
          </button>
        </div>
      )}

      {/* Success Message */}
      {bookingSuccess && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
          {bookingSuccess}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Selected Slot Info */}
      {selectedSlot && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <div className="font-semibold text-blue-800">الميعاد المختار:</div>
          <div className="text-blue-600">
            {selectedSlot.date} - {selectedSlot.time}
          </div>
        </div>
      )}
      {/* Divider */}
      <div className="w-full border-white border-b-[0.5px] " />
      {/* Date navigation (weekly) */}
      <div className="flex items-center justify-center w-[260px] md:w-[370px] relative py-2">
        <button
          onClick={prevWeek}
          className="w-6 h-6 flex items-center justify-center bg-[#D9D9D9] rounded-full shadow text-gray-700 hover:bg-blue-600 hover:text-white group transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 stroke-current stroke-[3px] transition-all"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div className="flex-1 flex items-center justify-center w-100">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            {weekStart ? (
              <div className="inline-flex items-center gap-2">
                <span className=" py-1 rounded-full  text-lg font-semibold ">
                  {formatWeekLabel(weekStart).year}
                </span>
                <span className=" py-1 rounded-full  text-lg font-semibold ">
                  {formatWeekLabel(weekStart).endMonth}
                </span>
                <span className=" py-1 rounded-full  text-lg font-semibold ">
                  {formatWeekLabel(weekStart).startDay}
                </span>
                <span className=" py-1 rounded-full  text-lg font-semibold ">
                  -
                </span>
                {formatWeekLabel(weekStart).startMonth && (
                  <span className=" py-1 rounded-full  text-lg font-semibold ">
                    {formatWeekLabel(weekStart).startMonth}
                  </span>
                )}
                <span className=" py-1 rounded-full  text-lg font-semibold ">
                  {formatWeekLabel(weekStart).endDay}
                </span>
              </div>
            ) : (
              <span className="px-4 py-1 rounded-full bg-white border border-gray-300 shadow-sm text-sm font-semibold">
                لا توجد مواعيد
              </span>
            )}
          </div>
        </div>

        <button
          onClick={nextWeek}
          className="w-6 h-6 flex items-center justify-center bg-[#D9D9D9] rounded-full shadow text-gray-700 hover:bg-blue-600 hover:text-white group transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 stroke-current stroke-[3px] transition-all"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Divider */}
      <div className="w-full border-white border-b-[0.5px] " />

      {/* Days and slots */}
      <div className="w-full max-w-6xl flex flex-row justify-start md:justify-center gap-4 mt-6 mb-4 overflow-x-auto px-2 md:px-0">
        {weekDays.length === 0 ? (
          <div className="text-xl text-gray-600 py-8">لا توجد مواعيد متاحة</div>
        ) : (
          weekDays.map((day) => (
            <div
              key={day.iso}
              className="flex flex-col items-center bg-white/30 rounded-xl shadow-md px-4 py-3 min-w-[140px] max-w-[160px]"
            >
              <div className="font-bold text-md text-gray-900 mb-2">
                {day.display}
              </div>
              {day.noSlots || day.slots.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-900 font-semibold text-center min-h-[120px]">
                  لا يوجد مواعيد متاحه في هذا اليوم
                </div>
              ) : (
                <div className="flex flex-col gap-2 max-h-[220px] md:max-h-[300px] overflow-y-auto pr-2">
                  {day.slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() =>
                        handleSlotSelect({ ...slot, date: day.display })
                      }
                      className={`w-24 py-1 rounded-md border text-sm font-semibold transition-colors duration-150
                        ${
                          slot.reserved
                            ? "bg-white border-red-400 text-red-600 line-through cursor-not-allowed"
                            : selectedSlot?.id === slot.id
                            ? "bg-blue-100 border-blue-500 text-blue-700"
                            : "bg-white border-gray-400 text-gray-900 hover:bg-blue-50"
                        }
                      `}
                      disabled={slot.reserved || !isAuthenticated()}
                      title={
                        !isAuthenticated()
                          ? "يجب تسجيل الدخول لاختيار ميعاد"
                          : ""
                      }
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 mt-2">
        <span className="flex items-center gap-1 text-sm font-semibold text-red-600">
          <span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
          محجوز
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold text-gray-700">
          <span className="w-3 h-3 rounded-full bg-gray-400 inline-block"></span>
          متاح
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
          <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
          مختار
        </span>
      </div>

      {/* Book button */}
      <button
        onClick={handleBookClick}
        disabled={!selectedSlot || bookingLoading || !isAuthenticated()}
        className={`mt-2 px-12 py-2 rounded-lg text-lg font-bold shadow transition-colors duration-150
          ${
            !selectedSlot || bookingLoading || !isAuthenticated()
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }
        `}
        title={!isAuthenticated() ? "يجب تسجيل الدخول للحجز" : ""}
      >
        {bookingLoading ? "جاري الحجز..." : "حجز"}
      </button>

      {/* Confirmation Popup */}
      {showConfirmation && selectedSlot && (
        <div
          onClick={handleCancelBooking}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all"
          >
            <div className="flex flex-col items-center text-center">
              {/* Priest circular image at top */}
              <img
                src={priestImage || "/placeholder.svg"}
                alt={priestName}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-lg mb-6"
              />

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                تأكيد حجز
              </h3>

              <div className="text-gray-700 mb-6 leading-relaxed">
                <p className="text-lg mb-3">
                  هل انت متأكد من حجز جلسة اعتراف مع {priestName}
                </p>
                <p className="text-base font-semibold text-gray-900">
                  يوم {selectedSlot.date} الساعة{" "}
                  {(() => {
                    const m = selectedSlot.time.match(/^(.*?)\s*(AM|PM)$/);
                    if (m) {
                      const timeNum = m[1];
                      const suffix = m[2] === "AM" ? "ص" : "م";
                      return (
                        <span>
                          {timeNum} {suffix}
                        </span>
                      );
                    }
                    return <span dir="ltr">{selectedSlot.time}</span>;
                  })()}
                </p>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={bookingLoading}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {bookingLoading ? "جاري الحجز..." : "تأكيد"}
              </button>

              <button
                onClick={handleCancelBooking}
                disabled={bookingLoading}
                className="text-gray-600 font-semibold hover:text-gray-800 transition-colors disabled:opacity-50"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal (after booking) */}
      {bookingSuccess && lastBookedSlot && (
        <div
          onClick={handleCloseSuccess}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all text-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-[#21C179] flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-28 h-28 text-white"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#21C179"
                    strokeWidth="1"
                    fill="#21C179"
                  />
                  <path
                    d="M9 12.5l1.8 1.8L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {bookingSuccess}
              </h3>

              <div className="text-gray-700 mb-6 leading-relaxed">
                <p className="text-base font-semibold text-gray-900">
                  يوم : {lastBookedSlot.date}
                </p>
                <p className="text-base font-semibold text-gray-900">
                  الساعة :{" "}
                  {(() => {
                    const m = lastBookedSlot.time.match(/^(.*?)\s*(AM|PM)$/);
                    if (m) {
                      const timeNum = m[1];
                      const suffix = m[2] === "AM" ? "ص" : "م";
                      return (
                        <span>
                          {timeNum} {suffix}
                        </span>
                      );
                    }
                    return <span dir="ltr">{lastBookedSlot.time}</span>;
                  })()}
                </p>
                {lastBookedSlot.priestName && (
                  <p className="text-md text-gray-900 font-semibold">
                    مع {lastBookedSlot.priestName}
                  </p>
                )}
              </div>

              <button
                onClick={handleCloseSuccess}
                className="w-28 px-6 py-2 bg-white border border-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-50"
              >
                اغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
