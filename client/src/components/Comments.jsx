import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "react-toastify";
export default function Comment({ blogID }) {
  const [add, setAdd] = useState(false);
  const [lists, setLists] = useState([]);
  const [req, setReq] = useState(false);
  const [length, setLength] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // add comment
  const addComments = async (data) => {
    const { name, comment } = data;
    setAdd(true);

    try {
      const request = await axios.post(
        import.meta.env.VITE_BASE_URL + `quoblogs/comment/${blogID}`,
        { name, comment },
      );

      // console.log(request.data.message);
      toast.success(request.data.message, {
        position: "top-center",
        theme: "dark",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error.response?.data?.message || error);
    } finally {
      setAdd(false);
    }
  };

  // get comments
  const blogComment = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + `quoblogs/blog-comments/${blogID}`,
      );

      console.log(response.data);
      setLists(response.data.comments);
      setLength(response.data.length);
    } catch (error) {
      console.log(error.response);
    }
  };
  // comment like
  const commentLike = async (id) => {
    try {
      setReq(true);
      const response = await axios.put(
        import.meta.env.VITE_BASE_URL + `quoblogs/comment-like/${id}`,
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    } finally {
      setReq(false);
    }
  };
  const commentDislike = async (id) => {
    try {
      setReq(true);
      const response = await axios.put(
        import.meta.env.VITE_BASE_URL + `quoblogs/comment-dislike/${id}`,
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    } finally {
      setReq(false);
    }
  };

  useEffect(() => {
    blogComment();
  }, [req]);

  return (
    <section className="bg-gray-100">
      <p className="mb-4 border-b border-gray-300">Comments ({length})</p>

      <div className="container mx-auto px-4">
        {/* Comments List */}
        <div className="max-h-100 overflow-y-auto flex flex-col space-y-3 pr-2">
          {length === 0 ? (
            <div className="text-center text-gray-500">
              No comments yet. Start the discussion below 👇
            </div>
          ) : (
            lists.map((list, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-inner hover:shadow-gray-400"
              >
                <h3 className="font-semibold capitalize">{list?.name}</h3>

                <p className="text-sm text-gray-500">
                  Posted on{" "}
                  {new Date(list?.createdAt || Date.now()).toLocaleDateString(
                    "en-GB",
                  )}
                </p>

                <p className="text-gray-700 mt-2">{list?.comment}</p>

                {/* like dislike */}
                <div className="flex items-center gap-9 mt-3">
                  <div
                    className="flex items-center gap-2"
                    onClick={() => commentLike(list?._id)}
                  >
                    <ThumbsUp size={18} className="text-gray-400" />
                    {list?.likes || 0}
                  </div>

                  <div
                    className="flex items-center gap-2"
                    onClick={() => commentDislike(list?._id)}
                  >
                    <ThumbsDown size={18} className="text-gray-400" />
                    {list?.dislikes || 0}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Comment Form */}
        <form
          className="mt-8 bg-white p-4 rounded-lg shadow"
          onSubmit={handleSubmit(addComments)}
        >
          <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              {...register("name", {
                required: "Name is required.",
                minLength: {
                  value: 4,
                  message: "Name must have 4 characters.",
                },
                maxLength: {
                  value: 30,
                  message: "Name can't be more than 30 character.",
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])[a-zA-Z\s.'-]+$/,
                  message: "Only letters allowed",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Comment
            </label>
            <textarea
              rows="4"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              {...register("comment", {
                required: "Write some comments please.",
                minLength: {
                  value: 10,
                  message: "Comment must be at least 10 characters.",
                },
                maxLength: {
                  value: 300,
                  message: "Comment can't be greater than 300 characters",
                },
              })}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment.message}</p>
            )}
          </div>

          <button
            type={add ? "button" : "submit"}
            className={`text-white px-4 py-2 rounded-md ${
              add
                ? "cursor-not-allowed bg-blue-300"
                : "cursor-pointer bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {add ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>
    </section>
  );
}
