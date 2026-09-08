import { u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as breadcrumbJsonLd, f as services, m as Container, p as supportingCapabilities, w as useFeaturedProjects } from "./router-RsAy9zmm.mjs";
import { t as JsonLd } from "./json-ld-IR7igJk0.mjs";
import { t as CtaBand } from "./cta-band-DnOAzWzz.mjs";
import { t as PageHeader } from "./page-header-InNPX9q0.mjs";
import { t as ProcessSection } from "./process-section-DPmsKxDg.mjs";
import { t as servicesFaq } from "./faq-BqQC9f8a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-Dt_f1W3U.js
var import_jsx_runtime = require_jsx_runtime();
function ServicesIndex() {
	const work = useFeaturedProjects();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: breadcrumbJsonLd([{
				name: "Home",
				path: "/"
			}, {
				name: "Services",
				path: "/services"
			}]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Services",
				title: "Capabilities, not a catalogue of buzzwords.",
				description: "Four focused services. Hire IGRIS Tech to design, build, and launch digital products."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
					className: "py-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-t border-hairline last:border-b",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: service.href,
							className: "group grid gap-4 py-10 md:grid-cols-12 md:items-start",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs tracking-widest text-faint md:col-span-2",
									children: service.index
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "md:col-span-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-3xl font-semibold tracking-[-0.03em]",
										children: service.name
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm leading-relaxed text-quiet md:col-span-5",
									children: [service.short, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 block text-faint",
										children: service.problem
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-ink md:col-span-1 md:text-right",
									children: "→"
								})
							]
						})
					}, service.slug)) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
					className: "py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl",
						children: "Around the work"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-10 grid gap-8 md:grid-cols-3",
						children: supportingCapabilities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-hairline pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-semibold",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-quiet",
								children: item.text
							})]
						}, item.name))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessSection, {}),
			work.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
					className: "py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Relevant work"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8",
						children: work.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-t border-hairline py-5 last:border-b",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/work/$slug",
								params: { slug: project.slug },
								className: "flex flex-wrap items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl font-semibold",
									children: project.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-quiet",
									children: project.category
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
export { ServicesIndex as component };
