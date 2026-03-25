import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
export default function BlogsTable({ status, list, serial, setChange }) {
  const location = useLocation();
  const publicBlog = async (id) => {
    try {
      setChange(true);
      const request = await axios.put(
        import.meta.env.VITE_BASE_URL + `admin/public/${id}`,
      );
      // console.log(request);
      setChange(false);
      toast.success(request.data.message, {
        position: "top-right",
        theme: "dark",
        autoClose: 5000,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  const privateBlog = async (id) => {
    try {
      setChange(true);
      const request = await axios.put(
        import.meta.env.VITE_BASE_URL + `admin/private/${id}`,
      );
      // console.log(request);
      setChange(false);
      toast.success(request.data.message, {
        position: "top-right",
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
    <tr className="border-y border-gray-300">
      <td className="px-2 py-4 text-center">{serial}</td>
      <td className="px-2 py-4 text-blue-500">{list?.title}</td>
      <td className="px-2 py-4 max-sm:hidden">
        {new Date(list?.createdAt).toLocaleDateString("en-GB")}
      </td>
      <td className="px-2 py-4 max-sm:hidden">{list?.likes}</td>
      <td className="px-2 py-4 max-sm:hidden">{list?.disLikes}</td>

      {/* admin acces only */}
      {location.pathname === "/admin/list-blog" ? (
        <td className="px-2 py-4 flex items-center gap-3">
          {status === "public" ? (
            <button
              className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
              onClick={() => privateBlog(list?._id)}
            >
              Private
            </button>
          ) : (
            <button
              className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600"
              onClick={() => publicBlog(list?._id)}
            >
              Public
            </button>
          )}
        </td>
      ) : (
        ""
      )}
    </tr>
  );
}
