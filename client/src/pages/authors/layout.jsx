import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function AuthorLayout() {
  const navigate = useNavigate();
  const verifyAuth = async () => {
    try {
      const request = await axios.get(
        import.meta.env.VITE_BASE_URL + "auth/auth-user",
        {
          withCredentials: true,
        },
      );
      // console.log(request);
      if (localStorage.getItem("role") !== "author") navigate("/");
    } catch (error) {
      if (error.response) {
        // console.log(error.response);
        navigate("/");
      }
    }
  };
  useEffect(() => {
    verifyAuth();
  }, [navigate]);
  return (
    <main>
      <Navbar />
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
}
