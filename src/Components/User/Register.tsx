import type React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import RegisterPassword from "./RegisterPassword";
import { Link } from "react-router";

export default function Register() {
  const [step, setStep] = useState<number>(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<{
    fullName: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    profileImageUrl: string | null;
    churchTitle: string;
    confessionFather: string;
  } | null>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      dateOfBirth: "",
      churchTitle: "",
      confessionFather: "",
    },
    onSubmit: (values) => {
      // This won't be called directly, handleNext will validate and move to step 2
    },
  });

  const validateStepOne = (): boolean => {
    const v = formik.values;
    if (!v.fullName || !v.phoneNumber || !v.address || !v.dateOfBirth) {
      setError("الرجاء تعبئة جميع الحقول الأساسية");
      return false;
    }
    if (!v.churchTitle || !v.confessionFather) {
      setError("الرجاء اختيار الكنيسة وأب الاعتراف");
      return false;
    }
    setError(null);
    return true;
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateStepOne()) {
      setUserData({
        fullName: formik.values.fullName,
        phoneNumber: formik.values.phoneNumber,
        address: formik.values.address,
        dateOfBirth: formik.values.dateOfBirth,
        profileImageUrl: profileImage,
        churchTitle: formik.values.churchTitle,
        confessionFather: formik.values.confessionFather,
      });
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  if (step === 2 && userData) {
    return <RegisterPassword userData={userData} onBack={handleBack} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-[-10px]">
      <form onSubmit={formik.handleSubmit}>
        {step === 1 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-right text-gray-700 text-sm font-medium mb-2"
                >
                  رقم التليفون
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right text-gray-800 placeholder-gray-400"
                  placeholder="رقم التليفون"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-right text-gray-700 text-sm font-medium mb-2"
                >
                  الاسم
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right text-gray-800 placeholder-gray-400"
                  placeholder="الأسم"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-right text-gray-700 text-sm font-medium mb-2"
                >
                  تاريخ الميلاد
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right text-gray-800 placeholder-gray-400"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-right text-gray-700 text-sm font-medium mb-2"
                >
                  العنوان
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right text-gray-800 placeholder-gray-400"
                  placeholder="العنوان"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="confessionFather"
                  className="block text-right text-gray-700 text-sm font-medium mb-2"
                >
                  أب الاعتراف
                </label>
                <select
                  id="confessionFather"
                  name="confessionFather"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right text-gray-800 bg-white"
                  value={formik.values.confessionFather}
                  onChange={formik.handleChange}
                >
                  <option value="">أب الاعتراف</option>
                  <option value="father1">أبونا أنطونيوس</option>
                  <option value="father2">أبونا بيشوي</option>
                  <option value="father3">أبونا مكاريوس</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="church"
                  className="block text-right text-gray-700 text-sm font-medium mb-2"
                >
                  الكنيسة
                </label>
                <select
                  id="churchTitle"
                  name="churchTitle"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right text-gray-800 bg-white"
                  value={formik.values.churchTitle}
                  onChange={formik.handleChange}
                >
                  <option value="">الكنيسة</option>
                  <option value="church1">الكنيسة 1</option>
                  <option value="church2">الكنيسة 2</option>
                  <option value="church3">الكنيسة 3</option>
                </select>
              </div>
            </div>

            <div className="mb-3 mx-auto">
              <label className="block text-right text-gray-700 text-sm font-medium mb-2">
                اختار صورة{" "}
              </label>
              <div className="flex items-center justify-end gap-4">
                <span
                  className={`text-sm ${
                    profileImage ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {profileImage ? "" : "لا يوجد صورة"}
                </span>
                {!profileImage && (
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center justify-center w-28 h-10 text-black hover:text-blue-600 rounded-md cursor-pointer border-1 py-2"
                    title="اختار صورة"
                  >
                    اختار صورة
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
                {profileImage && (
                  <div className=" flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setProfileImage(null)}
                      className="text-red-600 text-sm hover:text-red-800"
                    >
                      إزالة الصورة
                    </button>
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-4 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleNext}
                className="w-48  cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-lg transition duration-200"
              >
                التالى
              </button>
            </div>
          </>
        )}
      </form>

      <div className="text-center mt-3">
        <span className="text-gray-600 text-sm">لديك حساب بالفعل؟ </span>
        <Link
          to="/Login"
          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition duration-200"
        >
          دخول
        </Link>
      </div>
    </div>
  );
}
