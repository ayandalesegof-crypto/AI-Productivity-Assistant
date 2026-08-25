import { createFileRoute } from "@tanstack/react-router";
import { GALLERY_IMAGES } from "@/lib/images";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Miss A Studios" },
      {
        name: "description",
        content:
          "Editorial photography portfolio by Miss A Studios — portraits, brands, lifestyle, creative and event photography.",
      },
      { property: "og:title", content: "Portfolio — Miss A Studios" },
      {
        property: "og:description",
        content: "Timeless editorial photography by Miss A Studios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-5xl font-medium">Portfolio</h1>
        <p className="mt-4 text-muted-foreground">
          A selection of recent editorial work — portraits, brands, lifestyle, creative and events.
        </p>
      </header>

      <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>figure]:mb-4">
        {GALLERY_IMAGES.map((img) => (
          <figure key={img.src} className="group break-inside-avoid overflow-hidden rounded-xl">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </figure>
        ))}
      </div>
    </main>
  );
}
