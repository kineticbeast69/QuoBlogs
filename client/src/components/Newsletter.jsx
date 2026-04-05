import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
export default function Newsletter() {
  const [req, setReg] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const timer = useRef(null);

  // susbcribing the email
  const subscribe = (data) => {
    const { email } = data;

    clearTimeout(timer.current); //stoping mltiple delays

    setReg(true);
    timer.current = setTimeout(async () => {
      try {
        // console.log(email);
        const request = await axios.post(
          import.meta.env.VITE_BASE_URL + "subscribe",
          { email: email.trim() },
        );

        console.log(request);
        return toast.success(request.data?.message, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark",
        });
        reset();
      } catch (error) {
        if (error) {
          // console.log(error.response?.data?.message || error);
          return toast.success(error.response?.data?.message, {
            position: "top-right",
            autoClose: 4000,
            theme: "dark",
          });
        }
      } finally {
        setReg(false);
      }
    }, 500);
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-2 my-32 text-center mx-auto">
      <h1 className="md:text-4xl text-2xl font-semibold">Never miss a Blog!</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to latest blog, new tech, and exclusive news.
      </p>
      <form
        className="flex flex-col items-center justify-between max-w-2xl w-full"
        onSubmit={handleSubmit(subscribe)}
      >
        <div className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
            {...register("email", {
              required: "*Email is required.",
              pattern: {
                value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                message: "*Enter the valid email address.",
              },
            })}
          />
          <button
            type="submit"
            className={`md:px-12 px-8 h-full text-white ${
              req
                ? "bg-blue-500/65 cursor-not-allowed"
                : "bg-blue-500 cursor-pointer"
            }  transition-all active:bg-blue-600 rounded-md rounded-l-none`}
          >
            Subscribe
          </button>
        </div>

        <div className="flex items-start">
          {errors.email && (
            <p className="text-base text-red-500">{errors.email.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}
