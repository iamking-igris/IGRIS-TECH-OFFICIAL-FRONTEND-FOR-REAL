import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as cn, h as Button } from "./router-LJGBwkzE.mjs";
import { h as useContentHydrated } from "./router-LJGBwkzE2.mjs";
import { i as useReviews, n as reviewsService } from "./reviews-DcTRiFDH.mjs";
import { a as StatusMark, o as TextArea, r as Field, s as TextInput, t as AdminEmpty } from "./fields-BhPnEFGH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AdminPending } from "./admin-gate-DitP9PCx.mjs";
import { t as ConfirmDialog } from "./confirm-dialog-BPb7esTL.mjs";
import { r as reviewDisplayStatus, t as formatDate } from "./labels-Bn3OGMpp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-SbltytRS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "pending",
		label: "Pending"
	},
	{
		id: "approved",
		label: "Approved"
	},
	{
		id: "published",
		label: "Published"
	},
	{
		id: "rejected",
		label: "Rejected"
	}
];
function toneFor(status) {
	if (status === "published") return "ink";
	if (status === "rejected") return "danger";
	return "quiet";
}
function ReviewsAdmin() {
	const hydrated = useContentHydrated();
	const reviews = useReviews();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const visible = (0, import_react.useMemo)(() => {
		if (filter === "all") return reviews;
		return reviews.filter((r) => reviewDisplayStatus(r) === filter);
	}, [reviews, filter]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPending, { children: "Loading reviews" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label-tech",
			children: "Moderation"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-4xl font-semibold tracking-[-0.035em]",
			children: "Reviews"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-xl text-sm leading-relaxed text-quiet",
			children: "Public submissions arrive as pending. Only approved, published notes appear on the site."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex flex-wrap gap-2",
			role: "tablist",
			"aria-label": "Filter reviews",
			children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": filter === item.id,
				onClick: () => setFilter(item.id),
				className: cn("h-10 border px-3 text-xs tracking-wide transition-colors duration-150", filter === item.id ? "border-ink bg-ink text-canvas" : "border-hairline text-quiet hover:border-quiet"),
				children: item.label
			}, item.id))
		}),
		editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 border-t border-hairline pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold tracking-[-0.03em]",
				children: "Edit review"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewEditForm, {
					review: editing,
					onCancel: () => setEditing(null),
					onSave: (patch) => {
						reviewsService.update(editing.id, patch);
						toast("Review saved.");
						setEditing(null);
					}
				})
			})]
		}) : null,
		visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmpty, {
			title: "No reviews in this view.",
			body: "When a client leaves a note, it will wait here until it is approved."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-10",
			children: visible.map((review) => {
				const status = reviewDisplayStatus(review);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border-t border-hairline py-6 last:border-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusMark, {
										tone: toneFor(status),
										children: status.toUpperCase()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-[10px] tracking-widest text-faint",
										children: [formatDate(review.createdAt), review.rating ? ` · ${review.rating}/5` : ""]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-base leading-relaxed text-ink",
									children: review.content
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm text-quiet",
									children: [
										review.clientName,
										review.role ? `, ${review.role}` : "",
										review.company ? ` — ${review.company}` : "",
										review.project ? ` · ${review.project}` : ""
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								review.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "primary",
									className: "h-10 min-h-10 px-3 text-xs",
									onClick: () => {
										reviewsService.approve(review.id);
										toast("Review approved and published.");
									},
									children: "Approve"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									className: "h-10 min-h-10 px-3 text-xs",
									onClick: () => {
										reviewsService.reject(review.id);
										toast("Review rejected.");
									},
									children: "Reject"
								})] }) : null,
								review.status === "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									className: "h-10 min-h-10 px-3 text-xs",
									onClick: () => {
										reviewsService.setPublished(review.id, !review.published);
										toast(review.published ? "Unpublished from the public site." : "Published on the public site.");
									},
									children: review.published ? "Unpublish" : "Publish"
								}) : null,
								review.status === "rejected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									className: "h-10 min-h-10 px-3 text-xs",
									onClick: () => {
										reviewsService.approve(review.id);
										toast("Review approved and published.");
									},
									children: "Approve"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									className: "h-10 min-h-10 px-3 text-xs",
									onClick: () => setEditing(review),
									children: "Edit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									className: "h-10 min-h-10 px-3 text-xs text-danger",
									onClick: () => setPendingDelete(review),
									children: "Delete"
								})
							]
						})]
					})
				}, review.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: Boolean(pendingDelete),
			title: "Delete this review?",
			body: "The note will be removed from the mock repository in this browser.",
			confirmLabel: "Delete review",
			onCancel: () => setPendingDelete(null),
			onConfirm: () => {
				if (pendingDelete) {
					reviewsService.delete(pendingDelete.id);
					toast("Review deleted.");
					if (editing?.id === pendingDelete.id) setEditing(null);
				}
				setPendingDelete(null);
			}
		})
	] });
}
function ReviewEditForm({ review, onSave, onCancel }) {
	const [clientName, setClientName] = (0, import_react.useState)(review.clientName);
	const [company, setCompany] = (0, import_react.useState)(review.company);
	const [role, setRole] = (0, import_react.useState)(review.role);
	const [content, setContent] = (0, import_react.useState)(review.content);
	const [project, setProject] = (0, import_react.useState)(review.project ?? "");
	const [error, setError] = (0, import_react.useState)("");
	function submit(e) {
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
			project: project.trim() || null
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "grid max-w-xl gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					htmlFor: "rev-name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						id: "rev-name",
						value: clientName,
						onChange: (e) => setClientName(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Company",
					htmlFor: "rev-company",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						id: "rev-company",
						value: company,
						onChange: (e) => setCompany(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Role",
					htmlFor: "rev-role",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						id: "rev-role",
						value: role,
						onChange: (e) => setRole(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Related work",
					htmlFor: "rev-project",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						id: "rev-project",
						value: project,
						onChange: (e) => setProject(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Review",
				htmlFor: "rev-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "rev-content",
					value: content,
					onChange: (e) => setContent(e.target.value)
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				role: "alert",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "primary",
					children: "Save review"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: onCancel,
					children: "Cancel"
				})]
			})
		]
	});
}
//#endregion
export { ReviewsAdmin as component };
