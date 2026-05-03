"use client";

import { useEffect } from "react";

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
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-brand-deep">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          Please try again. If the problem continues, refresh the page.
        </p>
      </div>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-brand-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-accent-hover"
      >
        Try again
      </button>
    </div>
  );
}
