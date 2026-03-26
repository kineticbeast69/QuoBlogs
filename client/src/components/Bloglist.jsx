import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";
import { Suspense } from "react";
import LoadingCards from "./loading/LoadingCards";
import { useForm } from "react-hook-form";
export default function Bloglist() {
  const [value, setValue] = useState("All");
  const [datas, setDatas] = useState([]);
  const [req, setReq] = useState(false);
  const [message, setMessage] = useState("");
  const blogCategory = [
    "All",
    "technologies",
    "startup",
    "lifestyle",
    "finance",
    "AI",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // query fuunction
  const querySubmit = async (data) => {
    const { query } = data;
    setReq(true);
    try {
      const request = await axios.post(
        import.meta.env.VITE_BASE_URL + "quoblogs/query-blog",
        {
          query,
        },
      );
      // console.log(request.data.blog);
      setDatas(request.data.blog);
      if (datas.length == 0) {
        setMessage("No Matching Blog Found.");
      }
    } catch (error) {
      if (error) {
        return console.error(error.response?.data?.message || error);
      }
    } finally {
      setReq(false);
    }
  };
  const blogList = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "quoblogs/blogs",
      );
      // console.log(response.data);
      setDatas(response.data.blogs);
      // setDatas(datas.filter((data) => data.category === value));
      if (datas.length === 0) {
        setMessage("No Blogs Available.");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  useEffect(() => {
    blogList();
  }, []);
  return (
    <div>
      {" "}
      {/* searching the blog */}
      <form
        className="flex flex-col justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
        onSubmit={handleSubmit(querySubmit)}
      >
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search for blogs"
            className="w-full outline-none pl-4"
            {...register("query", {
              required: "Search cannot be empty.",
              pattern: {
                value: /^(?=.*[a-zA-Z])[a-zA-Z\s-_]+$/,
                message: "*Only letters, spaces, - and _ allowed",
              },
            })}
          />
          <button
            type="submit"
            className={`${
              req
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 cursor-pointer"
            } text-white px-8 py-2 m-1.5 rounded-2xl hover:scale-105 transition-all  active:bg-blue-700`}
          >
            Search
          </button>
        </div>
        <div className="flex items-start ml-4">
          {errors.query && (
            <p className="text-base text-red-500">{errors.query.message}</p>
          )}
        </div>
      </form>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {/* blogs topics  */}
        {blogCategory.map((item, index) => {
          return (
            <div key={index} className="relative">
              <button
                className={`cursor-pointer capitalize text-gray-500 ${
                  value === item && "text-white px-4 pt-0.5"
                }`}
                onClick={() => {
                  setValue(item);
                }}
              >
                {item}
                {value === item && (
                  <div className="absolute left-0 right-0 top-0 h-7 -z-1 bg-blue-600 rounded-full transition-all duration-200 ease-linear shadow-md shadow-blue-700 "></div>
                )}
              </button>
            </div>
          );
        })}
      </div>
      <Suspense fallback={<LoadingCards />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-3 mb-24 mx-8 sm:mx-16 xl:mx-40">
          {/* // blog cards components */}
          {datas.length === 0 ? (
            <div className="text-3xl w-full m-auto">{message}</div>
          ) : (
            datas
              .filter((data) => value === "All" || data.category == value)
              .map((data, index) => <BlogCard key={index} list={data} />)
          )}
        </div>
      </Suspense>
    </div>
  );
}
