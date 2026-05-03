import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-brand-accent">
          404
        </p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-foreground">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-brand-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-accent-hover"
      >
        Back to home
      </Link>
    </div>
  );
}
