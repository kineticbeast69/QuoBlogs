import { useParams } from "react-router-dom";
import CommentsTable from "../../components/admin/commentsTable";
import { useEffect, useState } from "react";
import axios from "axios";
export default function BlogComments() {
  const { blogID } = useParams();
  const [lists, setLists] = useState([]);
  const blogComment = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + `author/blog-comments/${blogID}`,
        { withCredentials: true },
      );
      console.log(response.data.lists);
      setLists(response.data.lists);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    blogComment();
  }, []);
  return (
    <main className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="max-w-4xl flex items-center justify-between">
        <h1>
          Comments <span className="text-blue-500 text-xl">{lists.length}</span>
        </h1>
      </div>
      {/* comments realted to blog */}
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
                    Name
                  </th>
                  <th scope="col" className="px-2 py-4">
                    Comments
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    Like
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    DisLike
                  </th>
                  <th scope="col" className="px-2 py-4 ">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {lists.map((list, index) => (
                  <CommentsTable key={index} serial={index + 1} list={list} />
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </main>
  );
}
