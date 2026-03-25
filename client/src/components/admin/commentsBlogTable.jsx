import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
export default function CommentsBlogTable() {
  const [lists, setLists] = useState([]);
  const publicCommentedBlog = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "admin/public-commented-blog",
      );
      // console.log(response.data.blog);
      setLists(response.data.blog);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    publicCommentedBlog();
  }, []);
  return (
    <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 text-left uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Serail No.
            </th>
            <th scope="col" className="px-6 py-3">
              Blogs Title
            </th>
            <th scope="col" className="px-6 py-3 max-sm:hidden">
              Publish Date
            </th>
            <th scope="col" className="px-6 py-3">
              Comments
            </th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list, index) => (
            <tr className="order-y border-gray-300" key={index}>
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">
                <b className="font-medium text-gray-600">{list?.title}</b>
              </td>
              <td className="px-6 py-4 max-sm:hidden">
                {new Date(list?.createdAt).toLocaleDateString("en-GB")}
              </td>
              <td className="px-6 py-4 text-blue-500">
                <Link to={`/admin/comments/${list?._id}`}>View Comments</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
