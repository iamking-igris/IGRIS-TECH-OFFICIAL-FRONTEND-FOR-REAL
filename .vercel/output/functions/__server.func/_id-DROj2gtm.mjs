import { u as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link, y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { C as projectsService, S as projectToInput, T as useProjectById } from "./_ssr/router-ZY7VAfYm.mjs";
import { h as useContentHydrated, i as Route$1 } from "./_ssr/router-ZY7VAfYm2.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as AdminPending } from "./_ssr/admin-gate-CFJKXS2i.mjs";
import { t as ProjectForm } from "./_ssr/project-form-BinQRA8l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DROj2gtm.js
var import_jsx_runtime = require_jsx_runtime();
function EditProject() {
	const { id } = Route$1.useParams();
	const hydrated = useContentHydrated();
	const project = useProjectById(id);
	const navigate = useNavigate();
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPending, { children: "Loading project" });
	if (!project) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label-tech",
			children: "Selected Work"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-4xl font-semibold tracking-[-0.035em]",
			children: "Project not found"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-quiet",
			children: "This record is not in the mock repository."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/admin/projects",
			className: "mt-6 inline-flex items-center gap-2 text-sm",
			children: ["Back to projects", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "btn-arrow",
				"aria-hidden": true,
				children: "→"
			})]
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label-tech",
			children: "Selected Work"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-4xl font-semibold tracking-[-0.035em]",
			children: "Edit project"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 max-w-xl text-sm leading-relaxed text-quiet",
			children: [project.title, project.published ? " · live on the public site" : " · draft"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectForm, {
				initial: projectToInput(project),
				submitLabel: "Save project",
				onCancel: () => navigate({ to: "/admin/projects" }),
				onSubmit: (input) => {
					projectsService.update(project.id, input);
					toast("Project saved.");
					navigate({ to: "/admin/projects" });
				}
			})
		})
	] });
}
//#endregion
export { EditProject as component };
