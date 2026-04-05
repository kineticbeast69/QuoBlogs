export default function LoadingCards() {
  return (
    // this is the ghost loading of blog cards
    <aside className="w-full flex justify-center my-10 gap-3 sm:gap-2 ">
      {/* card 1 */}
      <div className="flex flex-col bg-neutral-300 w-80 h-96 animate-pulse rounded-xl p-4 gap-4">
        <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
        <div className="flex flex-col gap-2">
          <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
          <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
          <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
          <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        </div>
      </div>
      {/* card 2 */}
      <div className="flex flex-col bg-neutral-300 w-80 h-96 animate-pulse rounded-xl p-4 gap-4">
        <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
        <div className="flex flex-col gap-2">
          <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
          <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
          <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
          <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        </div>
      </div>
      {/* card 3 */}
      <div className="flex flex-col bg-neutral-300 w-80 h-96 animate-pulse rounded-xl p-4 gap-4">
        <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
        <div className="flex flex-col gap-2">
          <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
          <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
          <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
          <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        </div>
      </div>
    </aside>
  );
}
