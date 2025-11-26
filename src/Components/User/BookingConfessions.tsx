import React, { useEffect, useState } from "react";
import { Link } from "react-router";

type Priest = {
  id: string;
  fullName: string;
  profileImageUrl: string | null;
};

// Using static mock data for priests (no network endpoints)

export default function BookingConfessions() {
  const [priests, setPriests] = useState<Priest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const MOCK_PRIESTS: Priest[] = [
      { id: "p1", fullName: "القس يوسف", profileImageUrl: null },
      { id: "p2", fullName: "الأب سمير", profileImageUrl: null },
      { id: "p3", fullName: "القس بولا", profileImageUrl: null },
    ];
    setTimeout(() => {
      setPriests(MOCK_PRIESTS);
      setLoading(false);
    }, 250);
  }, []);

  let content;
  if (loading) {
    content = (
      <div className="col-span-4 text-center text-lg">جاري التحميل...</div>
    );
  } else if (priests.length > 0) {
    content = priests.map((priest) => (
      <div
        key={priest.id}
        className="shadow-lg flex flex-col items-center overflow-hidden transition-transform hover:scale-105"
      >
        <Link
          to={`/father-booking-confessions/${priest.id}`}
          state={{
            priestName: priest.fullName,
            priestImage: priest.profileImageUrl,
          }}
          className="w-full"
        >
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden rounded-xl">
            <img
              src={priest.profileImageUrl || "/src/assets/images/Logo.png"}
              alt={priest.fullName}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full">
            <button className="w-full rounded-xl py-3 text-lg font-bold bg-white/30 mt-1 backdrop-blur-md shadow-md focus:outline-none">
              {priest.fullName}
            </button>
          </div>
        </Link>
      </div>
    ));
  } else {
    content = (
      <div className="col-span-4 text-center text-lg">
        لا يوجد كهنة متاحين حاليا
      </div>
    );
  }

  return (
    <main
      className="flex-1 flex flex-col items-center justify-center px-8 md:px-0 pb-12"
      dir="rtl"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {content}
      </div>
    </main>
  );
}
