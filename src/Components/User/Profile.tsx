import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

const churches = [
  "مارجرجس منشية التحرير",
  "مارمينا مدينة نصر",
  "العذراء الزيتون",
];

const fathers = ["ابونا موسى فتحي", "ابونا ارساني سيمون", "ابونا يوحنا وديع"];

// Using local stored user instead of remote profile endpoint

type User = {
  id?: string;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  profileImageUrl?: string | null;
  churchTitle?: string;
  confessionFather?: string;
  role?: string;
};

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setFormData(parsedUser);
      } catch (e) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Update localStorage with new data
    localStorage.setItem("authUser", JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original user data
    setFormData(user || {});
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-xl">
        جاري التحميل...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-0 py-8">
      {/* Profile Card */}
      <div className="w-full flex flex-col items-center overflow-hidden">
        {/* Avatar, Name - Fully Transparent */}
        <div className="w-full flex flex-col items-center bg-transparent relative mb-5">
          <img
            src={
              user?.profileImageUrl ||
              "https://randomuser.me/api/portraits/men/32.jpg"
            }
            alt="User"
            className="w-24 h-24 rounded-full shadow-lg object-cover mb-2"
          />
          <div className="text-2xl font-bold text-gray-900">
            {user?.fullName || "اسم المستخدم"}
          </div>
        </div>
        {/* Section Title - Not Transparent (Fully Opaque) */}
        <div className="w-full bg-white py-4 text-center text-2xl font-extrabold text-gray-900 ">
          بياناتي
        </div>
        {/* Form - Semi Transparent */}
        <form className="w-full flex justify-center py-8 bg-white/40">
          <div className="grid grid-cols-1 w-75 md:w-auto md:grid-cols-3 gap-x-36 gap-y-6 px-1">
            {/* Phone */}
            <div className="flex flex-col gap-1 ">
              <label className="font-semibold text-gray-800 mb-1 text-right">
                رقم التليفون
              </label>
              <input
                type="text"
                className="rounded-xl border border-black px-2 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent w-full md:w-56 h-10"
                value={formData?.phoneNumber || ""}
                readOnly={!isEditing}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </div>
            {/* Birthdate */}
            <div className="flex flex-col gap-1 ">
              <label className="font-semibold text-gray-800 mb-1 text-right">
                تاريخ الميلاد
              </label>
              <div className="relative">
                <input
                  type={isEditing ? "date" : "text"}
                  className="rounded-xl border border-black px-2 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent w-full md:w-56 h-10"
                  value={
                    isEditing
                      ? formData?.dateOfBirth || ""
                      : formData?.dateOfBirth
                      ? new Date(formData.dateOfBirth).toLocaleDateString()
                      : ""
                  }
                  readOnly={!isEditing}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                />
                {!isEditing && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v11.25M3 18.75A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75M3 18.75v-1.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 17.25v1.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </div>
            {/* Name */}
            <div className="flex flex-col gap-1 ">
              <label className="font-semibold text-gray-800 mb-1 text-right">
                الاسم
              </label>
              <input
                type="text"
                className="rounded-xl border border-black px-2 py-1 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent w-full md:w-56 h-10"
                value={formData?.fullName || ""}
                readOnly={!isEditing}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </div>
            {/* Address */}
            <div className="flex flex-col gap-1 ">
              <label className="font-semibold text-gray-800 mb-1 text-right">
                العنوان
              </label>
              <input
                type="text"
                className="rounded-xl border border-black px-2 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent w-full md:w-56 h-10"
                value={formData?.address || ""}
                readOnly={!isEditing}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            {/* Church */}
            <div className="flex flex-col gap-1 ">
              <label className="font-semibold text-gray-800 mb-1 text-right">
                الكنيسة
              </label>
              <select
                className="rounded-xl border border-black px-2 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent w-full md:w-56 h-10"
                disabled={!isEditing}
                value={formData?.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
              >
                {churches.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            {/* Father */}
            <div className="flex flex-col gap-1 ">
              <label className="font-semibold text-gray-800 mb-1 text-right">
                اب الاعتراف
              </label>
              <select
                className="rounded-xl border border-black px-2 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent w-full md:w-56 h-10"
                disabled={!isEditing}
                value={formData?.confessionFather || ""}
                onChange={(e) =>
                  handleInputChange("confessionFather", e.target.value)
                }
              >
                {fathers.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            {/* Password and Confirm Password - Centered */}
            <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row justify-center md:gap-32 gap-6 w-full">
              {/* Password */}
              <div className="flex flex-col gap-1 items-end w-full md:w-auto">
                <label className="font-semibold text-gray-800 mb-1 text-right">
                  كلمة السر
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="rounded-xl border border-black px-2 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent pl-10 w-full md:w-56 h-10"
                    placeholder="كلمة السر"
                    readOnly={!isEditing}
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* Confirm Password */}
              <div className="flex flex-col gap-1 items-end w-full md:w-auto">
                <label className="font-semibold text-gray-800 mb-1 text-right">
                  تاكيد كلمة السر
                </label>
                <div className="relative w-full">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="rounded-xl border border-black px-2 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent pl-10 w-full md:w-56 h-10"
                    placeholder="تاكيد كلمة السر"
                    readOnly={!isEditing}
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirm((v) => !v)}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* Buttons - Semi Transparent */}
        <div className="w-full flex justify-center gap-8 py-6  ">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-10 py-2 bg-blue-600 text-white cursor-pointer rounded-lg text-lg font-bold shadow hover:bg-blue-700 transition-colors duration-150"
            >
              تعديل
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-10 py-2 bg-blue-600 text-white cursor-pointer rounded-lg text-lg font-bold shadow hover:bg-blue-700 transition-colors duration-150"
              >
                حفظ
              </button>
              <button
                onClick={handleCancel}
                className="px-10 py-2 bg-transparent text-gray-800 cursor-pointer rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors duration-150"
              >
                رجوع
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
