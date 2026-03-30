import axios from "axios";
import Logo from "../assets/logo.svg";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Navbar({ login }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const verified = localStorage.getItem("verified");
  const logout = async () => {
    try {
      const request = await axios.delete(
        import.meta.env.VITE_BASE_URL + "auth/logout",
        { withCredentials: true },
      );
      // console.log(request);
      localStorage.removeItem("role");
      localStorage.removeItem("verified");
      navigate("/");
      toast.success(request.data.message, {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  return (
    <header className="relative">
      <nav className="flex justify-between items-center py-2 mx-8 sm:mx-6 ">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="compnay_logo" className="w-20 md:w-28" />
          <span className="text-xl font-semibold ">QuoBlog</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          {login || verified ? (
            <div className="flex items-center justify-center gap-3">
              {/* admin panel button */}
              {role === "admin" ? (
                <button
                  className="rounded-md text-base cursor-pointer bg-blue-500 text-white px-10 py-2.5 hover:underline hover:text-[15px] underline-offset-2 transition-all"
                  onClick={() => navigate("/admin")}
                >
                  Admin Panel
                </button>
              ) : (
                <button
                  className="rounded-md text-base cursor-pointer bg-blue-500 text-white px-10 py-2.5 hover:underline hover:text-[15px] underline-offset-2 transition-all"
                  onClick={() => navigate("/author")}
                >
                  Author Panel
                </button>
              )}

              {/* logout button */}
              <button
                className="flex items-center justify-center gap-2 rounded-md text-sm cursor-pointer bg-blue-500 text-white px-10 py-2.5 active:bg-blue-700"
                onClick={() => logout()}
              >
                Logout
                <MoveRight />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              {/* become an author button */}
              <button
                className="rounded-md text-base cursor-pointer bg-blue-500 text-white px-10 py-2.5 hover:underline hover:text-[15px] underline-offset-2 transition-all"
                onClick={() => navigate("/become-author")}
              >
                Become An Author
              </button>
              {/* login button */}
              <button
                className="flex items-center justify-center gap-2 rounded-md text-sm cursor-pointer bg-blue-500 text-white px-10 py-2.5 active:bg-blue-700"
                onClick={() => navigate("/login")}
              >
                Login
                <MoveRight />
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
