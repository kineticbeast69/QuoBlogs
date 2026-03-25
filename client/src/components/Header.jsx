import { Sparkles } from "lucide-react";
export default function Header() {
  return (
    <div className="mt-20 mb-10 mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-10 mb-8 ">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-blue-500/40 bg-blue-500/10 rounded-full text-sm text-blue-500 shadow-md shadow-blue-500">
          <p>New: AI feature integrated</p>
          <Sparkles className="w-2.5 text-amber-500" />
        </div>

        <h1 className="text-3xl sm:text-6xl fomt-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-blue-600">blogging</span> <br />
          platform.
        </h1>
        <p className="text-wrap my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-600">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whethers it's one word or athousand, you story
          starts right here.
        </p>
      </div>
    </div>
  );
}
