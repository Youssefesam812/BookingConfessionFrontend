// Network calls disabled — using local mock login
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    onSubmit: async (values) => {
      setError(null);
      try {
        // Simple local mock: accept any non-empty phone and password
        if (!values.phoneNumber || !values.password) {
          setError("يرجى إدخال رقم التليفون وكلمة السر");
          return;
        }
        const mockToken = "mock-token-login-123";
        const mockUser = {
          id: String(Date.now()),
          fullName: "مستخدم تجريبي",
          phoneNumber: values.phoneNumber,
          address: "",
          dateOfBirth: "",
          profileImageUrl: null,
          churchTitle: "",
          confessionFather: "",
          role: "member",
        };
        setAuth(mockToken, mockUser);
        navigate("/");
      } catch (err: any) {
        setError("حدث خطأ أثناء تسجيل الدخول");
      }
    },
  });

  return (
    <div className="w-full max-w-md mx-auto rtl">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
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
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-right text-gray-700 text-sm font-medium mb-2"
          >
            كلمة السر
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right text-gray-800 placeholder-gray-400"
              placeholder="كلمة السر"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <button
              type="button"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}
        <div className="mb-6 text-right">
          <Link
            to="/forgot-password"
            className=" hover:text-blue-800 text-sm transition duration-200 underline"
          >
            نسيت كلمة السر؟
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-lg transition duration-200 mb-4"
        >
          دخول
        </button>
      </form>
      <div className="text-center mb-6">
        <span className="text-gray-600 text-sm">ليس لديك حساب؟ </span>
        <Link
          to="/register"
          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition duration-200"
        >
          تسجيل
        </Link>
      </div>
      <div className="flex items-center mb-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">او</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <div className="text-center">
        <Link
          to="/father-login"
          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition duration-200 inline-block"
        >
          الدخول ك (اب كاهن)
        </Link>
      </div>
    </div>
  );
}
