import { ImageUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../components/loading/spinner";
import { parse } from "marked";
export default function AddBlogPage() {
  const [img, setImg] = useState("");
  const [err, setErr] = useState("");
  const [title, setTitle] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  // adding blog func
  const addBlog = async (data) => {
    const descriptionRef = quillRef.current?.root.innerHTML; //quill bot refer
    const formData = new FormData();
    // console.log(img);
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("category", data.category);
    formData.append("description", descriptionRef);
    formData.append(`image`, img);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "author/add-blog",
        formData, // 👈 send formData
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // console.log(response.data.message);
      toast.success(response?.data?.message, {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
      setErr("");
    } catch (error) {
      if (error.response) {
        console.log(error.response?.data);
        setErr(error.response?.data?.message);
      }
    }
  };

  // generating the ai content
  const generateContent = async () => {
    if (!title.trim()) return setTitleMessage("Title is required.");

    try {
      setLoading(true);
      const request = await axios.post(
        import.meta.env.VITE_BASE_URL + "author/generate",
        { prompt: title },
        { withCredentials: true },
      );
      // console.log(request.data.content);
      setTitleMessage("");
      quillRef.current.root.innerHTML = parse(request.data.content);
    } catch (error) {
      // console.log(error.response.data.message);
      setTitleMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <div className="text-2xl md:text-3xl lg:text-4xl">
        Write. Inspire.{" "}
        <span className="text-blue-500 text-3xl md:text-4xl lg:text-5xl">
          Share Your Story.
        </span>
      </div>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(addBlog)}
        className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
      >
        <div className="bg-white w-full max-w-2xl p-4 md:p-10 sm:m-10 shadow-md rounded">
          {/* IMAGE */}
          <p className="mb-2">Upload Thumbnail</p>
          <label
            htmlFor="image"
            className="flex items-center gap-4 cursor-pointer"
          >
            {img ? (
              <img
                src={URL.createObjectURL(img)}
                alt="thumbnail"
                className="h-16 w-16 object-cover rounded"
              />
            ) : (
              <ImageUp className="h-16 w-16 text-gray-400" />
            )}

            <span className="text-sm">Click to upload image</span>

            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              {...register("image", {
                required: "Image is required.",
                validate: {
                  fileType: (v) =>
                    !v?.[0] ||
                    ["image/jpeg", "image/png", "image/webp"].includes(
                      v[0].type,
                    ) ||
                    "Only JPG, PNG, WEBP allowed",

                  fileSize: (v) =>
                    !v?.[0] ||
                    v[0].size <= 5 * 1024 * 1024 ||
                    "File size must be less than 5MB",
                },
              })}
              onChange={(e) => setImg(e.target.files[0])}
            />
          </label>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}

          {/* TITLE */}
          <p className="mt-4">Blog Title</p>
          <input
            type="text"
            placeholder="Type here"
            className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 5, message: "Minimum 5 characters" },
            })}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
          {titleMessage && (
            <p className="text-red-500 text-sm mt-1">{titleMessage}</p>
          )}

          {/* SUBTITLE */}
          <p className="mt-4">Blog Sub-Title</p>
          <input
            type="text"
            placeholder="Type here"
            className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
            {...register("subtitle", {
              required: "Sub-title is required",
            })}
          />
          {errors.subtitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subtitle.message}
            </p>
          )}

          {/* DESCRIPTION */}
          <p className="mt-4">Blog Description</p>
          <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
            <div ref={editorRef}></div>
            <button
              type="button"
              disabled={loading}
              onClick={() => generateContent()}
              className="absolute bottom-1 right-2 text-xs text-white bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 px-4 py-1.5 rounded hover:underline"
            >
              {loading ? <Spinner /> : "Generate with AI"}
            </button>
          </div>

          {/* CATEGORY */}
          <p className="mt-4">Blog Category</p>
          <select
            className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
            defaultValue=""
            {...register("category", {
              required: "Please select a category",
            })}
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="technologies">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="finance">Finance</option>
            <option value="startup">StartUp</option>
            <option value="AI">AI</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
          {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
          <button
            type="submit"
            className="mt-8 ml-4 w-40 h-10 bg-blue-600 text-white rounded text-sm active:bg-blue-700"
          >
            Add blog
          </button>
        </div>
      </form>
    </main>
  );
}
