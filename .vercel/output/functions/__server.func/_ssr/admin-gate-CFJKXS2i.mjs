import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as useRouterState, m as Outlet, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as cn, h as Button } from "./router-ZY7VAfYm.mjs";
import { t as BrandLockup } from "./router-ZY7VAfYm2.mjs";
import { i as useReviews } from "./reviews-BD-L5kxC.mjs";
import { s as TextInput } from "./fields-BhPnEFGH.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-gate-CFJKXS2i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Development-only admin gate.
*
* This is NOT production authentication.
* It is a temporary client-side check so the admin UI can be prototyped.
* Replace this module with real backend auth (session / HTTP-only cookie)
* before any public deployment of /admin.
*/
var SESSION_KEY = "igris-admin-dev-session";
/** Temporary mock password for local prototyping. Not a production secret. */
var DEV_MOCK_PASSWORD = "iamking";
function isAdminAuthenticated() {
	if (typeof window === "undefined") return false;
	return sessionStorage.getItem(SESSION_KEY) === "ok";
}
function loginAdmin(password) {
	if (password === DEV_MOCK_PASSWORD) {
		sessionStorage.setItem(SESSION_KEY, "ok");
		return true;
	}
	return false;
}
function logoutAdmin() {
	if (typeof window === "undefined") return;
	sessionStorage.removeItem(SESSION_KEY);
}
var NAV = [
	{
		to: "/admin",
		label: "Dashboard",
		index: "01"
	},
	{
		to: "/admin/projects",
		label: "Projects",
		index: "02"
	},
	{
		to: "/admin/ecosystem",
		label: "Ecosystem",
		index: "03"
	},
	{
		to: "/admin/reviews",
		label: "Reviews",
		index: "04"
	},
	{
		to: "/admin/inquiries",
		label: "Inquiries",
		index: "05"
	}
];
function AdminShell({ children, onLogout }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const pending = useReviews().filter((r) => r.status === "pending").length;
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	function logout() {
		logoutAdmin();
		onLogout();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-canvas text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-right",
				toastOptions: { style: {
					background: "#0e0e10",
					border: "1px solid #1d1d21",
					color: "#f3f3f0",
					borderRadius: 0,
					fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
				} }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-hairline bg-canvas px-5 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					"aria-label": "Admin home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, { compact: true })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "relative flex h-11 w-11 items-center justify-center",
					"aria-expanded": open,
					"aria-controls": "admin-nav",
					"aria-label": open ? "Close menu" : "Open menu",
					onClick: () => setOpen((v) => !v),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute h-px w-5 bg-ink transition-transform duration-200", open ? "rotate-45" : "-translate-y-1.5") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute h-px w-5 bg-ink transition-opacity duration-150", open ? "opacity-0" : "opacity-100") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute h-px w-5 bg-ink transition-transform duration-200", open ? "-rotate-45" : "translate-y-1.5") })
					]
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "fixed inset-0 z-30 bg-canvas/70 lg:hidden",
				"aria-label": "Close menu",
				onClick: () => setOpen(false)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				id: "admin-nav",
				className: cn("fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-hairline bg-canvas transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden h-16 items-center border-b border-hairline px-6 lg:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin",
							"aria-label": "Admin home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, { compact: true })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-tech px-6 pt-16 pb-4 lg:pt-6",
						children: "Internal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col px-3",
						"aria-label": "Admin",
						children: NAV.map((item) => {
							const active = item.to === "/admin" ? pathname === item.to || pathname === `${item.to}/` : pathname === item.to || pathname.startsWith(`${item.to}/`);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex items-baseline justify-between gap-3 px-3 py-3 text-sm transition-colors duration-150", active ? "text-ink" : "text-quiet hover:text-ink"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-baseline gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] tracking-widest text-faint",
										children: item.index
									}), item.label]
								}), item.to === "/admin/reviews" && pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] tracking-widest text-ink",
									children: String(pending).padStart(2, "0")
								}) : null]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-hairline p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: logout,
							className: "flex w-full px-3 py-3 text-left text-sm text-quiet transition-colors duration-150 hover:text-ink",
							children: "Logout"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:pl-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 pt-20 pb-16 sm:px-8 lg:px-12 lg:pt-12",
					children
				})
			})
		]
	});
}
function AdminGate() {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [authed, setAuthed] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		setAuthed(isAdminAuthenticated());
		setReady(true);
	}, [pathname]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-canvas text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label-tech",
			children: "IGRIS / ADMIN"
		})
	});
	if (!authed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLogin, { onSuccess: () => setAuthed(true) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, {
		onLogout: () => setAuthed(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
function AdminLogin({ onSuccess }) {
	const [error, setError] = (0, import_react.useState)("");
	const [value, setValue] = (0, import_react.useState)("");
	function onSubmit(e) {
		e.preventDefault();
		if (loginAdmin(value)) {
			setError("");
			onSuccess();
			return;
		}
		setError("That password isn’t right.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh flex-col bg-canvas text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "site-frame",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "site-frame-inner" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-[1] mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-tech mt-10",
					children: "Internal / Development"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl font-semibold tracking-[-0.035em]",
					children: "Admin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-quiet",
					children: "This is a development gate so the internal tools can be prototyped. It is not production authentication and will be replaced by a real session on the IGRIS Tech backend."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-10 grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								type: "password",
								name: "password",
								autoComplete: "current-password",
								value,
								onChange: (e) => setValue(e.target.value),
								required: true
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							role: "alert",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "primary",
							arrow: true,
							children: "Continue"
						})
					]
				})
			]
		})]
	});
}
function AdminPending({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label-tech",
			children: children ?? "Loading"
		})
	});
}
//#endregion
export { AdminPending as n, AdminGate as t };
