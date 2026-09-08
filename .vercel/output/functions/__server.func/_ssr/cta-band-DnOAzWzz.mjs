import { u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as ButtonLink, m as Container } from "./router-RsAy9zmm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cta-band-DnOAzWzz.js
var import_jsx_runtime = require_jsx_runtime();
function CtaBand({ kicker = "Contact", title = "Have a project in mind?", text = "Tell us what you want to build. We’ll review it and get back to you." }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-hairline",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "grid gap-10 py-24 md:grid-cols-12 md:items-end md:py-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-tech mb-4",
						children: kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-3xl font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-lg text-base leading-relaxed text-quiet",
						children: text
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:col-span-4 md:justify-self-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/contact",
					variant: "primary",
					children: "Start a Project"
				})
			})]
		})
	});
}
//#endregion
export { CtaBand as t };
