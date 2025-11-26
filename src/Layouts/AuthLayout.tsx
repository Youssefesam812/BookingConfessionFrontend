import leftBg from "../assets/images/leftImage.jpg";
import logo from "../assets/images/Logo.png";
import BackgroundImage from "../assets/images/BackgroudImage.jpg";
import fathersBackground from "../assets/images/fathers.jpg";
import { Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const location = useLocation();
  const isFatherLogin = location.pathname === "/father-login";

  return (
    <div className="min-h-screen w-full bg-[#222] flex flex-col lg:flex-row">
      <div
        className="relative flex-1 flex items-center justify-center min-h-[60vh] lg:min-h-screen bg-contain bg-center"
        style={{
          backgroundImage: `url(${isFatherLogin ? fathersBackground : leftBg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px] z-10" />

        <img
          src={logo}
          alt="Logo"
          className="hidden sm:block w-44 h-44 lg:w-55 lg:h-55 xl:w-60 xl:h-60 object-contain rounded-full z-20 shadow-lg bg-white p-4"
        />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center bg-white min-h-[60vh] lg:min-h-screen py-8 lg:py-0">
        <div
          className="absolute inset-0 opacity-[0.04] z-0 bg-contain bg-center"
          style={{
            backgroundImage: `url(${BackgroundImage})`,
          }}
        />
        <img
          src={logo}
          alt="Logo"
          className="w-20 h-20 lg:w-24 lg:h-24 xl:w-36 xl:h-36 object-contain mb-4 lg:mb-6 mt-4 lg:mt-6 z-10"
        />

        <h2 className="font-semibold text-xl lg:text-2xl xl:text-3xl text-[#222] mb-6 lg:mb-8 text-center z-10 font-noto-arabic rtl max-w-[90%] lg:max-w-[80%] px-4">
          كنيسة الشهيد العظيم مارجرجس منشية التحرير
        </h2>

        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg px-4 sm:px-6  z-10 mb-8 lg:mb-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
