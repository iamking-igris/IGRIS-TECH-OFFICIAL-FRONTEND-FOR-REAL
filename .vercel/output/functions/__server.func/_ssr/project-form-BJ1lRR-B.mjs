import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { P as slugify, _ as cn, b as PROJECT_STATUSES, h as Button, v as PROJECT_CATEGORIES, y as PROJECT_SERVICE_OPTIONS } from "./router-RsAy9zmm.mjs";
import { i as SelectInput, n as CheckRow, o as TextArea, r as Field, s as TextInput } from "./fields-BhPnEFGH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-form-BJ1lRR-B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectForm({ initial, submitLabel, onSubmit, onCancel }) {
	const [form, setForm] = (0, import_react.useState)(initial);
	const [tech, setTech] = (0, import_react.useState)(initial.technologies.join(", "));
	const [cover, setCover] = (0, import_react.useState)(initial.cover_image ?? "");
	const [error, setError] = (0, import_react.useState)("");
	const [slugTouched, setSlugTouched] = (0, import_react.useState)(Boolean(initial.slug));
	function patch(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function onTitle(value) {
		patch("title", value);
		if (!slugTouched) patch("slug", slugify(value));
	}
	function toggleService(slug) {
		patch("services", form.services.includes(slug) ? form.services.filter((s) => s !== slug) : [...form.services, slug]);
	}
	function submit(e) {
		e.preventDefault();
		if (!form.title.trim()) {
			setError("Title is required.");
			return;
		}
		setError("");
		onSubmit({
			...form,
			cover_image: cover,
			technologies: tech.split(",").map((t) => t.trim()).filter(Boolean)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "grid max-w-3xl gap-6",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Title",
					htmlFor: "title",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						id: "title",
						value: form.title,
						onChange: (e) => onTitle(e.target.value),
						required: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Slug",
					htmlFor: "slug",
					hint: "(URL)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						id: "slug",
						value: form.slug,
						onChange: (e) => {
							setSlugTouched(true);
							patch("slug", e.target.value);
						}
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Client",
					htmlFor: "client",
					hint: "(leave blank if unannounced)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						id: "client",
						value: form.client,
						onChange: (e) => patch("client", e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Category",
					htmlFor: "category",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						id: "category",
						value: form.category,
						onChange: (e) => patch("category", e.target.value),
						children: PROJECT_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Short description",
				htmlFor: "description",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "description",
					className: "h-24",
					value: form.description,
					onChange: (e) => patch("description", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Overview",
				htmlFor: "overview",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "overview",
					value: form.overview,
					onChange: (e) => patch("overview", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Challenge",
				htmlFor: "challenge",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "challenge",
					value: form.challenge,
					onChange: (e) => patch("challenge", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Approach",
				htmlFor: "approach",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "approach",
					value: form.approach,
					onChange: (e) => patch("approach", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Design",
				htmlFor: "design",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "design",
					value: form.design,
					onChange: (e) => patch("design", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Development",
				htmlFor: "development",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "development",
					value: form.development,
					onChange: (e) => patch("development", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Results",
				htmlFor: "results",
				hint: "(leave blank rather than inventing metrics)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "results",
					value: form.results,
					onChange: (e) => patch("results", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm",
					children: "Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: PROJECT_SERVICE_OPTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckRow, {
						checked: form.services.includes(s.slug),
						onChange: () => toggleService(s.slug),
						children: s.label
					}, s.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Technologies",
				htmlFor: "tech",
				hint: "(comma separated)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					id: "tech",
					value: tech,
					onChange: (e) => setTech(e.target.value),
					placeholder: "React, Node, PostgreSQL"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Project URL",
					htmlFor: "url",
					hint: "(optional)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						id: "url",
						type: "url",
						inputMode: "url",
						placeholder: "https://",
						value: form.url,
						onChange: (e) => patch("url", e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Status",
					htmlFor: "status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						id: "status",
						value: form.status,
						onChange: (e) => patch("status", e.target.value),
						children: PROJECT_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.value,
							children: s.label
						}, s.value))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2 md:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Cover image URL",
					htmlFor: "cover_image",
					hint: "(external image link)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						id: "cover_image",
						type: "url",
						inputMode: "url",
						placeholder: "https://example.com/cover.jpg",
						value: cover,
						onChange: (e) => setCover(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 font-mono text-[10px] tracking-widest text-faint",
					children: "PREVIEW"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverImagePreview, { url: cover })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 border-t border-hairline pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckRow, {
					checked: form.published,
					onChange: (next) => patch("published", next),
					children: "Published on the public site"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckRow, {
					checked: form.featured,
					onChange: (next) => patch("featured", next),
					children: "Feature on the homepage Selected Work"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				role: "alert",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "primary",
					arrow: true,
					children: submitLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: onCancel,
					children: "Cancel"
				})]
			})
		]
	});
}
function CoverImagePreview({ url }) {
	const [loadState, setLoadState] = (0, import_react.useState)("idle");
	(0, import_react.useEffect)(() => {
		if (!url.trim()) {
			setLoadState("idle");
			return;
		}
		setLoadState("loading");
	}, [url]);
	if (!url.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex aspect-[16/9] w-full max-w-xs flex-col items-center justify-center border border-hairline bg-panel p-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 hex-grid opacity-20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] tracking-widest text-faint",
				children: "IGRIS / NO COVER IMAGE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-quiet",
				children: "Enter an image URL to preview"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-[16/9] w-full max-w-xs overflow-hidden border border-hairline bg-canvas",
		children: [
			loadState === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center bg-panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] tracking-widest text-faint animate-pulse",
					children: "LOADING PREVIEW..."
				})
			}),
			loadState === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center bg-panel p-4 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] tracking-widest text-faint",
					children: "UNABLE TO LOAD IMAGE PREVIEW"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-quiet",
					children: "Verify image URL is accessible"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: url,
				alt: "Project cover preview",
				className: cn("h-full w-full object-cover transition-opacity duration-300", loadState === "loaded" ? "opacity-100" : "opacity-0"),
				onLoad: () => setLoadState("loaded"),
				onError: () => setLoadState("error")
			})
		]
	});
}
//#endregion
export { ProjectForm as t };
