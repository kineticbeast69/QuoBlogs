import AuthorForm from "../components/authorForm";
import Navbar from "../components/Navbar";
export default function BecomeAuthorPage() {
  return (
    <main>
      <Navbar />
      <div className=" bg-[#f9fbff] px-4 md:px-12 lg:px-24 py-10">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Become an{" "}
            <span className="text-blue-500 underline underline-offset-2">
              Author
            </span>
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            Join QuoBlog and start sharing your ideas with the world.
          </p>
        </div>

        {/* Form Section */}
      </div>
      <AuthorForm />
    </main>
  );
}
