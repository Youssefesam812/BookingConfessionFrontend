import { useRef } from "react";
import father from "../../assets/images/26e2109ce02352bf1e8cab9791a32115a25d0186.jpg";
import { jsPDF } from "jspdf";

type Slot = {
  time: string;
};


type SlotGroup = {
  id: string;
  label: string;
  date: string;
  slots: Slot[];
};

const slotGroups: SlotGroup[] = [
  {
    id: "today",
    label: "مواعيد اليوم",
    date: "2/11/2023",
    slots: [
      { time: "06:00 Pm" },
      { time: "05:45 Pm" },
      { time: "05:30 Pm" },
      { time: "05:15 Pm" },
      { time: "07:00 Pm" },
      { time: "06:45 Pm" },
      { time: "06:30 Pm" },
      { time: "06:15 Pm" },
    ],
  },
  {
    id: "tomorrow",
    label: "مواعيد الغد",
    date: "3/11/2023",
    slots: [
      { time: "06:00 Pm" },
      { time: "05:45 Pm" },
      { time: "05:30 Pm" },
      { time: "05:15 Pm" },
    ],
  },
  {
    id: "2025-11-06",
    label: "مواعيد 6/11/2025",
    date: "6/11/2025",
    slots: [{ time: "06:00 Pm" }, { time: "06:30 Pm" }, { time: "07:00 Pm" }],
  },
];

function SlotCard({ time, date }: { time: string; date: string }) {
  return (
    <div className="border border-gray-700 rounded-xl w-full sm:w-[250px] max-w-[250px] py-6 flex flex-col items-center justify-between gap-3 shadow-sm bg-white">
      <p className="flex items-baseline justify-center gap-1 w-full text-[#1D3557] font-semibold text-lg mb-1">
        <span className="text-md">
          {time.includes("Am") || time.includes("am") ? "AM" : "PM"}
        </span>
        <span>{time.replace(/ (Pm|Am)/i, "")}</span>
      </p>
      <img
        src={father}
        alt="صورة أبونا"
        className="w-20 h-20 rounded-full object-cover mb-1"
      />
      <p className="font-semibold text-[18px] text-[#1D3557]">أبونا عيد عبيد</p>
      <p className="text-[14px] text-gray-400">01001637670</p>
      <p className="text-[14px] text-gray-400">مارجرجس شيراتون المطار</p>
      <p className="text-[14px] text-gray-400">{date}</p>
    </div>
  );
}

export default function ConfessionsPage() {
  const printRef = useRef<HTMLDivElement | null>(null);

 const exportToPdf = async () => {
  const pdf = new jsPDF("p", "mm", "a4");

  // 1. Load font file
  const fontBytes = await fetch("./../../assets/Almarai-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  // 2. Convert ArrayBuffer to base64 string
  const base64Font = btoa(
    new Uint8Array(fontBytes).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  // 3. Add font to jsPDF
  pdf.addFileToVFS("Almarai-Regular.ttf", base64Font);
  pdf.addFont("Almarai-Regular.ttf", "Almarai", "normal");
  pdf.setFont("Almarai");

  const pageWidth = pdf.internal.pageSize.getWidth();
  let y = 10;

  const img = new Image();
  img.src = father;
  await new Promise((resolve) => (img.onload = resolve));

  slotGroups.forEach((group) => {
    pdf.setFontSize(20);
    pdf.text(group.label, pageWidth - 10, y, { align: "right" });
    y += 10;

    group.slots.forEach((slot) => {
      pdf.setDrawColor(0);
      pdf.setLineWidth(0.2);
      pdf.roundedRect(10, y, pageWidth - 20, 45, 3, 3);

      pdf.setFontSize(14);
      pdf.text(`الميعاد: ${slot.time}`, pageWidth - 15, y + 10, { align: "right" });

      pdf.setFontSize(13);
      pdf.text("أبونا عيد عبيد", pageWidth - 15, y + 20, { align: "right" });

      pdf.setFontSize(12);
      pdf.text("01001637670", pageWidth - 15, y + 27, { align: "right" });

      pdf.text("مارجرجس شيراتون المطار", pageWidth - 15, y + 34, { align: "right" });

      pdf.text(`التاريخ: ${group.date}`, pageWidth - 15, y + 41, { align: "right" });

      pdf.addImage(img, "JPEG", 15, y + 5, 20, 20);

      y += 55;

      if (y > 250) {
        pdf.addPage();
        y = 10;
      }
    });

    y += 10;
  });

  pdf.save("mawaid_confessions.pdf");
};


  return (
    <div className="w-full flex px-4 py-3 ">
      <div ref={printRef} className="w-full px-6" dir="rtl">
        <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6 ">
          <div className="relative sm:absolute left-0 sm:left-3 top-0 sm:top-[-10px] flex flex-col sm:flex-row gap-3 mb-6 sm:mb-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => exportToPdf()}
              className="cursor-pointer flex items-center justify-center gap-2 border border-[#1D3557] text-[#1D3557] px-5 py-2 rounded-md text-sm font-semibold bg-white w-full sm:w-auto"
            >
              <span className="text-lg">🖨️</span>
              <span>طباعة</span>
            </button>
            <button
              type="button"
              onClick={() => window.open("https://calendar.google.com", "_blank")}
              className="cursor-pointer flex items-center justify-center gap-2 border border-[#1D3557] text-white px-5 py-2 rounded-md text-sm font-semibold bg-[#195E8B] hover:bg-[#1D3557] w-full sm:w-auto"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
              <span>إضافة مواعيد</span>
            </button>
          </div>
        </div>

        {slotGroups.map((group, index) => (
          <div
            key={group.id}
            className={index > 0 ? "pt-8 mt-8 border-t border-gray-200" : ""}
          >
            <h3 className="text-right text-2xl font-bold text-[#1D3557] mb-6">
              {group.label}
            </h3>
            <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-start items-center sm:items-start">
              {group.slots.map((slot, idx) => (
                <SlotCard
                  key={`${group.id}-${idx}`}
                  time={slot.time}
                  date={group.date}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
