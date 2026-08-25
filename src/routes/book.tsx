import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import {
  PACKAGES,
  SHOOT_TYPES,
  generateConfirmationEmail,
  hasConflict,
  saveBooking,
  type Booking,
  type PackageId,
} from "@/lib/bookings";

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): { package?: PackageId | undefined } => ({
    package: search["package"] === "half" || search["package"] === "full" ? (search["package"] as PackageId) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Shoot — Miss A Studios" },
      {
        name: "description",
        content: "Submit a booking request with Miss A Studios in three simple steps.",
      },
      { property: "og:title", content: "Book a Shoot — Miss A Studios" },
      {
        property: "og:description",
        content: "Submit a booking request with Miss A Studios in three simple steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  shootType: string;
  packageId: PackageId;
  date: string;
  time: string;
  location: string;
  people: string;
  notes: string;
}

const inputCls =
  "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function BookPage() {
  const { package: preselected } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [confirmedChecked, setConfirmedChecked] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState<Booking | null>(null);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    shootType: "Portrait",
    packageId: preselected ?? "half",
    date: "",
    time: "",
    location: "",
    people: "1",
    notes: "",
  });

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function next() {
    setError("");
    if (step === 0 && (!form.fullName.trim() || !form.email.trim() || !form.phone.trim())) {
      setError("Please complete your name, email and phone number.");
      return;
    }
    if (step === 1) {
      if (!form.date || !form.time || !form.location.trim()) {
        setError("Please provide your preferred date, start time and location.");
        return;
      }
      if (hasConflict(form.date, form.time)) {
        setError("That time is currently unavailable. Please choose another date or time.");
        return;
      }
    }
    setStep((s) => s + 1);
  }

  function submit() {
    if (hasConflict(form.date, form.time)) {
      setError("That time is currently unavailable. Please choose another date or time.");
      setStep(1);
      return;
    }
    const booking: Booking = {
      id: crypto.randomUUID(),
      ...form,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    saveBooking(booking);
    setSubmitted(booking);
  }

  const pkg = PACKAGES[form.packageId];

  if (submitted) {
    const email = generateConfirmationEmail(submitted);
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft sm:p-12">
          <Logo className="justify-center" />
          <CheckCircle2 className="mx-auto mt-6 h-12 w-12 text-primary" />
          <h1 className="mt-4 font-serif text-4xl font-medium">
            Your booking request has been received ✨
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Thank you for choosing Miss A Studios. We've received your booking request and will
            review your preferred date and details before confirming your session.
          </p>
          <p className="mt-6 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-secondary-foreground">
            Booking Status: Pending Confirmation
          </p>
        </div>

        {/* Generated confirmation email */}
        <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <h2 className="font-serif text-2xl font-medium">Your confirmation email</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Generated automatically — no real email is sent in this prototype.
          </p>
          <div className="mt-5 rounded-xl bg-cream p-5">
            <p className="text-sm font-medium">Subject: {email.subject}</p>
            <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
              {email.body}
            </pre>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm font-medium text-primary hover:underline">
            ← Back to Miss A Studios
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="font-serif text-5xl font-medium">Book a Shoot</h1>
        <p className="mt-3 text-muted-foreground">Three short steps — less than a minute.</p>
      </header>

      {/* Progress */}
      <div className="mt-10 flex items-center justify-center gap-2">
        {["Client Details", "Shoot Details", "Notes & Review"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className={
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium " +
                (i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")
              }
            >
              {i + 1}
            </span>
            <span className={"hidden text-xs sm:inline " + (i <= step ? "text-foreground" : "text-muted-foreground")}>
              {label}
            </span>
            {i < 2 && <span className="mx-1 h-px w-6 bg-border sm:w-10" />}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <Field label="Full Name">
              <input className={inputCls} value={form.fullName} onChange={set("fullName")} placeholder="Your full name" />
            </Field>
            <Field label="Email Address">
              <input className={inputCls} type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
            </Field>
            <Field label="Phone Number">
              <input className={inputCls} type="tel" value={form.phone} onChange={set("phone")} placeholder="+27 …" />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <Field label="Type of Shoot">
              <select className={inputCls} value={form.shootType} onChange={set("shootType")}>
                {SHOOT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Package">
              <select
                className={inputCls}
                value={form.packageId}
                onChange={(e) => setForm((f) => ({ ...f, packageId: e.target.value as PackageId }))}
              >
                <option value="half">Half Day — R2,500 (3 hours)</option>
                <option value="full">Full Day — R5,500 (7 hours + 100 edited images)</option>
              </select>
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Preferred Date">
                <input className={inputCls} type="date" value={form.date} onChange={set("date")} />
              </Field>
              <Field label="Preferred Start Time">
                <input className={inputCls} type="time" value={form.time} onChange={set("time")} />
              </Field>
            </div>
            <Field label="Location">
              <input className={inputCls} value={form.location} onChange={set("location")} placeholder="Where would you like to shoot?" />
            </Field>
            <Field label="Number of People">
              <input className={inputCls} type="number" min={1} value={form.people} onChange={set("people")} />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Field label="Tell us anything else about your shoot">
              <textarea
                className={inputCls + " min-h-28 resize-y"}
                value={form.notes}
                onChange={set("notes")}
                placeholder="Ideas, mood, references, questions…"
              />
            </Field>

            <div className="rounded-xl bg-cream p-5">
              <h2 className="font-serif text-xl font-medium">Review your booking</h2>
              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                {[
                  ["Client Name", form.fullName],
                  ["Shoot Type", form.shootType],
                  ["Package", `${pkg.name} — ${pkg.price}`],
                  ["Date", form.date],
                  ["Time", form.time],
                  ["Location", form.location],
                  ["Number of People", form.people],
                  ["Additional Notes", form.notes || "—"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{k}</dt>
                    <dd className="mt-0.5 text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <label className="flex items-start gap-3 text-sm text-foreground">
              <input
                type="checkbox"
                checked={confirmedChecked}
                onChange={(e) => setConfirmedChecked(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#8B0000]"
              />
              I have reviewed my booking information and confirm that it is correct.
            </label>
          </div>
        )}

        {error && <p className="mt-5 text-sm font-medium text-destructive">{error}</p>}

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={"text-sm text-muted-foreground hover:text-foreground " + (step === 0 ? "invisible" : "")}
          >
            ← Back
          </button>
          {step < 2 ? (
            <button
              onClick={next}
              className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-burgundy-deep"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!confirmedChecked}
              className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-burgundy-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Confirm Booking Request
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
