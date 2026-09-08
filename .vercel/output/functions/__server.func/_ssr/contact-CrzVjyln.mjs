import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as cn, a as breadcrumbJsonLd, h as Button, m as Container } from "./router-LJGBwkzE.mjs";
import { t as JsonLd } from "./json-ld-IR7igJk0.mjs";
import { t as PageHeader } from "./page-header-InNPX9q0.mjs";
import { a as contactService, i as TIMELINES, n as CONTACT_METHODS, r as PROJECT_TYPES, t as BUDGETS } from "./contact-DCov1Dcc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CrzVjyln.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactForm() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		const name = String(data.get("name") ?? "").trim();
		const email = String(data.get("email") ?? "").trim();
		const description = String(data.get("description") ?? "").trim();
		const type = String(data.get("type") ?? "").trim();
		if (!name || !email || !description || !type) {
			setStatus("error");
			setMessage("Please complete the required fields.");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setStatus("error");
			setMessage("Enter a valid email address.");
			return;
		}
		setStatus("submitting");
		setMessage("");
		try {
			await contactService.submit({
				name,
				email,
				company: String(data.get("company") ?? "").trim(),
				type,
				description,
				budget: String(data.get("budget") ?? "").trim(),
				timeline: String(data.get("timeline") ?? "").trim(),
				website: String(data.get("website") ?? "").trim(),
				contactMethod: String(data.get("contactMethod") ?? "").trim()
			});
			setStatus("success");
			form.reset();
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
				children: "Received"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl",
				children: "Project request received"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-base leading-relaxed text-quiet",
				children: "We’ve captured the brief. A project inbox will be connected here as the backend lands — we’ll review new inquiries as they come in."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-8",
				variant: "ghost",
				onClick: () => setStatus("idle"),
				children: "Send another"
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
						name: "name",
						autoComplete: "name",
						required: true,
						className: field
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "email",
						type: "email",
						autoComplete: "email",
						required: true,
						className: field
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Company / Brand ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: "(optional)"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "company",
						autoComplete: "organization",
						className: field
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Existing website / product ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: "(optional)"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "website",
						type: "url",
						inputMode: "url",
						placeholder: "https://",
						className: field
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Project type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "type",
						required: true,
						defaultValue: "",
						className: field,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							disabled: true,
							children: "Select one"
						}), PROJECT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t,
							children: t
						}, t))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Preferred contact ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: "(optional)"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "contactMethod",
						defaultValue: "",
						className: field,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select if you can"
						}), CONTACT_METHODS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t,
							children: t
						}, t))]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Timeline ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: "(optional)"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "timeline",
						defaultValue: "",
						className: field,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select if you can"
						}), TIMELINES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t,
							children: t
						}, t))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Budget ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: "(optional)"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "budget",
						defaultValue: "",
						className: field,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select if you can"
						}), BUDGETS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t,
							children: t
						}, t))]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Project description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					name: "description",
					required: true,
					className: area,
					placeholder: "What do you want to build?"
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
				children: status === "submitting" ? "Sending…" : "Start a Project"
			}) })
		]
	});
}
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: breadcrumbJsonLd([{
				name: "Home",
				path: "/"
			}, {
				name: "Contact",
				path: "/contact"
			}]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Contact",
				title: "Start a project",
				description: "Share the brief. We’ll review it and follow up. This form is prepared for a future project inbox — no automated email is sent from this page yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
				className: "grid gap-12 py-16 md:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "md:col-span-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-quiet",
							children: "Typical work includes websites, web applications, custom software, AI features, and automation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm leading-relaxed text-quiet",
							children: "If you already know the shape of the product, say so. If you don’t, say that too — Discover is part of the work."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-8 text-sm leading-relaxed text-quiet",
							children: [
								"Worked with us already?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/review",
									className: "text-ink underline-offset-4 hover:underline",
									children: "Leave a review"
								}),
								"."
							]
						})
					]
				})]
			}) })
		]
	});
}
//#endregion
export { ContactPage as component };
