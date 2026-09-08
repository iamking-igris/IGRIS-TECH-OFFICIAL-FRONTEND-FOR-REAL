import { u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as cn } from "./router-LJGBwkzE.mjs";
import { t as StatusChip } from "./status-chip-DXl3zibr.mjs";
import { t as ProjectVisual } from "./project-visual-CawO2wU_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-row-N035qr0N.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectRow({ project, index, reverse = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/work/$slug",
		params: { slug: project.slug },
		className: "group grid border-t border-hairline py-10 last:border-b md:grid-cols-12 md:items-center md:gap-10 md:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("md:col-span-7", reverse && "md:order-2"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectVisual, {
				visual: project.visual,
				imageUrl: project.cover_image || project.featuredImage,
				className: "aspect-[16/10]",
				caption: project.placeholder ? "PREPARING" : project.category.toUpperCase()
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("mt-6 md:col-span-5 md:mt-0", reverse && "md:order-1"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs tracking-widest text-faint",
					children: [
						String(index + 1).padStart(2, "0"),
						" / ",
						project.category.toUpperCase()
					]
				}),
				project.placeholder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { children: "CASE STUDY IN PREPARATION" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-4 font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl",
					children: project.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-sm leading-relaxed text-quiet",
					children: project.description
				}),
				project.services.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-mono text-[10px] tracking-widest text-faint",
					children: project.services.join(" · ").replaceAll("-", " ").toUpperCase()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 inline-flex items-center gap-2 text-sm text-ink",
					children: ["View case study", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "btn-arrow",
						"aria-hidden": true,
						children: "→"
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProjectRow as t };
