import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
export default function AuthorsTable({ status, index, list, setChange }) {
  const location = useLocation();
  const unVerifyAuthors = async (id) => {
    try {
      setChange(true);
      const request = await axios.put(
        import.meta.env.VITE_BASE_URL + `admin/unverify/${id}`,
      );
      // console.log(request);
      toast.success(request.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    } finally {
      setChange(false);
    }
  };
  const verifyAuthors = async (id) => {
    try {
      setChange(true);
      const request = await axios.put(
        import.meta.env.VITE_BASE_URL + `admin/verify/${id}`,
      );
      // console.log(request);
      toast.success(request.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data);
        alert(error.response.data.message);
      }
    } finally {
      setChange(false);
    }
  };
  return (
    <tr className="border-y border-gray-300">
      <td className="px-2 py-4 text-center">{index + 1}</td>
      <td className="px-2 py-4">{list?.name}</td>
      <td className="px-2 py-4 max-sm:hidden">{list?.email}</td>
      <td className="px-2 py-4 max-sm:hidden">{list?.topics + " "}</td>
      <td>
        <Link to={list?.link} target="_blank" className="text-blue-600">
          {list?.link}
        </Link>
      </td>
      {location.pathname === "/admin/author-list" ? (
        <td className="px-2 py-4 flex items-center gap-3">
          {status === "verified" ? (
            <button
              className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
              onClick={() => unVerifyAuthors(list._id)}
            >
              Unverified
            </button>
          ) : (
            <button
              className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600"
              onClick={() => verifyAuthors(list._id)}
            >
              Verified
            </button>
          )}
        </td>
      ) : (
        ""
      )}
    </tr>
  );
}
