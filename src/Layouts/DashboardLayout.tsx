import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import logo from "../assets/images/Logo.png";
import { Church, Clock, Menu, X } from "lucide-react";
import father from "../assets/images/26e2109ce02352bf1e8cab9791a32115a25d0186.jpg";

const TABS = [
  {
    to: "/dashboard/confessions",
    label: "مواعيد الاعترافات",
    icon: Clock,
  },
  {
    to: "/dashboard/mass-times",
    label: "مواعيد القداسات",
    icon: Church,
  },
];

const DashboardLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentTitle = (() => {
    if (location.pathname.includes("confessions")) return "مواعيد الاعترافات";
    if (location.pathname.includes("mass")) return "مواعيد القداسات";
    return "لوحة التحكم";
  })();

  return (
    <div className="h-screen w-full bg-[#F9F9F9] rtl">
      <div className="flex w-full h-full">
        <div className="flex-1 flex flex-col min-h-0">
          <header className="flex items-center justify-between px-6 py-4 mt-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
              <div className="flex items-center gap-2 border-1 border-gray-200 rounded-lg px-5 py-1">
                <div className="text-sm font-semibold text-gray-800 ">
                  أبونا موسى فتحي
                </div>
                <img
                  src={father}
                  alt="priest avatar"
                  className="w-10 h-10 rounded-xl object-cover "
                />
              </div>
            </div>

            <div className="flex flex-col items-end">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {currentTitle}
              </h1>
            </div>
          </header>

          {/* page content */}
          <main className="flex-1 px-6 py-6 overflow-auto flex justify-center items-start min-h-0 border-1 border-gray-200 rounded-lg my-0 mx-6">
            <div className="w-full">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* right sidebar */}
        <aside
          className={`
            fixed lg:relative top-0 right-0 h-full w-64 bg-white border-l border-gray-100 
            flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "translate-x-full lg:translate-x-0"
            }
          `}
        >
          <div>
            <div className="flex flex-col items-center py-8 ">
              <img src={logo} alt="logo" className="w-20 h-20 object-contain" />
            </div>

            <nav className="flex flex-col gap-2 px-4 text-sm">
              {TABS.map((tab) => {
                const active =
                  location.pathname === "/dashboard"
                    ? tab.to.endsWith("/confessions")
                    : location.pathname.startsWith(tab.to);

                const Icon = tab.icon;
                return (
                  <NavLink
                    key={tab.to}
                    to={tab.to}
                    onClick={() => setIsSidebarOpen(false)}
                    className={() =>
                      `flex items-center justify-end px-8 py-2 rounded-xl transition-colors text-right gap-3 ${
                        active
                          ? " bg-[#E7EDF2] text-[#195E8B]"
                          : " text-[#0F3B58] hover:bg-slate-50"
                      }`
                    }
                  >
                    <span>{tab.label}</span>
                    <Icon
                      className={`w-5 h-5 ${
                        active ? "text-[#195E8B]" : "text-[#0F3B58]"
                      }`}
                    />
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className=" px-4 py-12 flex flex-col gap-3">
            <div className="h-px bg-slate-200" />
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <button className="flex items-center justify-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-gray-800">
                <span>تسجيل خروج</span>
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="grey"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
