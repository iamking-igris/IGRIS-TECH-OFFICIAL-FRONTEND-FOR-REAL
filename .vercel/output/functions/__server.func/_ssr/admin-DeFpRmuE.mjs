import { u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as useProjects } from "./router-RsAy9zmm.mjs";
import { g as useEcosystem, h as useContentHydrated } from "./router-RsAy9zmm2.mjs";
import { i as useReviews } from "./reviews-DcTRiFDH.mjs";
import { n as AdminPending } from "./admin-gate-BQd-UODf.mjs";
import { o as useInquiries } from "./contact-DCov1Dcc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DeFpRmuE.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const hydrated = useContentHydrated();
	const projects = useProjects();
	const ecosystem = useEcosystem();
	const reviews = useReviews();
	const inquiries = useInquiries();
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPending, { children: "Loading dashboard" });
	const stats = [
		{
			index: "01",
			label: "Projects",
			value: projects.length,
			to: "/admin/projects"
		},
		{
			index: "02",
			label: "Published projects",
			value: projects.filter((p) => p.published).length,
			to: "/admin/projects"
		},
		{
			index: "03",
			label: "Ecosystem items",
			value: ecosystem.length,
			to: "/admin/ecosystem"
		},
		{
			index: "04",
			label: "Published reviews",
			value: reviews.filter((r) => r.status === "approved" && r.published).length,
			to: "/admin/reviews"
		},
		{
			index: "05",
			label: "Pending reviews",
			value: reviews.filter((r) => r.status === "pending").length,
			to: "/admin/reviews"
		},
		{
			index: "06",
			label: "Inquiries",
			value: inquiries.length,
			to: "/admin/inquiries"
		}
	];
	const pending = reviews.filter((r) => r.status === "pending");
	const unread = inquiries.filter((i) => !i.read);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label-tech",
			children: "Overview"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-4xl font-semibold tracking-[-0.035em] md:text-5xl",
			children: "Dashboard"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-xl text-sm leading-relaxed text-quiet",
			children: "A working index of the public site’s content. Figures come from the local mock repository in this browser — not from a production API."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3",
			children: stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "border-t border-hairline pt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: stat.to,
					className: "block transition-colors hover:text-ink",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-widest text-faint",
							children: stat.index
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 font-display text-5xl font-semibold tracking-[-0.04em]",
							children: stat.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-quiet",
							children: stat.label
						})
					]
				})
			}, stat.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-16 grid gap-12 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-tech mb-4",
					children: "Pending reviews"
				}),
				pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border-t border-hairline pt-5 text-sm text-quiet",
					children: "No reviews waiting."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: pending.slice(0, 4).map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-t border-hairline py-4 last:border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink",
						children: review.clientName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-2 text-sm text-quiet",
						children: review.content
					})]
				}, review.id)) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/reviews",
					className: "mt-4 inline-flex items-center gap-2 text-sm",
					children: ["Manage reviews", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "btn-arrow",
						"aria-hidden": true,
						children: "→"
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-tech mb-4",
					children: "Unread inquiries"
				}),
				unread.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border-t border-hairline pt-5 text-sm text-quiet",
					children: "No unread briefs."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: unread.slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-t border-hairline py-4 last:border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-quiet",
						children: [item.type, item.company ? ` · ${item.company}` : ""]
					})]
				}, item.id)) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/inquiries",
					className: "mt-4 inline-flex items-center gap-2 text-sm",
					children: ["Open inquiries", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "btn-arrow",
						"aria-hidden": true,
						children: "→"
					})]
				})
			] })]
		})
	] });
}
//#endregion
export { Dashboard as component };
