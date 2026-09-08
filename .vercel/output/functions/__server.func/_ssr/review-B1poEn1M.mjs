import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as cn, a as breadcrumbJsonLd, h as Button, m as Container } from "./router-LJGBwkzE.mjs";
import { n as reviewsService, t as REVIEW_SERVICES } from "./reviews-DcTRiFDH.mjs";
import { t as JsonLd } from "./json-ld-IR7igJk0.mjs";
import { t as PageHeader } from "./page-header-InNPX9q0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-B1poEn1M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReviewForm() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)("");
	const [rating, setRating] = (0, import_react.useState)(0);
	async function onSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		const clientName = String(data.get("clientName") ?? "").trim();
		const content = String(data.get("content") ?? "").trim();
		if (!clientName || !content || rating < 1) {
			setStatus("error");
			setMessage("Name, rating, and review are required.");
			return;
		}
		setStatus("submitting");
		setMessage("");
		try {
			await reviewsService.submit({
				clientName,
				company: String(data.get("company") ?? "").trim(),
				role: String(data.get("role") ?? "").trim(),
				rating,
				content,
				project: String(data.get("project") ?? "").trim(),
				website: String(data.get("website") ?? "").trim()
			});
			setStatus("success");
			form.reset();
			setRating(0);
		} catch (err) {
			setStatus("error");
			setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
		}
	}
	if (status === "success") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-hairline bg-panel p-8 md:p-12",
		role: "status",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-tech mb-4",
				children: "Pending review"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl",
				children: "Thank you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-base leading-relaxed text-quiet",
				children: "Your note has been received and is pending. It will not appear on the site until it has been read and approved. We do not publish reviews automatically."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-8",
				variant: "ghost",
				onClick: () => setStatus("idle"),
				children: "Write another"
			})
		]
	});
	const field = "h-12 w-full border border-hairline bg-canvas px-4 text-sm text-ink placeholder:text-faint focus:border-ink";
	const area = cn(field, "h-40 py-3");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "grid gap-6",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "clientName",
						autoComplete: "name",
						required: true,
						className: field
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Company / Brand ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: "(optional)"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "company",
						autoComplete: "organization",
						className: field
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Role ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: "(optional)"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "role",
						autoComplete: "organization-title",
						className: field
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Related work ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: "(optional)"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "project",
						defaultValue: "",
						className: field,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select if you can"
						}), REVIEW_SERVICES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t,
							children: t
						}, t))]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm",
					children: "Rating"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setRating(n),
						"aria-pressed": rating === n,
						"aria-label": `${n} out of 5`,
						className: cn("flex h-12 w-12 items-center justify-center border text-sm transition-colors duration-150", rating >= n ? "border-ink bg-ink text-canvas" : "border-hairline text-quiet hover:border-quiet"),
						children: n
					}, n))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					name: "content",
					required: true,
					className: area,
					placeholder: "What was it like to work with IGRIS Tech?"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Website or company URL ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-faint",
					children: "(optional)"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "website",
					type: "url",
					inputMode: "url",
					placeholder: "https://",
					className: field
				})]
			}),
			status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				role: "alert",
				children: message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				variant: "primary",
				arrow: true,
				disabled: status === "submitting",
				children: status === "submitting" ? "Sending…" : "Submit review"
			}) })
		]
	});
}
function ReviewPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: breadcrumbJsonLd([{
				name: "Home",
				path: "/"
			}, {
				name: "Leave a Review",
				path: "/review"
			}]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Reviews",
				title: "Leave a review",
				description: "If you’ve worked with IGRIS Tech, we’d like to hear it in your words. Notes are not published automatically — they are read first."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
				className: "grid gap-12 py-16 md:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewForm, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "md:col-span-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-quiet",
						children: "A review can name the project, the company, and the work. It does not need to be long. It does need to be true."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm leading-relaxed text-quiet",
						children: "Pending notes stay off the public site until they are approved. We do not invent testimonials to fill the page in the meantime."
					})]
				})]
			}) })
		]
	});
}
//#endregion
export { ReviewPage as component };
