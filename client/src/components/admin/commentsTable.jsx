import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export default function CommentsTable({ list, serial, setReq }) {
  const location = useLocation();
  const { blogID } = useParams();

  const commentStatus = async (value, id) => {
    try {
      setReq(true);
      const request = await axios.put(
        import.meta.env.VITE_BASE_URL +
          `admin/comment-status/${id}?value=${value}`,
      );
      // console.log(request);
      toast.success(request.data.message, {
        position: "top-right",
        theme: "dark",
        autoClose: 5000,
      });
    } catch (error) {
      console.log(error.response);
    } finally {
      setReq(false);
    }
  };
  return (
    <tr className="border-y border-gray-300">
      <td className="px-2 py-4 text-center">{serial}</td>
      <td className="px-2 py-4">{list?.name}</td>
      <td className="px-2 py-4 text-wrap">{list?.comment}</td>
      <td className="px-2 py-4 max-sm:hidden">{list?.likes}</td>
      <td className="px-2 py-4 max-sm:hidden">{list?.dislikes}</td>
      <td className="px-2 py-4  ">
        <p
          className={
            list?.status === "public"
              ? "text-red-500 capitalize"
              : "text-green-500 capitalize"
          }
        >
          {list?.status}
        </p>
      </td>
      {location.pathname === `/admin/comments/${blogID}` && (
        <td className="px-2 py-4  flex items-center gap-3">
          <button
            className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
            onClick={() => commentStatus("public", list?._id)}
          >
            Public
          </button>
          <button
            className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600"
            onClick={() => commentStatus("private", list?._id)}
          >
            Private
          </button>
        </td>
      )}
    </tr>
  );
}
