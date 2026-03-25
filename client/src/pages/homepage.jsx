import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Bloglist from "../components/Bloglist";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
export default function HomePage() {
  const [login, setLogin] = useState(false);
  const verifyAuth = async () => {
    try {
      const request = await axios.get(
        import.meta.env.VITE_BASE_URL + "auth/auth-user",
        {
          withCredentials: true,
        },
      );
      setLogin(true);
      localStorage.setItem("role", request.data.role);
      localStorage.setItem("verified", true);
    } catch (error) {
      if (error.response) {
        // console.log(error.response);
      }
    }
  };
  useEffect(() => {
    verifyAuth();
  }, []);
  return (
    <>
      <Navbar login={login} />
      <Header />
      <Bloglist />
      <Newsletter />
      <Footer />
    </>
  );
}
