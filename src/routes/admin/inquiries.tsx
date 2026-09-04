import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminPending } from "@/components/admin/admin-gate";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { AdminEmpty, StatusMark } from "@/components/admin/fields";
import { Button } from "@/components/ui/button-link";
import {
  contactService,
  formatDateTime,
  useContentHydrated,
  useInquiries,
  type Inquiry,
} from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/inquiries")({
  head: () =>
    pageHead({
      title: "Inquiries — IGRIS Admin",
      description: "Project briefs captured from the public form.",
      path: "/admin/inquiries",
      noIndex: true,
    }),
  component: InquiriesAdmin,
});

function InquiriesAdmin() {
  const hydrated = useContentHydrated();
  const inquiries = useInquiries();
  const [openId, setOpenId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Inquiry | null>(null);

  if (!hydrated) return <AdminPending>Loading inquiries</AdminPending>;

  return (
    <div>
      <p className="label-tech">Contact</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em]">
        Inquiries
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-quiet">
        Briefs captured from Start a Project. Stored in this browser until a
        real inbox is connected — nothing is emailed from here.
      </p>

      {inquiries.length === 0 ? (
        <AdminEmpty
          title="No inquiries yet."
          body="When someone submits the public form, the brief will land here."
        />
      ) : (
        <ul className="mt-10">
          {inquiries.map((item) => {
            const open = openId === item.id;
            return (
              <li
                key={item.id}
                className="border-t border-hairline py-6 last:border-b"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusMark tone={item.read ? "quiet" : "ink"}>
                        {item.read ? "READ" : "NEW"}
                      </StatusMark>
                      <span className="font-mono text-[10px] tracking-widest text-faint">
                        {formatDateTime(item.createdAt)}
                      </span>
                    </div>
                    <p className="mt-3 font-display text-xl font-semibold tracking-[-0.03em]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-quiet">
                      {item.type}
                      {item.company ? ` · ${item.company}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="ghost"
                      className="h-10 min-h-10 px-3 text-xs"
                      onClick={() => {
                        setOpenId(open ? null : item.id);
                        if (!item.read) contactService.setRead(item.id, true);
                      }}
                    >
                      {open ? "Close" : "Open"}
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-10 min-h-10 px-3 text-xs text-danger"
                      onClick={() => setPendingDelete(item)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                {open ? (
                  <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
                    <div>
                      <dt className="font-mono text-[10px] tracking-widest text-faint">
                        EMAIL
                      </dt>
                      <dd className="mt-1">
                        <a href={`mailto:${item.email}`} className="hover:underline">
                          {item.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] tracking-widest text-faint">
                        CONTACT
                      </dt>
                      <dd className="mt-1">{item.contactMethod || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] tracking-widest text-faint">
                        TIMELINE
                      </dt>
                      <dd className="mt-1">{item.timeline || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] tracking-widest text-faint">
                        BUDGET
                      </dt>
                      <dd className="mt-1">{item.budget || "—"}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="font-mono text-[10px] tracking-widest text-faint">
                        WEBSITE
                      </dt>
                      <dd className="mt-1">{item.website || "—"}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="font-mono text-[10px] tracking-widest text-faint">
                        BRIEF
                      </dt>
                      <dd className="mt-2 max-w-2xl leading-relaxed text-quiet">
                        {item.description}
                      </dd>
                    </div>
                  </dl>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this inquiry?"
        body="The brief will be removed from the mock inbox in this browser."
        confirmLabel="Delete inquiry"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            contactService.delete(pendingDelete.id);
            toast("Inquiry deleted.");
            if (openId === pendingDelete.id) setOpenId(null);
          }
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
