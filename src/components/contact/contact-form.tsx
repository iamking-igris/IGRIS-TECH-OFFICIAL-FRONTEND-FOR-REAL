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
      contactService.submit({
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
      <div>
        <Button
          type="submit"
          variant="primary"
          arrow
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Start a Project"}
        </Button>
      </div>
    </form>
  );
}
