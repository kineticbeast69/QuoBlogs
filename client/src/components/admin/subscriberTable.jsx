import { useEffect, useState } from "react";
import axios from "axios";
export default function SubscriberTable() {
  const [lists, setLists] = useState([]);
  const subscriberList = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "admin/subscriber-list",
      );
      // console.log(response.data.list);
      setLists(response.data.list);
    } catch (error) {
      if (error) {
        console.log(error.response);
      }
    }
  };
  useEffect(() => {
    subscriberList();
  }, []);
  return (
    <aside>
      <div className="relative max-w-5xl  overflow-x-auto shadow rounded-md scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500 border-t  border-gray-400">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6 text-center">
                Serail No.
              </th>
              <th scope="col" className="px-2 py-4">
                Email ID
              </th>
              <th scope="col" className="px-2 py-4">
                Country
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                City
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Region
              </th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list, index) => (
              <tr key={index} className="border-y border-gray-300">
                <td className="px-2 py-4 text-center">{index + 1}</td>
                <td className="px-2 py-4">{list.email}</td>
                <td className="px-2 py-4 text-wrap">
                  {list.country === null ? "LocalHost" : list.country}
                </td>
                <td className="px-2 py-4 max-sm:hidden">
                  {list.city === null ? "LocalHost" : list.city}
                </td>
                <td className="px-2 py-4 max-sm:hidden">
                  {list.region === null ? "localHost" : list.region}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  );
}
