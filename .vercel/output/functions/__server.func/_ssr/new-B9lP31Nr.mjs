import { u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as projectsService, x as emptyProjectInput } from "./router-ZY7VAfYm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ProjectForm } from "./project-form-BinQRA8l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-B9lP31Nr.js
var import_jsx_runtime = require_jsx_runtime();
function NewProject() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label-tech",
			children: "Selected Work"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-4xl font-semibold tracking-[-0.035em]",
			children: "New project"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-xl text-sm leading-relaxed text-quiet",
			children: "Content only. Imagery is handled by the public visual system — do not invent clients, quotes, or results."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectForm, {
				initial: emptyProjectInput(),
				submitLabel: "Create project",
				onCancel: () => navigate({ to: "/admin/projects" }),
				onSubmit: (input) => {
					projectsService.create(input);
					toast("Project created.");
					navigate({ to: "/admin/projects" });
				}
			})
		})
	] });
}
//#endregion
export { NewProject as component };
