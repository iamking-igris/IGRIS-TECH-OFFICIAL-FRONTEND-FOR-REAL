import { u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as breadcrumbJsonLd, g as ButtonLink, i as absoluteUrl, l as serviceJsonLd, m as Container, w as useFeaturedProjects } from "./router-LJGBwkzE.mjs";
import { t as JsonLd } from "./json-ld-IR7igJk0.mjs";
import { t as CtaBand } from "./cta-band-DnOAzWzz.mjs";
import { t as PageHeader } from "./page-header-InNPX9q0.mjs";
import { t as ProcessSection } from "./process-section-DPmsKxDg.mjs";
import { t as servicesFaq } from "./faq-BqQC9f8a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/service-page-DYni2D3z.js
var import_jsx_runtime = require_jsx_runtime();
function ServicePage({ service }) {
	const related = useFeaturedProjects().filter((p) => p.services.includes(service.slug));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: serviceJsonLd(service.name, service.description, absoluteUrl(service.href)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: breadcrumbJsonLd([
				{
					name: "Home",
					path: "/"
				},
				{
					name: "Services",
					path: "/services"
				},
				{
					name: service.name,
					path: service.href
				}
			]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: `Services / ${service.index}`,
				title: service.name,
				description: service.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
					className: "grid gap-12 py-16 md:grid-cols-12 md:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold tracking-[-0.03em]",
								children: "The problem"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-quiet",
								children: service.problem
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-12 font-display text-2xl font-semibold tracking-[-0.03em]",
								children: "Who it’s for"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-quiet",
								children: service.forWhom
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-12 font-display text-2xl font-semibold tracking-[-0.03em]",
								children: "What’s included"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6",
								children: service.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-hairline py-4 text-sm text-ink last:border-b",
									children: point
								}, point))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "md:col-span-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-hairline p-6 md:sticky md:top-28",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-quiet",
									children: "If this is the work you need, start a project and we’ll review the brief with you."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
									to: "/contact",
									variant: "primary",
									className: "mt-6",
									children: "Start a Project"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/work",
									className: "mt-4 inline-flex items-center gap-2 text-sm text-ink",
									children: ["Explore our work", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "btn-arrow",
										"aria-hidden": true,
										children: "→"
									})]
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessSection, {}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
					className: "py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Related work"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8",
						children: related.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-t border-hairline py-5 last:border-b",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/work/$slug",
								params: { slug: project.slug },
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-xl font-semibold",
									children: project.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-quiet",
									children: project.category
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-arrow",
									"aria-hidden": true,
									children: "→"
								})]
							})
						}, project.slug))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
					className: "py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Questions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-8",
						children: servicesFaq.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-hairline py-6 last:border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-display text-lg font-semibold",
								children: item.q
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-3 max-w-2xl text-sm leading-relaxed text-quiet",
								children: item.a
							})]
						}, item.q))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
		]
	});
}
//#endregion
export { ServicePage as t };
