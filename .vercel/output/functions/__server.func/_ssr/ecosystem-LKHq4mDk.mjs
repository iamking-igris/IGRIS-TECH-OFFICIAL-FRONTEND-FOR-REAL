import { u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as FUTURE_PRODUCTS_NOTE, a as breadcrumbJsonLd, m as Container } from "./router-ZY7VAfYm.mjs";
import { _ as usePublishedEcosystem } from "./router-ZY7VAfYm2.mjs";
import { t as JsonLd } from "./json-ld-IR7igJk0.mjs";
import { t as StatusChip } from "./status-chip-DXl3zibr.mjs";
import { t as CtaBand } from "./cta-band-DnOAzWzz.mjs";
import { t as PageHeader } from "./page-header-InNPX9q0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ecosystem-LKHq4mDk.js
var import_jsx_runtime = require_jsx_runtime();
function EcosystemPage() {
	const ecosystemProducts = usePublishedEcosystem();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: breadcrumbJsonLd([{
				name: "Home",
				path: "/"
			}, {
				name: "Ecosystem",
				path: "/ecosystem"
			}]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Ecosystem",
				title: "Products we build for ourselves.",
				description: "IGRIS Tech is the parent technology brand. Client work keeps us close to real problems. In parallel we are building products of our own — each will live on its own subdomain when it is ready."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
					className: "py-16 md:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-10 md:grid-cols-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-hairline pt-6 md:col-span-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "label-tech mb-4",
									children: "Parent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-3xl font-semibold tracking-[-0.03em]",
									children: "IGRIS Tech"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm leading-relaxed text-quiet",
									children: "igristech.com — the company, the client work, and the public face of the ecosystem."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "md:col-span-8",
							children: [ecosystemProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "border-t border-hairline py-8 last:border-b",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-quiet",
									children: "Ecosystem products will appear here when they are ready to share."
								})
							}) : ecosystemProducts.map((product, i) => {
								const href = product.url;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									id: product.slug,
									className: "border-t border-hairline py-8 last:border-b",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-baseline justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-mono text-xs tracking-widest text-faint",
												children: [
													String(i + 1).padStart(2, "0"),
													" / ",
													product.category.toUpperCase()
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { children: product.status.toUpperCase() })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-5 font-display text-3xl font-semibold tracking-[-0.03em]",
											children: product.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 max-w-lg text-sm leading-relaxed text-quiet",
											children: product.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-5 font-mono text-xs tracking-wider text-faint",
											children: href ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href,
												className: "text-ink hover:underline",
												children: [href.replace(/^https?:\/\//, ""), " →"]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [product.subdomain, " — not live yet"] })
										})
									]
								}, product.slug);
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-t border-hairline py-8 last:border-b",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-xs tracking-widest text-faint",
										children: [String(ecosystemProducts.length + 1).padStart(2, "0"), " / FUTURE"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-5 font-display text-3xl font-semibold tracking-[-0.03em]",
										children: "Future products"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 max-w-lg text-sm leading-relaxed text-quiet",
										children: FUTURE_PRODUCTS_NOTE
									})
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-10 max-w-xl text-sm leading-relaxed text-quiet",
						children: [
							"Client work and the ecosystem are connected. One does not replace the other.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "text-ink underline-offset-4 hover:underline",
								children: "How IGRIS thinks"
							}),
							"."
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
		]
	});
}
//#endregion
export { EcosystemPage as component };
