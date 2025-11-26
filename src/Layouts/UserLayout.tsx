import BackgroundForUser from "../assets/images/BackgroundForUser.jpg";
import { Outlet } from "react-router";
import Header from "../Components/User/Header";

export default function UserLayout() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat bg-fixed bg-center relative"
      style={{
        backgroundImage: `url(${BackgroundForUser})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Bright overlay layer */}
      <div className="absolute inset-0 bg-white/15 z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen overflow-hidden">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
