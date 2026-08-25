import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, ClipboardList, MessageSquareHeart, PackageCheck } from "lucide-react";
import { GALLERY_IMAGES, HERO_IMAGE } from "@/lib/images";
import { PACKAGES } from "@/lib/bookings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Miss A Studios — Timeless Editorial Photography" },
      {
        name: "description",
        content:
          "Miss A Studios creates timeless editorial photography for individuals, brands and creatives. View packages and book your shoot.",
      },
      { property: "og:title", content: "Miss A Studios — Timeless Editorial Photography" },
      {
        property: "og:description",
        content:
          "Timeless editorial photography for individuals, brands and creatives. Book your shoot with Miss A Studios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const STEPS = [
  {
    icon: PackageCheck,
    title: "Choose Your Package",
    text: "Select the package that best suits your shoot.",
  },
  {
    icon: MessageSquareHeart,
    title: "Tell Us About Your Shoot",
    text: "Provide your shoot details, preferred date and location.",
  },
  {
    icon: ClipboardList,
    title: "Review Your Request",
    text: "Check that your booking information is correct.",
  },
  {
    icon: CalendarCheck,
    title: "We'll Be In Touch",
    text: "Miss A Studios reviews the request and contacts the client to confirm the booking.",
  },
];

function HomePage() {
  const [feature, land1, land2, p1, p2, p3, p4, wide] = GALLERY_IMAGES;

  return (
    <main>
      {/* HERO */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Editorial portrait by Miss A Studios — burgundy dress in warm studio light"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <div className="animate-fade-up max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/80">Miss A Studios</p>
            <h1 className="font-serif text-5xl font-medium leading-[1.05] text-white sm:text-6xl md:text-7xl">
              Let's create something worth remembering.
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-elegant transition-all hover:bg-burgundy-deep"
              >
                Book a Shoot
              </Link>
              <Link
                to="/packages"
                className="rounded-full border border-white/70 px-7 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-foreground"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {/* Large feature */}
          <figure className="group col-span-2 row-span-2 overflow-hidden rounded-xl">
            <img
              src={feature.src}
              alt={feature.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </figure>
          {/* Two landscape */}
          {[land1, land2].map((img) => (
            <figure key={img.src} className="group col-span-2 overflow-hidden rounded-xl md:col-span-2">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </figure>
          ))}
          {/* Four portrait */}
          {[p1, p2, p3, p4].map((img) => (
            <figure key={img.src} className="group overflow-hidden rounded-xl">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </figure>
          ))}
          {/* Wide editorial */}
          <figure className="group col-span-2 overflow-hidden rounded-xl md:col-span-4">
            <img
              src={wide.src}
              alt={wide.alt}
              loading="lazy"
              className="aspect-[16/7] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </figure>
        </div>
        <div className="mt-10 text-center">
          <Link to="/portfolio" className="text-sm font-medium text-primary hover:underline">
            View the full portfolio →
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <h2 className="font-serif text-4xl font-medium sm:text-5xl">
            Capturing stories with intention.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Miss A Studios creates timeless editorial photography for individuals, brands and
            creatives. Every session is designed to feel effortless while producing beautiful,
            authentic imagery.
          </p>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <h2 className="text-center font-serif text-4xl font-medium sm:text-5xl">
          Choose Your Perfect Fit
        </h2>
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
      </section>

      {/* HOW BOOKING WORKS */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-center font-serif text-4xl font-medium sm:text-5xl">
            How Booking Works
          </h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-card text-primary">
                  <step.icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 font-serif text-xl font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="rounded-3xl bg-primary px-6 py-16 text-center shadow-elegant sm:px-12">
          <h2 className="font-serif text-4xl font-medium text-primary-foreground sm:text-5xl">
            Ready to create something beautiful?
          </h2>
          <p className="mt-4 text-base text-primary-foreground/80">
            Let's bring your vision to life.
          </p>
          <Link
            to="/book"
            className="mt-8 inline-block rounded-full bg-cream px-8 py-3 text-sm font-medium text-primary transition-transform hover:scale-105"
          >
            Book Your Shoot
          </Link>
        </div>
      </section>
    </main>
  );
}
