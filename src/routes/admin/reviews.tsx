import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminPending } from "@/components/admin/admin-gate";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  AdminEmpty,
  Field,
  StatusMark,
  TextArea,
  TextInput,
} from "@/components/admin/fields";
import { Button } from "@/components/ui/button-link";
import {
  formatDate,
  reviewDisplayStatus,
  reviewsService,
  useContentHydrated,
  useReviews,
  type Review,
  type ReviewDisplayStatus,
} from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/reviews")({
  head: () =>
    pageHead({
      title: "Reviews — IGRIS Admin",
      description: "Moderate client reviews.",
      path: "/admin/reviews",
      noIndex: true,
    }),
  component: ReviewsAdmin,
});

const FILTERS: { id: "all" | ReviewDisplayStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "published", label: "Published" },
  { id: "rejected", label: "Rejected" },
];

function toneFor(status: ReviewDisplayStatus) {
  if (status === "published") return "ink" as const;
  if (status === "rejected") return "danger" as const;
  return "quiet" as const;
}

function ReviewsAdmin() {
  const hydrated = useContentHydrated();
  const reviews = useReviews();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [editing, setEditing] = useState<Review | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Review | null>(null);

  const visible = useMemo(() => {
    if (filter === "all") return reviews;
    return reviews.filter((r) => reviewDisplayStatus(r) === filter);
  }, [reviews, filter]);

  if (!hydrated) return <AdminPending>Loading reviews</AdminPending>;

  return (
    <div>
      <p className="label-tech">Moderation</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em]">
        Reviews
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-quiet">
        Public submissions arrive as pending. Only approved, published notes
        appear on the site.
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter reviews">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              "h-10 border px-3 text-xs tracking-wide transition-colors duration-150",
              filter === item.id
                ? "border-ink bg-ink text-canvas"
                : "border-hairline text-quiet hover:border-quiet",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {editing ? (
        <div className="mt-10 border-t border-hairline pt-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
            Edit review
          </h2>
          <div className="mt-8">
            <ReviewEditForm
              review={editing}
              onCancel={() => setEditing(null)}
              onSave={(patch) => {
                reviewsService.update(editing.id, patch);
                toast("Review saved.");
                setEditing(null);
              }}
            />
          </div>
        </div>
      ) : null}

      {visible.length === 0 ? (
        <AdminEmpty
          title="No reviews in this view."
          body="When a client leaves a note, it will wait here until it is approved."
        />
      ) : (
        <ul className="mt-10">
          {visible.map((review) => {
            const status = reviewDisplayStatus(review);
            return (
              <li
                key={review.id}
                className="border-t border-hairline py-6 last:border-b"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusMark tone={toneFor(status)}>
                        {status.toUpperCase()}
                      </StatusMark>
                      <span className="font-mono text-[10px] tracking-widest text-faint">
                        {formatDate(review.createdAt)}
                        {review.rating
                          ? ` · ${review.rating}/5`
                          : ""}
                      </span>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-ink">
                      {review.content}
                    </p>
                    <p className="mt-3 text-sm text-quiet">
                      {review.clientName}
                      {review.role ? `, ${review.role}` : ""}
                      {review.company ? ` — ${review.company}` : ""}
                      {review.project ? ` · ${review.project}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {review.status === "pending" ? (
                      <>
                        <Button
                          variant="primary"
                          className="h-10 min-h-10 px-3 text-xs"
                          onClick={() => {
                            reviewsService.approve(review.id);
                            toast("Review approved and published.");
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          className="h-10 min-h-10 px-3 text-xs"
                          onClick={() => {
                            reviewsService.reject(review.id);
                            toast("Review rejected.");
                          }}
                        >
                          Reject
                        </Button>
                      </>
                    ) : null}
                    {review.status === "approved" ? (
                      <Button
                        variant="ghost"
                        className="h-10 min-h-10 px-3 text-xs"
                        onClick={() => {
                          reviewsService.setPublished(review.id, !review.published);
                          toast(
                            review.published
                              ? "Unpublished from the public site."
                              : "Published on the public site.",
                          );
                        }}
                      >
                        {review.published ? "Unpublish" : "Publish"}
                      </Button>
                    ) : null}
                    {review.status === "rejected" ? (
                      <Button
                        variant="ghost"
                        className="h-10 min-h-10 px-3 text-xs"
                        onClick={() => {
                          reviewsService.approve(review.id);
                          toast("Review approved and published.");
                        }}
                      >
                        Approve
                      </Button>
                    ) : null}
                    <Button
                      variant="ghost"
                      className="h-10 min-h-10 px-3 text-xs"
                      onClick={() => setEditing(review)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-10 min-h-10 px-3 text-xs text-danger"
                      onClick={() => setPendingDelete(review)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this review?"
        body="The note will be removed from the mock repository in this browser."
        confirmLabel="Delete review"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            reviewsService.delete(pendingDelete.id);
            toast("Review deleted.");
            if (editing?.id === pendingDelete.id) setEditing(null);
          }
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

function ReviewEditForm({
  review,
  onSave,
  onCancel,
}: {
  review: Review;
  onSave: (patch: Partial<Review>) => void;
  onCancel: () => void;
}) {
  const [clientName, setClientName] = useState(review.clientName);
  const [company, setCompany] = useState(review.company);
  const [role, setRole] = useState(review.role);
  const [content, setContent] = useState(review.content);
  const [project, setProject] = useState(review.project ?? "");
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!clientName.trim() || !content.trim()) {
      setError("Name and review are required.");
      return;
    }
    onSave({
      clientName: clientName.trim(),
      company: company.trim(),
      role: role.trim(),
      content: content.trim(),
      project: project.trim() || null,
    });
  }

  return (
    <form onSubmit={submit} className="grid max-w-xl gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Name" htmlFor="rev-name">
          <TextInput
            id="rev-name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </Field>
        <Field label="Company" htmlFor="rev-company">
          <TextInput
            id="rev-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Field>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Role" htmlFor="rev-role">
          <TextInput
            id="rev-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </Field>
        <Field label="Related work" htmlFor="rev-project">
          <TextInput
            id="rev-project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
        </Field>
      </div>
      <Field label="Review" htmlFor="rev-content">
        <TextArea
          id="rev-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Field>
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="primary">
          Save review
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
