// Miss A Studios — booking data layer (prototype, stored in localStorage)

export const PACKAGES = {
  half: {
    id: "half",
    name: "Half Day",
    price: "R2,500",
    priceValue: 2500,
    features: ["3 Hours of Photography", "Professional photoshoot experience"],
  },
  full: {
    id: "full",
    name: "Full Day",
    price: "R5,500",
    priceValue: 5500,
    features: ["7 Hours of Photography", "100 Professionally Edited Images"],
  },
} as const;

export type PackageId = keyof typeof PACKAGES;

export const SHOOT_TYPES = [
  "Portrait",
  "Brand",
  "Lifestyle",
  "Event",
  "Creative",
  "Other",
] as const;

export type BookingStatus = "pending" | "confirmed" | "rescheduled" | "declined";

export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  shootType: string;
  packageId: PackageId;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
  people: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
}

const KEY = "miss-a-studios-bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as Booking[];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking): void {
  const all = getBookings();
  all.push(booking);
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function updateBookingStatus(id: string, status: BookingStatus): Booking[] {
  const all = getBookings().map((b) => (b.id === id ? { ...b, status } : b));
  window.localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}

/** Double-booking protection: a confirmed booking owns its date+time slot. */
export function hasConflict(date: string, time: string, excludeId?: string): boolean {
  return getBookings().some(
    (b) =>
      b.id !== excludeId &&
      b.status === "confirmed" &&
      b.date === date &&
      b.time === time,
  );
}

export function generateConfirmationEmail(b: Booking): { subject: string; body: string } {
  const pkg = PACKAGES[b.packageId];
  return {
    subject: "Your Miss A Studios Booking Request",
    body: `Hi ${b.fullName},

Thank you for choosing Miss A Studios. We've received your booking request and are excited to hear more about your shoot.

Your request:
Package: ${pkg.name} (${pkg.price})
Shoot type: ${b.shootType}
Date: ${b.date}
Time: ${b.time}
Location: ${b.location}

Your booking is currently pending confirmation. We'll be in touch once the details have been reviewed.

Warmly,
Miss A Studios`,
  };
}
