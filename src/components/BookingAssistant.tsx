import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { chatWithAssistant } from "@/lib/chat.functions";
import { Logo } from "./Logo";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const OPENING =
  "Hi! I'm the Miss A Booking Assistant ✨ I can help you choose a photography package, answer booking questions and guide you through your booking. What are you planning to shoot?";

const QUICK_REPLIES = ["View Packages", "Help Me Choose", "Book a Shoot", "Ask a Question"];

/** Offline fallback used only if the AI gateway is unreachable. */
function fallbackReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("view packages") || t.includes("package"))
    return "We offer two packages ✨ Half Day — R2,500 for 3 hours of photography, and Full Day — R5,500 for 7 hours plus 100 professionally edited images. Would you like help choosing?";
  if (t.includes("book"))
    return "Wonderful! You can start your booking request on the Book Now page — it only takes a minute. Would you like me to explain the packages first?";
  if (t.includes("3 hour") || t.includes("three hour"))
    return "Our Half Day package could be a great fit. It's R2,500 for 3 hours of photography. Would you like to start a booking request?";
  if (t.includes("7 hour") || t.includes("seven hour") || t.includes("full day"))
    return "Our Full Day package sounds right for you — R5,500 for 7 hours of photography plus 100 professionally edited images. Would you like to start a booking request?";
  return "I don't have that information yet, but you can include it in your booking notes and Miss A Studios can confirm it with you.";
}

export function BookingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: OPENING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const callChat = useServerFn(chatWithAssistant);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const { reply } = await callChat({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: fallbackReply(trimmed) }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open the Miss A Booking Assistant"
        className={
          "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant transition-transform hover:scale-105 " +
          (open ? "hidden" : "")
        }
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-x-3 bottom-3 z-50 flex max-h-[78vh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-cream px-4 py-3">
            <div className="flex items-center gap-3">
              <Logo compact />
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-foreground">
                  Miss A Booking Assistant <Sparkles className="h-3.5 w-3.5 text-primary" />
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" /> Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm text-foreground"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                  Typing…
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-primary/40 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            className="flex items-center gap-2 border-t border-border px-3 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:border-ring"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-burgundy-deep"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="px-4 pb-3 text-[11px] leading-snug text-muted-foreground">
            AI Booking Assistant provides general booking guidance based on the information
            available on this website. Please verify important booking details with Miss A Studios
            before your booking is confirmed.
          </p>

          <div className="border-t border-border bg-cream px-4 py-2 text-center">
            <Link to="/book" className="text-xs font-medium text-primary hover:underline" onClick={() => setOpen(false)}>
              Ready? Start your booking request →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
