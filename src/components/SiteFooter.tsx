import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Music2 } from "lucide-react";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-14 sm:px-6">
        <Logo />
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/portfolio" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Portfolio
          </Link>
          <Link to="/packages" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Packages
          </Link>
          <Link to="/book" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Book Now
          </Link>
        </nav>
        {/* Replace the href="#" placeholders with the real social URLs when available. */}
        <div className="flex items-center gap-5">
          <a href="#" aria-label="Instagram" className="text-taupe transition-colors hover:text-primary">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" aria-label="TikTok" className="text-taupe transition-colors hover:text-primary">
            <Music2 className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Email" className="text-taupe transition-colors hover:text-primary">
            <Mail className="h-5 w-5" />
          </a>
        </div>
        <p className="text-center text-xs tracking-wide text-muted-foreground">
          Miss A Studios © 2026 — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
