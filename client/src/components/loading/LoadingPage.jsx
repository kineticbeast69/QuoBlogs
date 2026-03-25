export default function LoadingPage() {
  return (
    <aside className="w-full h-screen">
      <div class="container mx-auto p-4">
        <div class="animate-pulse flex justify-center">
          <div class="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        </div>

        <div class="animate-pulse flex justify-center">
          <div class="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
        </div>

        <div class="mt-6 mb-6 animate-pulse space-y-3 flex flex-col items-center justify-center">
          <div class="h-4 bg-gray-300 rounded w-1/3"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          <div class="h-4 bg-gray-300 rounded w-1/4"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>

        <div class="animate-pulse">
          <div class="w-full h-64 bg-gray-300 rounded mb-6"></div>
        </div>

        <div class="animate-pulse space-y-2">
          <div class="h-4 bg-gray-300 rounded w-full"></div>
          <div class="h-4 bg-gray-300 rounded w-5/6"></div>
          <div class="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>

        <div class="mt-6 animate-pulse space-y-3">
          <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          <div class="h-4 bg-gray-300 rounded w-2/3"></div>
          <div class="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        <div class="animate-pulse space-y-2 mt-6">
          <div class="h-4 bg-gray-300 rounded w-full"></div>
          <div class="h-4 bg-gray-300 rounded w-5/6"></div>
          <div class="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>

        <div class="mt-8 space-y-4">
          <div class="animate-pulse flex space-x-4">
            <div class="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div class="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div class="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div class="h-10 w-10 bg-gray-300 rounded-full"></div>
          </div>
          <div class="animate-pulse flex space-x-4">
            <div class="h-10 w-16 bg-gray-300 rounded"></div>
            <div class="h-10 w-16 bg-gray-300 rounded"></div>
            <div class="h-10 w-16 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
