import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as projectsService, D as useProjects, b as PROJECT_STATUSES, g as ButtonLink, h as Button } from "./router-RsAy9zmm.mjs";
import { h as useContentHydrated } from "./router-RsAy9zmm2.mjs";
import { a as StatusMark, s as TextInput, t as AdminEmpty } from "./fields-BhPnEFGH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AdminPending } from "./admin-gate-BQd-UODf.mjs";
import { t as ConfirmDialog } from "./confirm-dialog-BPb7esTL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-BB_dk0qG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectsIndex() {
	const hydrated = useContentHydrated();
	const projects = useProjects();
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return projects;
		return projects.filter((p) => [
			p.title,
			p.client,
			p.category,
			p.slug
		].join(" ").toLowerCase().includes(q));
	}, [projects, query]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPending, { children: "Loading projects" });
	const target = projects.find((p) => p.id === pendingDelete);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-tech",
				children: "Selected Work"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl font-semibold tracking-[-0.035em]",
				children: "Projects"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
				to: "/admin/projects/new",
				variant: "primary",
				children: "New project"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 max-w-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Search title, client, category",
				"aria-label": "Search projects"
			})
		}),
		filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmpty, {
			title: projects.length === 0 ? "No projects yet." : "No matches.",
			body: projects.length === 0 ? "Add a case study when there is real work to publish. Do not invent clients or results." : "Try a different search.",
			action: projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
				to: "/admin/projects/new",
				variant: "ghost",
				children: "New project"
			}) : void 0
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-10",
			children: filtered.map((project, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-4 border-t border-hairline py-6 last:border-b md:grid-cols-12 md:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-widest text-faint md:col-span-1",
						children: String(i + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl font-semibold tracking-[-0.03em]",
							children: project.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-quiet",
							children: [
								project.client,
								" · ",
								project.category
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 md:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusMark, {
							tone: project.published ? "ink" : "quiet",
							children: project.published ? "PUBLISHED" : "DRAFT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusMark, { children: PROJECT_STATUSES.find((s) => s.value === project.status)?.label.toUpperCase() ?? project.status.toUpperCase() })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 md:col-span-4 md:justify-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "h-10 min-h-10 px-3 text-xs",
								onClick: () => navigate({
									to: "/admin/projects/$id",
									params: { id: project.id }
								}),
								children: "Edit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "h-10 min-h-10 px-3 text-xs",
								onClick: () => {
									projectsService.setPublished(project.id, !project.published);
									toast(project.published ? "Unpublished from the public site." : "Published on the public site.");
								},
								children: project.published ? "Unpublish" : "Publish"
							}),
							project.published ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/work/$slug",
								params: { slug: project.slug },
								className: "inline-flex h-10 items-center px-3 text-xs text-quiet hover:text-ink",
								children: "View"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "h-10 min-h-10 px-3 text-xs text-danger",
								onClick: () => setPendingDelete(project.id),
								children: "Delete"
							})
						]
					})
				]
			}, project.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: Boolean(target),
			title: "Delete this project?",
			body: target ? `“${target.title}” will be removed from the mock repository in this browser. This cannot be undone here.` : "",
			confirmLabel: "Delete project",
			onCancel: () => setPendingDelete(null),
			onConfirm: () => {
				if (target) {
					projectsService.delete(target.id);
					toast("Project deleted.");
				}
				setPendingDelete(null);
			}
		})
	] });
}
//#endregion
export { ProjectsIndex as component };
