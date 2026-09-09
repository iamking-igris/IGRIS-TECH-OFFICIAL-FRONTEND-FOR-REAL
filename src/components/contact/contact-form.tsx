import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button-link";
import {
  BUDGETS,
  CONTACT_METHODS,
  PROJECT_TYPES,
  TIMELINES,
  contactService,
} from "@/lib/content";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "error" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const type = String(data.get("type") ?? "").trim();

    if (!name || !email || !description || !type) {
      setStatus("error");
      setMessage("Please complete the required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      await contactService.submit({
        name,
        email,
        company: String(data.get("company") ?? "").trim(),
        type,
        description,
        budget: String(data.get("budget") ?? "").trim(),
        timeline: String(data.get("timeline") ?? "").trim(),
        website: String(data.get("website") ?? "").trim(),
        contactMethod: String(data.get("contactMethod") ?? "").trim(),
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-hairline bg-panel p-8 md:p-12" role="status">
        <p className="label-tech mb-4">Received</p>
        <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          Project request received
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-quiet">
          We’ve captured the brief. A project inbox will be connected here as
          the backend lands — we’ll review new inquiries as they come in.
        </p>
        <Button className="mt-8" variant="ghost" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  const field =
    "h-12 w-full border border-hairline bg-canvas px-4 text-sm text-ink placeholder:text-faint focus:border-ink";
  const area = cn(field, "h-40 py-3");

  return (
    <form onSubmit={onSubmit} className="grid gap-6" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>Name</span>
          <input name="name" autoComplete="name" required className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className={field}
          />
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>
            Company / Brand <span className="text-faint">(optional)</span>
          </span>
          <input name="company" autoComplete="organization" className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          <span>
            Existing website / product <span className="text-faint">(optional)</span>
          </span>
          <input
            name="website"
            type="url"
            inputMode="url"
            placeholder="https://"
            className={field}
          />
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>Project type</span>
          <select name="type" required defaultValue="" className={field}>
            <option value="" disabled>
              Select one
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span>
            Preferred contact <span className="text-faint">(optional)</span>
          </span>
          <select name="contactMethod" defaultValue="" className={field}>
            <option value="">Select if you can</option>
            {CONTACT_METHODS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>
            Timeline <span className="text-faint">(optional)</span>
          </span>
          <select name="timeline" defaultValue="" className={field}>
            <option value="">Select if you can</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span>
            Budget <span className="text-faint">(optional)</span>
          </span>
          <select name="budget" defaultValue="" className={field}>
            <option value="">Select if you can</option>
            {BUDGETS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        <span>Project description</span>
        <textarea
          name="description"
          required
          className={area}
          placeholder="What do you want to build?"
        />
      </label>
      {status === "error" && (
        <p className="text-sm text-danger" role="alert">
          {message}
        </p>
      )}
      <div className="grid gap-3">
        <Button
          type="submit"
          variant="primary"
          arrow
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Start a Project"}
        </Button>

        <a
          href="https://wa.me/2348147648714?text=Hi%2C%20I%27d%20like%20to%20start%20a%20project%20with%20IGRIS%20Tech"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 min-h-12 items-center justify-center gap-2.5 whitespace-nowrap border border-hairline bg-transparent px-6 text-sm font-medium tracking-wide text-ink transition-[color,background-color,border-color,transform] duration-150 ease-out hover:border-quiet hover:bg-raised/40 active:scale-[0.96]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current"
          >
            <path d="M20.52 3.48A11.6 11.6 0 0 0 12.09 1C6.34 1 1.7 5.66 1.7 11.4c0 2.02.53 3.99 1.53 5.72L1.6 22.4l5.46-1.42A10.4 10.4 0 0 0 12.09 21c5.75 0 10.41-4.66 10.41-10.4 0-2.78-1.08-5.4-3.0-7.12ZM12.09 18.8c-1.65 0-3.27-.44-4.68-1.28l-.34-.2-3.24.84.86-3.15-.22-.35A8.44 8.44 0 0 1 3.67 11.4c0-4.67 3.8-8.47 8.42-8.47 2.25 0 4.37.88 5.98 2.48a8.37 8.37 0 0 1 2.5 5.99c0 4.66-3.8 8.46-8.46 8.46Zm4.66-6.35c-.25-.13-1.48-.73-1.72-.82-.24-.08-.41-.13-.58.13-.17.25-.65.82-.8 1-.13.15-.28.18-.53.06-.25-.13-1.05-.39-2-1.26-.74-.66-1.23-1.48-1.38-1.73-.14-.25-.01-.39.11-.52.12-.12.26-.31.39-.46.13-.15.17-.26.26-.43.09-.17.05-.32-.02-.45-.07-.13-.58-1.4-.79-1.92-.21-.5-.42-.43-.58-.44h-.49c-.17 0-.45.06-.68.32-.23.26-.88.86-.88 2.09 0 1.23.9 2.44.1 2.9l.03.04c.14.21.9 1.36 2.19 2.1.77.33 1.38.54 1.85.69.77.24 1.47.21 2.03.12.62-.09 1.48-.61 1.69-1.19.2-.58.2-1.08.14-1.18-.07-.1-.24-.16-.49-.28Z" />
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    </form>
  );
}
