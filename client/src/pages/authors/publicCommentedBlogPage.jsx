import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PublicCommentedBlog() {
  const [lists, setLists] = useState([]);
  const blogsComment = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "author/author-comment-blog",
        { withCredentials: true },
      );
      //  console.log(response);
      setLists(response.data.blog);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    blogsComment();
  }, []);
  return (
    <div className="pt-5 px-5 sm:pl-16 bg-blue-50/50 w-full">
      <div className="flex flex-col justify-between  max-w-3xl">
        <div className="flex items-center justify-between">
          <h1>Comment Blogs</h1>
        </div>

        {/* table for public blogs and it comments*/}
        <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
          <table className="w-full text-sm text-gray-500 border-t  border-gray-400">
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
                    <Link to={`/author/comments/${list?._id}`}>
                      View Comments
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
