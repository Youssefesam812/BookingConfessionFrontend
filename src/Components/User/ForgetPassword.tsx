import { Link } from "react-router";

export default function ForgetPassword() {
  return (
    <div className="w-full max-w-md mx-auto rtl">
      <div className="mb-6">
        <label
          htmlFor="phone"
          className="block text-right text-gray-700 text-sm font-medium mb-2"
        >
          رقم التليفون
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right text-gray-800 placeholder-gray-400"
          placeholder="رقم التليفون"
        />
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-lg transition duration-200 mb-4">
        إرسال
      </button>
      <div className="text-center mb-6">
        <span className="text-gray-600 text-sm">تذكر كلمة السر؟ </span>
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition duration-200"
        >
          تسجيل دخول
        </Link>
      </div>
    </div>
  );
}
