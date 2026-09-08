import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Button } from "./router-RsAy9zmm.mjs";
import { h as useContentHydrated } from "./router-RsAy9zmm2.mjs";
import { a as StatusMark, t as AdminEmpty } from "./fields-BhPnEFGH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AdminPending } from "./admin-gate-BQd-UODf.mjs";
import { a as contactService, o as useInquiries } from "./contact-DCov1Dcc.mjs";
import { t as ConfirmDialog } from "./confirm-dialog-BPb7esTL.mjs";
import { n as formatDateTime } from "./labels-Bn3OGMpp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiries-BI7OXkR5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InquiriesAdmin() {
	const hydrated = useContentHydrated();
	const inquiries = useInquiries();
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPending, { children: "Loading inquiries" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label-tech",
			children: "Contact"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-4xl font-semibold tracking-[-0.035em]",
			children: "Inquiries"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-xl text-sm leading-relaxed text-quiet",
			children: "Briefs captured from Start a Project. Stored in this browser until a real inbox is connected — nothing is emailed from here."
		}),
		inquiries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmpty, {
			title: "No inquiries yet.",
			body: "When someone submits the public form, the brief will land here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-10",
			children: inquiries.map((item) => {
				const open = openId === item.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-t border-hairline py-6 last:border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusMark, {
									tone: item.read ? "quiet" : "ink",
									children: item.read ? "READ" : "NEW"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] tracking-widest text-faint",
									children: formatDateTime(item.createdAt)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-xl font-semibold tracking-[-0.03em]",
								children: item.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-quiet",
								children: [item.type, item.company ? ` · ${item.company}` : ""]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "h-10 min-h-10 px-3 text-xs",
								onClick: () => {
									setOpenId(open ? null : item.id);
									if (!item.read) contactService.setRead(item.id, true);
								},
								children: open ? "Close" : "Open"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "h-10 min-h-10 px-3 text-xs text-danger",
								onClick: () => setPendingDelete(item),
								children: "Delete"
							})]
						})]
					}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 grid gap-4 text-sm md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-[10px] tracking-widest text-faint",
								children: "EMAIL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${item.email}`,
									className: "hover:underline",
									children: item.email
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-[10px] tracking-widest text-faint",
								children: "CONTACT"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: item.contactMethod || "—"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-[10px] tracking-widest text-faint",
								children: "TIMELINE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: item.timeline || "—"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-[10px] tracking-widest text-faint",
								children: "BUDGET"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: item.budget || "—"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-mono text-[10px] tracking-widest text-faint",
									children: "WEBSITE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1",
									children: item.website || "—"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-mono text-[10px] tracking-widest text-faint",
									children: "BRIEF"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-2 max-w-2xl leading-relaxed text-quiet",
									children: item.description
								})]
							})
						]
					}) : null]
				}, item.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: Boolean(pendingDelete),
			title: "Delete this inquiry?",
			body: "The brief will be removed from the mock inbox in this browser.",
			confirmLabel: "Delete inquiry",
			onCancel: () => setPendingDelete(null),
			onConfirm: () => {
				if (pendingDelete) {
					contactService.delete(pendingDelete.id);
					toast("Inquiry deleted.");
					if (openId === pendingDelete.id) setOpenId(null);
				}
				setPendingDelete(null);
			}
		})
	] });
}
//#endregion
export { InquiriesAdmin as component };
