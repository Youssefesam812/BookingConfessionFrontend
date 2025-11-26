import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";

export default function AddEvent() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [priest, setPriest] = useState("");
  const [altar, setAltar] = useState("");

  const handleSubmit = () => {
    // Validate all fields are filled
    if (!eventName || !eventDate || !eventTime || !priest || !altar) {
      alert("الرجاء ملء جميع الحقول");
      return;
    }

    // Handle form submission
    console.log({
      eventName,
      eventDate,
      eventTime,
      priest,
      altar,
    });

    setEventName("");
    setEventDate("");
    setEventTime("");
    setPriest("");
    setAltar("");

    navigate("/dashboard/mass-times");
  };

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-0 py-2">
      <div className="w-full flex flex-col gap-6">
        {/* Header with Title and Arrow */}
        <div className="w-full flex items-center justify-end px-6">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/dashboard/mass-times")}
          >
            <span className="text-2xl font-bold text-[#0D304D]">
              إضافة مناسبة
            </span>
            <ChevronRight className="w-6 h-6 text-[#0D304D]" />
          </div>
        </div>

        {/* Form Container */}
        <div className="rounded-2xlshadow-md p-8" dir="rtl">
          <div className="flex flex-col gap-6">
            {/* Event Name Input */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="اسم المناسبة"
                className="border w-full border-gray-400 rounded-lg px-4 py-3 text-right focus:outline-none focus:border-[#195E8B] transition"
              />
            </div>

            {/* Date Picker */}
            <div className="flex flex-col gap-2">
              <div className="relative w-full">
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full border border-gray-400 rounded-lg px-4 py-3 text-right focus:outline-none focus:border-[#195E8B] transition cursor-pointer"
                  style={{
                    colorScheme: "light",
                  }}
                />
              </div>
            </div>

            {/* Time Input */}
            <div className="flex flex-col gap-2 w-full">
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                placeholder="الساعة"
                className="border w-full border-gray-300 rounded-lg px-4 py-3 text-right focus:outline-none focus:border-[#195E8B] transition cursor-pointer"
              />
            </div>

            {/* Priest Select */}
            <div className="flex flex-col gap-2 w-full">
              <div className="relative w-full">
                <select
                  value={priest}
                  onChange={(e) => setPriest(e.target.value)}
                  className="w-full border border-gray-400 rounded-lg px-4 py-3 text-right appearance-none cursor-pointer focus:outline-none focus:border-[#195E8B] transition"
                  style={{
                    color: priest ? "#000" : "#9CA3AF",
                  }}
                >
                  <option className="text-gray-300" value="" disabled>
                    الاب الكاهن
                  </option>
                  <option value="ابونا ارساني سيمون">ابونا ارساني سيمون</option>
                  <option value="ابونا موسى فتحي">ابونا موسى فتحي</option>
                  <option value="ابونا يوحنا وديع">ابونا يوحنا وديع</option>
                </select>
              </div>
            </div>

            {/* Altar Select */}
            <div className="flex flex-col gap-2 w-full">
              <div className="relative w-full">
                <select
                  value={altar}
                  onChange={(e) => setAltar(e.target.value)}
                  className="w-full border border-gray-400 rounded-lg px-4 py-3 text-right appearance-none cursor-pointer focus:outline-none focus:border-[#195E8B] transition"
                  style={{
                    color: altar ? "#000" : "#9CA3AF",
                  }}
                >
                  <option value="" disabled>
                    المذبح
                  </option>
                  <option value="مذبح مارجرجس - الكاتدرائية">
                    مذبح مارجرجس - الكاتدرائية
                  </option>
                  <option value="مذبح العذراء - الكنيسة">
                    مذبح العذراء - الكنيسة
                  </option>
                  <option value="مذبح الانبا موسى - الكاتدرائية">
                    مذبح الانبا موسى - الكاتدرائية
                  </option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSubmit}
                className="bg-[#0D304D] text-white px-8 py-3 rounded-lg hover:bg-[#195E8B] transition cursor-pointer font-semibold"
              >
                اضافة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
