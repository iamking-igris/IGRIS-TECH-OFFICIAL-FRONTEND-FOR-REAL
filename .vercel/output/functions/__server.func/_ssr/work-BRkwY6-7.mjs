import { u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { O as usePublishedProjects, a as breadcrumbJsonLd, m as Container } from "./router-ZY7VAfYm.mjs";
import { t as JsonLd } from "./json-ld-IR7igJk0.mjs";
import { t as CtaBand } from "./cta-band-DnOAzWzz.mjs";
import { t as PageHeader } from "./page-header-InNPX9q0.mjs";
import { t as ProjectRow } from "./project-row-W5WxDPG3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/work-BRkwY6-7.js
var import_jsx_runtime = require_jsx_runtime();
function WorkIndex() {
	const published = usePublishedProjects();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: breadcrumbJsonLd([{
				name: "Home",
				path: "/"
			}, {
				name: "Work",
				path: "/work"
			}]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Work",
				title: "Selected work",
				description: "Client project content will be added here. Placeholders show how case studies will be presented — they are not invented clients."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				className: "py-16",
				children: published.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl text-sm leading-relaxed text-quiet",
					children: "Case studies will appear here when they are ready to share."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col",
					children: published.map((project, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectRow, {
						project,
						index: i,
						reverse: i % 2 === 1
					}, project.slug))
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, { title: "Have something similar in mind?" })
		]
	});
}
//#endregion
export { WorkIndex as component };
