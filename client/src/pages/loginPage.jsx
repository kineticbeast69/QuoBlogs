import { Link } from "react-router-dom";
import LoginForm from "../components/loginForm";
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-blue-500/35 shadow-xl shadow-blue-500/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-semibold">
              Login to{" "}
              <Link
                to="/"
                className="text-blue-600 underline underline-offset-4"
              >
                QuoBlog
              </Link>
              <p className="font-light text-base">
                Enter your credentials to access the panel
              </p>
            </h1>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
