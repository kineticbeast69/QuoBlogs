import { useState, useEffect } from "react";
import axios from "axios";
import BlogsTable from "../../components/admin/blogsTable";
export default function BlogListPage() {
  const [status, setStatus] = useState("public");
  const [lists, setLists] = useState([]);
  const blogList = async () => {
    try {
      const request = await axios.get(
        import.meta.env.VITE_BASE_URL + "author/blog-list",
        {
          params: { status: status },
          withCredentials: true,
        },
      );
      // console.log(request.data.list);
      setLists(request.data.list);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  useEffect(() => {
    blogList();
  }, [status]);
  return (
    <main className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="max-w-4xl flex items-center justify-between">
        <h1>Blogs</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setStatus("public")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              status === "public" ? "text-blue-500" : "text-gray-700"
            }`}
          >
            Public
          </button>
          <button
            onClick={() => setStatus("private")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              status === "private" ? "text-blue-500" : "text-gray-700"
            }`}
          >
            Private
          </button>
        </div>
      </div>
      {/* all blogs table */}
      <div className="mt-6">
        <aside>
          <div className="relative max-w-5xl  overflow-x-auto shadow rounded-md scrollbar-hide bg-white">
            <table className="w-full text-sm text-gray-500 border-t  border-gray-400">
              <thead className="text-xs text-gray-600 text-left uppercase">
                <tr>
                  <th scope="col" className="px-2 py-4 xl:px-6 text-center">
                    Serail No.
                  </th>
                  <th scope="col" className="px-2 py-4">
                    Blog title
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    Date
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    Like
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    DisLike
                  </th>
                  {location.pathname === "/admin/list-blog" ? (
                    <th scope="col" className="px-2 py-4 max-sm:hidden">
                      Action
                    </th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {/* mapping all the list */}
                {lists.map((list, index) => (
                  <BlogsTable
                    status={status}
                    key={index}
                    list={list}
                    serial={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </main>
  );
}
