import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export default function AuthorForm() {
  const [add, setAdd] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  let timer = useRef(null);

  const authorSubmit = (data) => {
    clearTimeout(timer.current); // prevent multiple triggers
    setAdd(true);

    const { name, email, bio, link, language, experience, confirm, topics } =
      data;

    timer.current = setTimeout(async () => {
      try {
        const request = await axios.post(
          import.meta.env.VITE_BASE_URL + "author/register-author",
          { name, email, bio, link, experience, language, confirm, topics },
        );

        toast.success(request.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
        reset();
      } catch (error) {
        toast.warn(error.response?.data?.message || "Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      } finally {
        setAdd(false);
      }
    }, 500); // ⏳ 1 second delay
  };
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-12">
      {/* Step Title */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Fill up These Form
      </h2>

      <form className="w-full" onSubmit={handleSubmit(authorSubmit)}>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 space-y-3">
          {/* Name */}
          <div>
            <label htmlFor="name" className="text-sm text-gray-600">
              Name / Pen Name
            </label>
            <input
              placeholder="John Doe"
              id="name"
              maxLength={25}
              className="border border-gray-400 rounded-md h-full  outline-none w-full rounded-r-none px-3 text-gray-500"
              {...register("name", {
                required: "Name is required.",
                minLength: {
                  value: 4,
                  message: "Name must have 4 characters",
                },
                maxLength: {
                  value: 25,
                  message: "Name can't be greater than 25 characters.",
                },
                pattern: {
                  value: /([a-zA-Z0-9_\s]+)/,
                  message: "Only letter, number and spaces are only allowed. ",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-base my-0.5">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* email */}
          <div>
            <label htmlFor="email" className="text-sm text-gray-600">
              Email
            </label>
            <input
              placeholder="your email"
              id="email"
              className="border border-gray-400 rounded-md h-full  outline-none w-full rounded-r-none px-3 text-gray-500"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                  message: "Enter the valid email address.",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-base my-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="mt-4 md:col-span-2">
            <label htmlFor="bio" className="text-sm text-gray-600">
              Short Bio
            </label>
            <textarea
              id="bio"
              placeholder="Tell readers something about you..."
              className="border border-gray-400 rounded-md h-full  outline-none w-full rounded-r-none px-3 text-gray-500"
              {...register("bio", {
                required: "Short Bio is required.",
                minLength: {
                  value: 30,
                  message: "Bio must have 30 characters.",
                },
                maxLength: {
                  value: 200,
                  message: "Bio can't be greater than 300 characters.",
                },
                pattern: {
                  value: /^(?=.*\S)[a-zA-Z0-9\s.,!?'"()\-_:;@#]+$/,
                  message: "Invalid characters in bio",
                },
              })}
            />
            {errors.bio && (
              <p className="text-red-500 text-base my-0.5">
                {errors.bio.message}
              </p>
            )}
          </div>

          {/* Topics */}
          <div className="mt-4 md:col-span-2">
            <label className="text-sm text-gray-600 mb-3 block">
              Topics you write about
            </label>
            <div className="flex flex-wrap gap-3">
              {["Technology", "Startup", "Lifestyle", "Finance", "AI"].map(
                (topic) => (
                  <label
                    key={topic}
                    className="flex items-center gap-2 px-3 py-1.5  border border-gray-400 rounded-md cursor-pointer hover:bg-blue-50"
                  >
                    <input
                      type="checkbox"
                      value={topic}
                      className="accent-blue-600 "
                      {...register("topics", {
                        required: "Atleast! Select one topic",
                      })}
                    />
                    <span className="text-sm">{topic}</span>
                  </label>
                ),
              )}
              {errors.topics && (
                <p className="text-red-500 text-base my-0.5">
                  {errors.topics.message}
                </p>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className="mt-4">
            <label htmlFor="experince" className="text-sm text-gray-600">
              Experience
            </label>
            <select
              id="experince"
              className="border border-gray-400 rounded-md h-full  outline-none w-full rounded-r-none px-3 text-gray-500"
              {...register("experience", {
                required: "Choose one  experience",
              })}
            >
              <option value="" disabled>
                Select Experience
              </option>
              <option value="beginner">Beginner : 0 years</option>
              <option value="intermediate">Intermediate : 1-4 years</option>
              <option value="professional">Professional : 4+ years</option>
            </select>
            {errors.experience && (
              <p className="text-red-500 text-base my-0.5">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Language */}
          <div className="mt-4">
            <label htmlFor="language" className="text-sm text-gray-600">
              Language
            </label>
            <select
              id="language"
              className="border border-gray-400 rounded-md h-full  outline-none w-full rounded-r-none px-3 text-gray-500"
              {...register("language", { required: "Choose one language." })}
            >
              <option value="" disabled>
                Choose Language
              </option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
            </select>
            {errors.langauge && (
              <p className="text-red-500 text-base my-0.5">
                {errors.langauge.message}
              </p>
            )}
          </div>

          {/* Portfolio */}
          <div className="mt-4 md:col-span-2">
            <label htmlFor="link" className="text-sm text-gray-600">
              Portfolio / Social Link
            </label>
            <input
              id="link"
              type="url"
              pattern="https://.*"
              placeholder="https://quoblogs.com"
              className="border border-gray-400 rounded-md h-full  outline-none w-full rounded-r-none px-3 text-gray-500"
              {...register("link", {
                required: "URL is required",
                pattern: {
                  value:
                    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                  message: "Enter a valid URL (with or without https)",
                },
              })}
            />
            {errors.link && (
              <p className="text-red-500 text-base my-0.5">
                {errors.link.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="mt-4 md:col-span-2 flex items-start gap-3">
            <input
              id="confirm"
              type="checkbox"
              className="mt-1 accent-blue-600"
              {...register("confirm", {
                required: "Confirm your Authorization.",
              })}
            />
            <label
              htmlFor="confirm"
              className="text-gray-600 text-sm leading-relaxed"
            >
              I confirm that my content is original and I agree to QuoBlog’s
              Author Terms & Conditions.
            </label>
            {errors.confirm && (
              <p className="text-red-500 text-base">{errors.confirm.message}</p>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-12 flex sm:flex-row items-center gap-4">
          <input
            type="reset"
            value="Reset"
            className="px-8 py-3 rounded-xl border text-gray-600 hover:bg-gray-100"
          />
          <button
            type={add ? "button" : "submit"}
            className={
              add
                ? "px-8 py-3 rounded-xl border text-white bg-blue-300 cursor-not-allowed "
                : "bg-blue-500 cursor-pointer px-8 py-3 rounded-xl border text-white hover:bg-blue-600 active:bg-blue-700"
            }
          >
            Add Details
          </button>
        </div>
      </form>
    </div>
  );
}
