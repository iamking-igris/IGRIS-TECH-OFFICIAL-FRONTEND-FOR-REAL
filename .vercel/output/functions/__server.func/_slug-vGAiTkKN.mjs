import { u as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as useProjectBySlug, a as breadcrumbJsonLd, d as getService, g as ButtonLink, i as absoluteUrl, k as useRelatedProjects, m as Container, o as creativeWorkJsonLd } from "./_ssr/router-LJGBwkzE.mjs";
import { a as Route$3, h as useContentHydrated, r as NotFoundPage } from "./_ssr/router-LJGBwkzE2.mjs";
import { t as JsonLd } from "./_ssr/json-ld-IR7igJk0.mjs";
import { t as StatusChip } from "./_ssr/status-chip-DXl3zibr.mjs";
import { t as ProjectVisual } from "./_ssr/project-visual-CawO2wU_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-vGAiTkKN.js
var import_jsx_runtime = require_jsx_runtime();
function Pending({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-4 leading-relaxed text-quiet",
		children: children || "This section will be published with the case study."
	});
}
function CaseStudy() {
	const { slug } = Route$3.useParams();
	const hydrated = useContentHydrated();
	const project = useProjectBySlug(slug);
	const related = useRelatedProjects(slug);
	if (!project) {
		if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			id: "main",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
				className: "pb-10 pt-28 md:pt-36",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-tech mb-5",
					children: "Work"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-semibold tracking-[-0.035em] text-quiet md:text-6xl",
					children: "Loading case study"
				})]
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundPage, {});
	}
	const next = related[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: breadcrumbJsonLd([
				{
					name: "Home",
					path: "/"
				},
				{
					name: "Work",
					path: "/work"
				},
				{
					name: project.title,
					path: `/work/${project.slug}`
				}
			]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: creativeWorkJsonLd({
				name: project.title,
				description: project.description,
				url: absoluteUrl(`/work/${project.slug}`),
				dateCreated: project.year ? String(project.year) : null
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-hairline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
					className: "pb-10 pt-28 md:pt-36",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "label-tech mb-5",
							children: ["Work / ", project.category]
						}),
						project.placeholder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { children: "CASE STUDY IN PREPARATION" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-semibold tracking-[-0.035em] md:text-6xl",
							children: project.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-10 grid gap-6 border-t border-hairline pt-6 text-sm sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-mono text-[10px] tracking-widest text-faint",
									children: "CLIENT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-ink",
									children: project.client
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-mono text-[10px] tracking-widest text-faint",
									children: "CATEGORY"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-ink",
									children: project.category
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-mono text-[10px] tracking-widest text-faint",
									children: "YEAR"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-ink",
									children: project.year ?? "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-mono text-[10px] tracking-widest text-faint",
									children: "STATUS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-ink",
									children: project.placeholder ? "In preparation" : "Published"
								})] })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectVisual, {
						visual: project.visual,
						imageUrl: project.cover_image || project.featuredImage,
						className: "mb-10 aspect-[16/8] min-h-56 w-full",
						caption: project.placeholder ? "PREPARING" : project.category.toUpperCase()
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
				className: "grid gap-12 py-16 md:grid-cols-12 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-14 md:col-span-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Overview"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-quiet",
							children: project.overview
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "The challenge"
						}), project.challenge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-quiet",
							children: project.challenge
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pending, {})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Objectives"
						}), project.objectives.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-6",
							children: project.objectives.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-4 border-t border-hairline py-4 text-sm last:border-b",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs tracking-widest text-faint",
									children: String(i + 1).padStart(2, "0")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
							}, item))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pending, {})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "The approach"
						}), project.approach ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-quiet",
							children: project.approach
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pending, {})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Design"
						}), project.design ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-quiet",
							children: project.design
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pending, {})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Development"
						}), project.development ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-quiet",
							children: project.development
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pending, {})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Key decisions"
						}), project.keyDecisions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-6",
							children: project.keyDecisions.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-t border-hairline pt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold",
									children: d.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-quiet",
									children: d.text
								})]
							}, d.title))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pending, {})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Results"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-quiet",
							children: project.results ?? "Results will be published when they are real. We do not invent metrics."
						})] }),
						project.gallery.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Project gallery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 grid gap-4",
							children: project.gallery.map((image) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: image.src,
								alt: image.alt,
								className: "w-full border border-hairline"
							}) }, image.src))
						})] }),
						project.testimonial && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Client note"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
							className: "mt-4 text-lg leading-relaxed text-ink",
							children: project.testimonial
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "md:col-span-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-hairline p-6 md:sticky md:top-28",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-tech mb-4",
								children: "Services"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2 text-sm",
								children: project.services.length > 0 ? project.services.map((slug) => {
									const s = getService(slug);
									return s ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: s.href,
										className: "hover:underline",
										children: s.name
									}) }, slug) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: slug }, slug);
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-quiet",
									children: "To be published with the case study."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-tech mb-4 mt-8",
								children: "Technology"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-quiet",
								children: project.technologies.length > 0 ? project.technologies.join(", ") : "To be published with the case study."
							}),
							project.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: project.url,
								className: "mt-8 inline-flex items-center gap-2 text-sm",
								target: "_blank",
								rel: "noreferrer",
								children: ["Visit project", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "→"
								})]
							})
						]
					})
				})]
			}) }),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
					className: "py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-tech mb-8",
						children: "Related work"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: related.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-t border-hairline last:border-b",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/work/$slug",
							params: { slug: item.slug },
							className: "flex flex-wrap items-baseline justify-between gap-3 py-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-xl font-semibold",
								children: [
									String(i + 1).padStart(2, "0"),
									"  ",
									item.title
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-quiet",
								children: item.category
							})]
						})
					}, item.slug)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
					className: "flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold",
						children: "Start a similar project"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-quiet",
						children: "Tell us what you want to build."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/contact",
						variant: "primary",
						children: "Start a Project"
					})]
				})
			}),
			next && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
					className: "grid gap-8 py-12 md:grid-cols-12 md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-tech mb-3",
							children: "Next project"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/work/$slug",
							params: { slug: next.slug },
							className: "inline-flex items-center gap-3 font-display text-3xl font-semibold",
							children: [next.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-arrow",
								"aria-hidden": true,
								children: "→"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/work/$slug",
							params: { slug: next.slug },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectVisual, {
								visual: next.visual,
								className: "aspect-[16/8]",
								interactive: false
							})
						})
					})]
				})
			})
		]
	});
}
//#endregion
export { CaseStudy as component };
