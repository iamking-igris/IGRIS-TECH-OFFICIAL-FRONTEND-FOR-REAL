import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as PROJECT_STATUSES, h as Button, j as slugify, v as PROJECT_CATEGORIES, y as PROJECT_SERVICE_OPTIONS } from "./router-ZY7VAfYm.mjs";
import { i as SelectInput, n as CheckRow, o as TextArea, r as Field, s as TextInput } from "./fields-BhPnEFGH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-form-BinQRA8l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectForm({ initial, submitLabel, onSubmit, onCancel }) {
	const [form, setForm] = (0, import_react.useState)(initial);
	const [tech, setTech] = (0, import_react.useState)(initial.technologies.join(", "));
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
//#endregion
export { ProjectForm as t };
