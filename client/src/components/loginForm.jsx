import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const [req, setReq] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginSubmit = async (data) => {
    const { email, quoblogID } = data;
    try {
      setReq(true);
      const request = await axios.post(
        import.meta.env.VITE_BASE_URL + "auth/login",
        {
          email,
          quoblogID,
        },
        { withCredentials: true },
      );
      // console.log(request);
      navigate("/");
    } catch (error) {
      if (error.response) {
        // console.log(error.response?.data?.message);
        setErr(error.response?.data?.message);
      }
    } finally {
      setReq(false);
    }
  };
  return (
    <>
      <div>
        {err && (
          <p className="text-red-500 text-base mt-0.5 text-center">{err}</p>
        )}
      </div>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(loginSubmit)}
      >
        {/* email field is here */}
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="border-b-2 border-gray-300 p-2 outline-none mb-6"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                message: "Enter the valid email address.",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-base -mt-3">
              {errors.email.message}
            </p>
          )}
        </div>
        {/* quoBlogID field */}
        <div className="flex flex-col">
          <label htmlFor="quoblogID">QuoBlog ID</label>
          <div className=" border-b-2 border-gray-300 p-2  mb-6">
            <input
              id="quoblogID"
              type="text"
              placeholder="Your QuoBlogID"
              className="outline-none"
              maxLength={15}
              {...register("quoblogID", {
                required: "Your ID is required.",
                minLength: {
                  value: 13,
                  message: "ID must have 13 characters.",
                },
                maxLength: {
                  value: 13,
                  message: "ID can't be greater than 13 characters.",
                },
                pattern: {
                  value: /^[A-Za-z0-9]*$/,
                  message: "Enter the valid QuoBlogID",
                },
              })}
            />
          </div>
          {errors.quoblogID && (
            <p className="text-red-500 text-base -mt-3">
              {errors.quoblogID.message}
            </p>
          )}
        </div>
        <button
          type={req ? "button" : "submit"}
          className={`w-full py-3 font-medium ${
            req
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 cursor-pointer hover:bg-blue-500/90"
          } text-white rounded   transition-all`}
        >
          Login
        </button>
      </form>
    </>
  );
}
