import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import {
  PACKAGES,
  getBookings,
  updateBookingStatus,
  type Booking,
  type BookingStatus,
} from "@/lib/bookings";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Studio Dashboard — Miss A Studios" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const SECTIONS: { status: BookingStatus; label: string }[] = [
  { status: "pending", label: "Pending" },
  { status: "confirmed", label: "Confirmed" },
  { status: "rescheduled", label: "Rescheduled" },
  { status: "declined", label: "Declined" },
];

function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  function setStatus(id: string, status: BookingStatus) {
    setBookings(updateBookingStatus(id, status));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="flex flex-col items-center gap-3 text-center">
        <Logo />
        <h1 className="font-serif text-4xl font-medium">Booking Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Private studio view — review and manage booking requests.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {SECTIONS.map(({ status, label }) => {
          const list = bookings.filter((b) => b.status === status);
          return (
            <section key={status}>
              <h2 className="flex items-center gap-3 font-serif text-2xl font-medium">
                {label}
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-sans font-medium text-muted-foreground">
                  {list.length}
                </span>
              </h2>

              {list.length === 0 ? (
                <p className="mt-4 rounded-xl border border-dashed border-border px-5 py-8 text-center text-sm text-muted-foreground">
                  No {label.toLowerCase()} bookings yet.
                </p>
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {list.map((b) => {
                    const pkg = PACKAGES[b.packageId];
                    return (
                      <article key={b.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-serif text-xl font-medium">{b.fullName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {b.shootType} · {pkg.name} ({pkg.price})
                            </p>
                          </div>
                          <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-secondary-foreground">
                            {b.status}
                          </span>
                        </div>
                        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div>
                            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Date</dt>
                            <dd>{b.date}</dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Time</dt>
                            <dd>{b.time}</dd>
                          </div>
                          <div className="col-span-2">
                            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Location</dt>
                            <dd>{b.location}</dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-wider text-muted-foreground">People</dt>
                            <dd>{b.people}</dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Contact</dt>
                            <dd className="break-all text-xs">{b.email}</dd>
                          </div>
                          {b.notes && (
                            <div className="col-span-2">
                              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Notes</dt>
                              <dd className="text-muted-foreground">{b.notes}</dd>
                            </div>
                          )}
                        </dl>
                        <div className="mt-5 flex flex-wrap gap-2">
                          <button
                            onClick={() => setStatus(b.id, "confirmed")}
                            className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-burgundy-deep"
                          >
                            Confirm Booking
                          </button>
                          <button
                            onClick={() => setStatus(b.id, "rescheduled")}
                            className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => setStatus(b.id, "declined")}
                            className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                          >
                            Decline
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
