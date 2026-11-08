import Link from "next/link";

export default function NotFound() {
  return (
    <section className="ruled flex min-h-[70svh] items-center">
      <div className="shell relative">
        <p className="label label-accent">404</p>
        <h1 className="display mt-5 text-[length:var(--text-h1)]">
          That page doesn&apos;t exist.
        </h1>
        <p className="lead mt-6">
          The link may be out of date, or the page may have moved.
        </p>
        <Link
          href="/"
          className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-accent px-5 py-3 text-[0.875rem] font-medium text-accent-ink"
        >
          Back to the start
          <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
