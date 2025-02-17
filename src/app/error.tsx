"use client";

import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-md w-full text-center p-6  shadow-lg rounded-lg">
        <CircleAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Oops! Something went wrong.
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          An unexpected error occurred. Please try again or contact support if
          the problem persists.
        </p>

        <Button
          onClick={() => reset()}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
