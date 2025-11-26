import UserLayout from "./Layouts/UserLayout";
import DashboardLayout from "./Layouts/DashboardLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./Layouts/AuthLayout";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import FatherLogin from "./Components/User/FatherLogin";
import ForgetPassword from "./Components/User/ForgetPassword";
import FatherBookingConfessions from "./Components/User/FatherBookingConfessions";
import ConfessionsPage from "./Components/Dashboard/ConfessionsPage";
import MassTime from "./Components/User/MassTime";
import Profile from "./Components/User/Profile";
import MyConfessions from "./Components/User/MyConfessions";
import CreateMassTime from "./Components/Dashboard/CreateMassTime";
import AddEvent from "./Components/Dashboard/AddEvent";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/father-booking-confessions/:priestId",
          element: <FatherBookingConfessions />,
        },
        {
          path: "/my-confessions",
          element: <MyConfessions />,
        },
        {
          path: "/mass-time",
          element: <MassTime />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "father-login",
          element: <FatherLogin />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgot-password",
          element: <ForgetPassword />,
        },
        {
          path: "*",
          element: <div>404 - Page Not Found</div>,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
       {
          index: true,
          element: <ConfessionsPage />,
        },
        {
          path: "confessions",
          element: <ConfessionsPage />,
        },
        {
          path: "mass-times",
          element: <CreateMassTime />,
        },
        {
          path: "mass-times/add-event",
          element: <AddEvent />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
