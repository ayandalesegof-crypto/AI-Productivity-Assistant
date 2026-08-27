import { createFileRoute, Link } from "@tanstack/react-router";
import { PACKAGES } from "@/lib/bookings";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — Miss A Studios" },
      {
        name: "description",
        content:
          "Photography packages at Miss A Studios: Half Day (R2,500, 3 hours + 60 edited images) and Full Day (R5,500, 7 hours + 100 edited images).",
      },
      { property: "og:title", content: "Packages — Miss A Studios" },
      {
        property: "og:description",
        content: "Half Day and Full Day photography packages by Miss A Studios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-5xl font-medium">Choose Your Perfect Fit</h1>
        <p className="mt-4 text-muted-foreground">
          Two simple packages, designed to feel effortless.
        </p>
      </header>

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        {[PACKAGES.half, PACKAGES.full].map((pkg) => (
          <article
            key={pkg.id}
            className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-soft transition-shadow hover:shadow-elegant"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{pkg.name}</p>
            <p className="mt-4 font-serif text-5xl font-medium text-primary">{pkg.price}</p>
            <p className="mt-1 text-sm text-muted-foreground">Includes:</p>
            <ul className="mt-4 flex-1 space-y-3">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/book"
              search={{ package: pkg.id }}
              className="mt-8 rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-burgundy-deep"
            >
              Book {pkg.name}
            </Link>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center text-sm text-muted-foreground">
        Not sure which package suits your shoot? Ask the Miss A Booking Assistant ✨ in the corner
        of your screen — it will help you decide.
      </p>
    </main>
  );
}
