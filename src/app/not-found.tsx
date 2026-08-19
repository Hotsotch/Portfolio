import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell section flex min-h-screen flex-col justify-center">
      <p className="text-label uppercase tracking-[0.12em] text-muted">
        Error 404
      </p>
      <h1 className="text-display mt-6 font-medium">Not found</h1>
      <p className="text-body mt-8 max-w-md text-muted">
        That page does not exist.
      </p>
      <Link
        href="/"
        className="text-label mt-12 uppercase tracking-[0.12em] text-accent hover:text-ink"
      >
        &larr; Back home
      </Link>
    </main>
  );
}
