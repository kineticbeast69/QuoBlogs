import { BookCheck, ClipboardPenLine, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function AuthorDashboard() {
  const [datas, setDatas] = useState([]);
  const dashboard = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "author/dashboard",
        { withCredentials: true },
      );
      // console.log(response.data.info);
      setDatas(response.data.info);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  useEffect(() => {
    dashboard();
  }, []);
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4">
        {/* card 1 */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <BookCheck className="text-blue-600" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {datas?.total}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        {/* card 2 */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <ClipboardPenLine className="text-blue-600" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {datas?.draft}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>
      {/* published blog table */}
      <div className="mb-10">
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <ScrollText />
          <p>Published Blog</p>
        </div>
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
                    Like
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    DisLike
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.list?.map((list, index) => (
                  <tr className="border-y border-gray-300" key={index}>
                    <td className="px-2 py-4 text-center">{index + 1}</td>
                    <td className="px-2 py-4 text-blue-500">{list?.title}</td>
                    <td className="px-2 py-4 max-sm:hidden">{list?.likes}</td>
                    <td className="px-2 py-4 max-sm:hidden">
                      {list?.disLikes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
        <Link
          to="/author/blog-list"
          className="text-gray-600 hover:text-blue-600"
        >
          More...
        </Link>
      </div>
    </div>
  );
}
