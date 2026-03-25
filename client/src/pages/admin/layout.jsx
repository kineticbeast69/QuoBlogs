import Sidebar from "../../components/admin/sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Layout() {
  const navigate = useNavigate();
  const verifyAuth = async () => {
    try {
      const request = await axios.get(
        import.meta.env.VITE_BASE_URL + "auth/auth-user",
        {
          withCredentials: true,
        },
      );
      if (localStorage.getItem("role") !== "admin") navigate("/");
      // console.log(request);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        navigate("/");
      }
    }
  };
  useEffect(() => {
    verifyAuth();
  }, [navigate]);
  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
