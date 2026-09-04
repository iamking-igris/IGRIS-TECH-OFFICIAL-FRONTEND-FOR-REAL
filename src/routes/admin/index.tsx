import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminPending } from "@/components/admin/admin-gate";
import {
  useContentHydrated,
  useEcosystem,
  useInquiries,
  useProjects,
  useReviews,
} from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/")({
  head: () =>
    pageHead({
      title: "Dashboard — IGRIS Admin",
      description: "IGRIS Tech internal administration.",
      path: "/admin",
      noIndex: true,
    }),
  component: Dashboard,
});

function Dashboard() {
  const hydrated = useContentHydrated();
  const projects = useProjects();
  const ecosystem = useEcosystem();
  const reviews = useReviews();
  const inquiries = useInquiries();

  if (!hydrated) return <AdminPending>Loading dashboard</AdminPending>;

  const stats = [
    {
      index: "01",
      label: "Projects",
      value: projects.length,
      to: "/admin/projects",
    },
    {
      index: "02",
      label: "Published projects",
      value: projects.filter((p) => p.published).length,
      to: "/admin/projects",
    },
    {
      index: "03",
      label: "Ecosystem items",
      value: ecosystem.length,
      to: "/admin/ecosystem",
    },
    {
      index: "04",
      label: "Published reviews",
      value: reviews.filter((r) => r.status === "approved" && r.published).length,
      to: "/admin/reviews",
    },
    {
      index: "05",
      label: "Pending reviews",
      value: reviews.filter((r) => r.status === "pending").length,
      to: "/admin/reviews",
    },
    {
      index: "06",
      label: "Inquiries",
      value: inquiries.length,
      to: "/admin/inquiries",
    },
  ];

  const pending = reviews.filter((r) => r.status === "pending");
  const unread = inquiries.filter((i) => !i.read);

  return (
    <div>
      <p className="label-tech">Overview</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
        Dashboard
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-quiet">
        A working index of the public site’s content. Figures come from the
        local mock repository in this browser — not from a production API.
      </p>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <li key={stat.label} className="border-t border-hairline pt-5">
            <Link to={stat.to} className="block transition-colors hover:text-ink">
              <p className="font-mono text-[10px] tracking-widest text-faint">
                {stat.index}
              </p>
              <p className="mt-5 font-display text-5xl font-semibold tracking-[-0.04em]">
                {stat.value}
              </p>
              <p className="mt-3 text-sm text-quiet">{stat.label}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <section>
          <p className="label-tech mb-4">Pending reviews</p>
          {pending.length === 0 ? (
            <p className="border-t border-hairline pt-5 text-sm text-quiet">
              No reviews waiting.
            </p>
          ) : (
            <ul>
              {pending.slice(0, 4).map((review) => (
                <li
                  key={review.id}
                  className="border-t border-hairline py-4 last:border-b"
                >
                  <p className="text-sm text-ink">{review.clientName}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-quiet">
                    {review.content}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/admin/reviews"
            className="mt-4 inline-flex items-center gap-2 text-sm"
          >
            Manage reviews
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </section>
        <section>
          <p className="label-tech mb-4">Unread inquiries</p>
          {unread.length === 0 ? (
            <p className="border-t border-hairline pt-5 text-sm text-quiet">
              No unread briefs.
            </p>
          ) : (
            <ul>
              {unread.slice(0, 4).map((item) => (
                <li
                  key={item.id}
                  className="border-t border-hairline py-4 last:border-b"
                >
                  <p className="text-sm text-ink">{item.name}</p>
                  <p className="mt-1 text-sm text-quiet">
                    {item.type}
                    {item.company ? ` · ${item.company}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/admin/inquiries"
            className="mt-4 inline-flex items-center gap-2 text-sm"
          >
            Open inquiries
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}
