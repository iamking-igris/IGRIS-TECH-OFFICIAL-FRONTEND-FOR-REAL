import { u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { m as Container } from "./router-ZY7VAfYm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-InNPX9q0.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ kicker, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "relative border-b border-hairline",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "pb-16 pt-28 md:pb-20 md:pt-36",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-tech mb-5",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-4xl font-display text-4xl font-semibold tracking-[-0.035em] md:text-6xl",
					children: title
				}),
				description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-base leading-relaxed text-quiet md:text-lg",
					children: description
				}) : null
			]
		})
	});
}
//#endregion
export { PageHeader as t };
