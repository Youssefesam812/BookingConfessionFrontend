import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import cardBackground from "../../assets/images/Subtract.png";
import imageCard from "../../assets/images/26e2109ce02352bf1e8cab9791a32115a25d0186.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
interface BookingResponse {
  id: number;
  memberId: string;
  memberName: string;
  memberPhone: string;
  timeSlotId: number;
  startTime: string;
  endTime: string;
  bookedAt: string;
  status: string;
  priestName: string;
  priestId: string;
  priestPhone: string;
  notes: string;
}

export default function MyConfessions() {
  const { user } = useAuth();
  const [confessionSessions, setConfessionSessions] = useState<
    BookingResponse[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyConfessions();
  }, []);

  const fetchMyConfessions = async () => {
    setLoading(true);
    setError(null);

    // Static mock data
    const MOCK_CONFESSIONS: BookingResponse[] = [
      {
        id: 101,
        memberId: user?.id || "1",
        memberName: "أحمد علي",
        memberPhone: "+201234567890",
        timeSlotId: 1,
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        endTime: new Date(
          Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 30
        ).toISOString(),
        bookedAt: new Date().toISOString(),
        status: "confirmed",
        priestName: "القس بواب",
        priestId: "p1",
        priestPhone: "+201112223334",
        notes: "لا ملاحظات",
      },
      {
        id: 102,
        memberId: user?.id || "1",
        memberName: "منى صالح",
        memberPhone: "+201098765432",
        timeSlotId: 2,
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
        endTime: new Date(
          Date.now() + 1000 * 60 * 60 * 48 + 1000 * 60 * 30
        ).toISOString(),
        bookedAt: new Date().toISOString(),
        status: "pending",
        priestName: "الأب سمير",
        priestId: "p2",
        priestPhone: "+201155667788",
        notes: "يرجى الحضور قبل الموعد بعشر دقائق",
      },
      {
        id: 103,
        memberId: user?.id || "1",
        memberName: "خالد محمود",
        memberPhone: "+201376543210",
        timeSlotId: 3,
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        endTime: new Date(
          Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 30
        ).toISOString(),
        bookedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        status: "completed",
        priestName: "القس يوسف",
        priestId: "p3",
        priestPhone: "+201177889900",
        notes: "تم بنجاح",
      },
      {
        id: 103,
        memberId: user?.id || "1",
        memberName: "خالد محمود",
        memberPhone: "+201376543210",
        timeSlotId: 3,
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        endTime: new Date(
          Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 30
        ).toISOString(),
        bookedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        status: "completed",
        priestName: "القس يوسف",
        priestId: "p3",
        priestPhone: "+201177889900",
        notes: "تم بنجاح",
      },
      {
        id: 103,
        memberId: user?.id || "1",
        memberName: "خالد محمود",
        memberPhone: "+201376543210",
        timeSlotId: 3,
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        endTime: new Date(
          Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 30
        ).toISOString(),
        bookedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        status: "completed",
        priestName: "القس يوسف",
        priestId: "p3",
        priestPhone: "+201177889900",
        notes: "تم بنجاح",
      },
      {
        id: 103,
        memberId: user?.id || "1",
        memberName: "خالد محمود",
        memberPhone: "+201376543210",
        timeSlotId: 3,
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        endTime: new Date(
          Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 30
        ).toISOString(),
        bookedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        status: "completed",
        priestName: "القس يوسف",
        priestId: "p3",
        priestPhone: "+201177889900",
        notes: "تم بنجاح",
      },
    ];

    setTimeout(() => {
      setConfessionSessions(MOCK_CONFESSIONS);
      setLoading(false);
    }, 300);
  };

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<BookingResponse | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const openCancelModal = (session: BookingResponse) => {
    setSelectedSession(session);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setSelectedSession(null);
    setCancelModalOpen(false);
  };

  const confirmCancelBooking = async () => {
    if (!selectedSession) return;
    setConfessionSessions((prev) =>
      prev.filter((b) => b.id !== selectedSession.id)
    );
    closeCancelModal();
    setSuccessModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString("ar-EG", options);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ar-EG", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="w-full px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-3xl p-6 h-64"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchMyConfessions}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              حاول مرة أخرى
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (confessionSessions.length === 0) {
    return (
      <div className="w-full px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
            <p className="text-stone-600 text-lg">
              لا توجد حجوزات اعتراف حالية
            </p>
            <button
              onClick={fetchMyConfessions}
              className="mt-4 px-6 py-2 bg-stone-600 text-white rounded-full hover:bg-stone-700 transition-colors"
            >
              تحديث
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-6 lg:px-32 py-14">
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 40px !important;
          height: 40px !important;
          background: rgba(255, 255, 255, 0.7) !important;
          border: 1px solid #d6d3d1 !important;
          border-radius: 50% !important;
          color: #44403c !important;
          padding: 10px !important;
        }

        .swiper-button-next {
          right: 0px !important;
        }

        .swiper-button-prev {
          left: 0px !important;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: white !important;
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: bold !important;
        }
        
        .swiper-button-disabled {
          opacity: 0.4 !important;
          cursor: not-allowed !important;
        }
        
        .swiper-pagination-bullet {
          background: #78716c !important;
          opacity: 0.5 !important;
        }
        
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
        }
      `}</style>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: -50,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: -20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: -40,
          },
        }}
        className="mySwiper pb-12"
      >
        {confessionSessions.map((session) => {
          const isCancellable = session.status.toLowerCase() === "confirmed";
          return (
            <SwiperSlide key={session.id}>
              <div className="flex justify-center">
                <div className="relative w-[250px]">
                  <div
                    className="relative h-[470px] w-full flex flex-col items-stretch justify-center bg-no-repeat bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${cardBackground})`,
                    }}
                  >
                    <div className="flex flex-col h-full px-8 pt-10 pb-8">
                      <div className="flex justify-center mb-4">
                        <img
                          src={imageCard}
                          alt="Priest Avatar"
                          className="w-28 h-28 rounded-full object-cover"
                        />
                      </div>
                      <div className="text-center mb-4" dir="rtl">
                        <h2 className="text-lg font-semibold text-stone-900 leading-tight">
                          {session.priestName}
                        </h2>
                      </div>
                      <div
                        className="space-y-2 mt-5 flex flex-col gap-2"
                        dir="rtl"
                      >
                        <div className="flex items-center justify-center gap-3 text-stone-800">
                          <Calendar className="w-5 h-5 flex-shrink-0" />
                          <span className="text-md font-semibold text-right">
                            {formatDate(session.startTime)}
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-stone-800">
                          <Clock className="w-5 h-5 flex-shrink-0" />
                          <span className="text-md font-semibold text-right">
                            {formatTime(session.startTime)}
                          </span>
                        </div>
                      </div>
                      {isCancellable && (
                        <div
                          className="mt-auto flex justify-center mb-5"
                          dir="rtl"
                        >
                          <button
                            onClick={() => openCancelModal(session)}
                            className="w-[125px] py-1 text-sm font-semibold text-red-800 border-2 border-red-800 bg-transparent hover:bg-red-50 rounded-full transition-all duration-200"
                          >
                            الغاء
                          </button>
                        </div>
                      )}
                      {!isCancellable && (
                        <div
                          className="mt-auto flex justify-center mb-5"
                          dir="rtl"
                        >
                          <button
                            disabled
                            className="w-[125px] py-1 text-sm font-semibold text-gray-700 border-1 border-gray-700 bg-transparent rounded-full cursor-not-allowed"
                          >
                            تمت{" "}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Cancel confirmation modal */}
      {cancelModalOpen && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeCancelModal}
          />
          <div
            className="relative bg-white rounded-2xl w-11/12 max-w-[350px] mx-auto p-10 shadow-lg"
            dir="rtl"
          >
            <div className="flex flex-col items-center">
              <img
                src={imageCard}
                alt="Priest"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">الغاء الحجز</h3>
              <p className="text-sm text-stone-900 text-center mb-4">
                هل أنت متأكد من الغاء حجز جلسة اعتراف مع{" "}
                {selectedSession.priestName} يوم{" "}
                {formatDate(selectedSession.startTime)} الساعة{" "}
                {formatTime(selectedSession.startTime)}؟
              </p>
              <div className="flex flex-col justify-center items-center gap-4 w-full mt-2">
                <button
                  onClick={confirmCancelBooking}
                  className="w-50 bg-blue-600 text-white py-2 rounded-xl cursor-pointer"
                >
                  تأكيد
                </button>
                <button
                  onClick={closeCancelModal}
                  className="w-50 bg-transparent border border-stone-300 text-stone-700 py-2 rounded-xl cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Success modal */}
      {successModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSuccessModalOpen(false)}
          />
          <div
            className="relative bg-white rounded-2xl w-11/12 max-w-[350px] mx-auto p-10 shadow-lg flex flex-col items-center"
            dir="rtl"
          >
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="white"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">تم إلغاء الحجز</h3>
            <button
              onClick={() => setSuccessModalOpen(false)}
              className="mt-4 bg-transparent text-stone-900 py-2 px-6 cursor-pointer"
            >
              اغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
