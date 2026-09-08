import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button-link";
import { REVIEW_SERVICES, reviewsService } from "@/lib/content";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "error" | "success";

export function ReviewForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const clientName = String(data.get("clientName") ?? "").trim();
    const content = String(data.get("content") ?? "").trim();

    if (!clientName || !content || rating < 1) {
      setStatus("error");
      setMessage("Name, rating, and review are required.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      await reviewsService.submit({
        clientName,
        company: String(data.get("company") ?? "").trim(),
        role: String(data.get("role") ?? "").trim(),
        rating,
        content,
        project: String(data.get("project") ?? "").trim(),
        website: String(data.get("website") ?? "").trim(),
      });
      setStatus("success");
      form.reset();
      setRating(0);
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
        <p className="label-tech mb-4">Pending review</p>
        <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          Thank you.
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-quiet">
          Your note has been received and is pending. It will not appear on the
          site until it has been read and approved. We do not publish reviews
          automatically.
        </p>
        <Button className="mt-8" variant="ghost" onClick={() => setStatus("idle")}>
          Write another
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
          <input name="clientName" autoComplete="name" required className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          <span>
            Company / Brand <span className="text-faint">(optional)</span>
          </span>
          <input name="company" autoComplete="organization" className={field} />
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>
            Role <span className="text-faint">(optional)</span>
          </span>
          <input name="role" autoComplete="organization-title" className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          <span>
            Related work <span className="text-faint">(optional)</span>
          </span>
          <select name="project" defaultValue="" className={field}>
            <option value="">Select if you can</option>
            {REVIEW_SERVICES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <fieldset className="grid gap-3">
        <legend className="text-sm">Rating</legend>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              aria-pressed={rating === n}
              aria-label={`${n} out of 5`}
              className={cn(
                "flex h-12 w-12 items-center justify-center border text-sm transition-colors duration-150",
                rating >= n
                  ? "border-ink bg-ink text-canvas"
                  : "border-hairline text-quiet hover:border-quiet",
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-2 text-sm">
        <span>Your review</span>
        <textarea
          name="content"
          required
          className={area}
          placeholder="What was it like to work with IGRIS Tech?"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span>
          Website or company URL <span className="text-faint">(optional)</span>
        </span>
        <input
          name="website"
          type="url"
          inputMode="url"
          placeholder="https://"
          className={field}
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
          {status === "submitting" ? "Sending…" : "Submit review"}
        </Button>
      </div>
    </form>
  );
}
