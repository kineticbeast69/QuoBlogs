import { useState, useEffect } from "react";
import AuthorsTable from "../../components/admin/authorsTable";
import axios from "axios";
export default function AuthorListPage() {
  const [status, setStatus] = useState("verified");
  const [lists, setLists] = useState([]);
  const [change, setChange] = useState(false);
  const authorsList = async () => {
    try {
      const request = await axios.get(
        import.meta.env.VITE_BASE_URL + `admin/authors-list?field=${status}`,
        { params: { field: status } },
      );
      // console.log(request.data.authors);
      setLists(request.data.authors);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    authorsList();
  }, [status, change]);
  return (
    <main className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="max-w-4xl flex items-center justify-between">
        <h1>Author</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setStatus("verified")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              status === "verified" ? "text-blue-500" : "text-gray-700"
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => setStatus("unverified")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              status === "unverified" ? "text-blue-500" : "text-gray-700"
            }`}
          >
            Unverified
          </button>
        </div>
      </div>
      {/* all blogs table */}
      <div className="mt-6">
        <aside>
          <div className="relative max-w-5xl  overflow-x-auto shadow rounded-md scrollbar-hide bg-white">
            <table className="w-full text-sm  text-gray-500 border-t  border-gray-400">
              <thead className="text-xs text-gray-600 text-left uppercase">
                <tr>
                  <th scope="col" className="px-2 py-4 xl:px-6 text-center">
                    Serial No.
                  </th>
                  <th scope="col" className="px-2 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    Email
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    Topics
                  </th>
                  <th scope="col" className="px-2 py-4 ">
                    Portfolio Link
                  </th>
                  {location.pathname === "/admin/author-list" ? (
                    <th scope="col" className="px-2 py-4 ">
                      Action
                    </th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {/* rendering the list of authors */}
                {lists.map((list, index) => (
                  <AuthorsTable
                    status={status}
                    list={list}
                    index={index}
                    key={index}
                    setChange={setChange}
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
