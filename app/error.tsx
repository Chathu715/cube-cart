'use client';

import { useEffect } from 'react';
import { IoWarning } from "react-icons/io5";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center animated-gradient p-4 text-center">
      <div className="glass-strong p-12 rounded-3xl max-w-md w-full">
        <IoWarning className="text-6xl text-red-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-8">
          We encountered an unexpected error. Please try again or return home.
        </p>
        <div className="flex flex-col gap-3">
            <button
            onClick={() => reset()}
            className="w-full py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition"
            >
            Try again
            </button>
            <button
            onClick={() => window.location.href = '/'}
            className="w-full py-3 glass rounded-full font-bold hover:bg-white/10 transition"
            >
            Go Home
            </button>
        </div>
      </div>
    </div>
  );
}
