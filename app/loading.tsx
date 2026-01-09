export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center animated-gradient">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-white/20 rounded-xl"></div>
        <div className="absolute inset-0 border-4 border-yellow-400 rounded-xl border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-yellow-400/20 rounded-md animate-pulse"></div>
        </div>
      </div>
      <p className="mt-8 text-xl font-bold text-white/80 animate-pulse">Loading CubeCart...</p>
    </div>
  );
}
