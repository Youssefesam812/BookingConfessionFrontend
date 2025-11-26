import { Link, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const navLinks = [
  { label: "بياناتي", href: "/profile" },
  { label: "مواعيد القداسات", href: "/mass-time" },
  { label: "اعترافي", href: "/my-confessions" },
  { label: "حجز اعترافات", href: "/" },
];

export default function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveLink = (href: any) => {
    return location.pathname === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="w-full bg-white/30 mt-10 backdrop-blur-md shadow-md px-4 md:px-12 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={"/src/assets/images/Logo.png"}
            alt="Logo"
            className="w-16 h-16 rounded-full border-2 border-white bg-white/80 object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6 md:gap-10 text-lg font-semibold text-gray-900">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={`px-2 pb-1 border-b-2 transition-colors duration-200 ${
                    isActiveLink(link.href)
                      ? "border-gray-900 text-gray-900 font-bold"
                      : "border-transparent hover:border-gray-700 hover:text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative cursor-pointer hidden md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 23c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />

              <path d="M6 16v-4.2c0-4.3 2.3-7.8 6-7.8s6 3.5 6 7.8V16l2 2v1H4v-1l2-2z" />

              <path d="M20.9 4.2c.7.7 2.1 2.6 2.1 3.8s-.4 2.1-1.1 2.8" />

              <path d="M3.4 4.2c-.7.7-2.1 2.6-2.1 3.8s.4 2.1 1.1 2.8" />
            </svg>
          </button>
          <Link to="/profile" className="hidden md:flex items-center gap-2 cursor-pointer">
            <span className="text-gray-900 font-semibold">
              {user?.fullName || "ضيف"}
            </span>
            <img
              src={
                user?.profileImageUrl ||
                "https://randomuser.me/api/portraits/men/32.jpg"
              }
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          ></div>

          {/* Menu Content */}
          <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user?.profileImageUrl ||
                      "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                  />
                  <span className="text-gray-900 font-semibold text-lg">
                    {user?.fullName || "ضيف"}
                  </span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="text-gray-600 hover:text-gray-900"
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-2 px-4">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={closeMobileMenu}
                        className={`block px-4 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 ${
                          isActiveLink(link.href)
                            ? "bg-gray-900 text-white"
                            : "text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer with Notification */}
              <div className="border-t p-6">
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 23c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
                    <path d="M6 16v-4.2c0-4.3 2.3-7.8 6-7.8s6 3.5 6 7.8V16l2 2v1H4v-1l2-2z" />
                    <path d="M20.9 4.2c.7.7 2.1 2.6 2.1 3.8s-.4 2.1-1.1 2.8" />
                    <path d="M3.4 4.2c-.7.7-2.1 2.6-2.1 3.8s.4 2.1 1.1 2.8" />
                  </svg>
                  <span className="text-gray-900 font-semibold">الإشعارات</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
