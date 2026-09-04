import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { C as projectsService, M as useContentStore, _ as cn, c as pageHead, d as getService, f as services, g as ButtonLink, m as Container, n as NAV, r as SITE } from "./router-ZY7VAfYm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-ZY7VAfYm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "flex min-h-dvh flex-col items-center justify-center gap-4 bg-canvas px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-tech",
				children: "Error"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-[-0.03em]",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-quiet",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
				to: "/",
				variant: "ghost",
				children: "Return Home"
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function LogoMark({ className, alt = "", onDark = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: onDark ? "/brand/igris-mark-on-dark.png" : "/brand/igris-mark.png",
		alt,
		width: 707,
		height: 755,
		className: cn("h-8 w-auto", className),
		decoding: "async"
	});
}
function BrandLockup({ className, onDark = true, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex items-center gap-2.5 md:gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {
			onDark,
			className: cn("h-[1.7rem] w-auto translate-y-px md:h-8", compact && "h-7"),
			alt: ""
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("wordmark translate-y-px text-[0.62rem] text-current md:text-[0.72rem]", onDark ? "text-ink" : "text-coal"),
			children: "IGRIS TECH"
		})]
	});
}
var ECOSYSTEM_STATUSES = [
	"Live",
	"In development",
	"Coming soon",
	"Experimental"
];
function emptyEcosystemInput() {
	return {
		name: "",
		description: "",
		url: "",
		status: "In development",
		order: 0,
		published: true
	};
}
function ecosystemToInput(item) {
	return {
		name: item.name,
		description: item.description,
		url: item.url ?? "",
		status: item.status,
		order: item.order,
		published: item.published
	};
}
/**
* Ecosystem repository.
* Mock implementation today. Later: GET/POST/PUT/DELETE /api/ecosystem.
*/
var ecosystemService = {
	list() {
		return [...useContentStore.getState().ecosystem].sort((a, b) => a.order - b.order);
	},
	published() {
		return ecosystemService.list().filter((p) => p.published);
	},
	getById(id) {
		return useContentStore.getState().ecosystem.find((p) => p.id === id) ?? null;
	},
	create(input) {
		return useContentStore.getState().createEcosystem(input);
	},
	update(id, input) {
		return useContentStore.getState().updateEcosystem(id, input);
	},
	delete(id) {
		useContentStore.getState().deleteEcosystem(id);
	}
};
function useEcosystem() {
	const ecosystem = useContentStore((s) => s.ecosystem);
	return (0, import_react.useMemo)(() => [...ecosystem].sort((a, b) => a.order - b.order), [ecosystem]);
}
function usePublishedEcosystem() {
	const ecosystem = useContentStore((s) => s.ecosystem);
	return (0, import_react.useMemo)(() => [...ecosystem].filter((p) => p.published).sort((a, b) => a.order - b.order), [ecosystem]);
}
/** True after the mock store has rehydrated from localStorage (client). */
function useContentHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const unsub = useContentStore.persist.onFinishHydration(() => {
			setHydrated(true);
		});
		if (useContentStore.persist.hasHydrated()) setHydrated(true);
		else useContentStore.persist.rehydrate();
		return unsub;
	}, []);
	return hydrated;
}
function SiteFooter() {
	const ecosystemProducts = usePublishedEcosystem();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-hairline bg-canvas",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "grid gap-16 py-16 md:grid-cols-12 md:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xs text-sm leading-relaxed text-quiet",
						children: "Building digital products for clients. Building an ecosystem of our own. The two are connected — they are not the same thing."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "mt-8 inline-flex items-center gap-2 text-sm text-ink",
						children: ["Start a Project", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-arrow",
							"aria-hidden": true,
							children: "→"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-tech mb-4",
						children: "Company"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/work",
								className: "text-ink/90 hover:text-ink",
								children: "Work"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ecosystem",
								className: "text-ink/90 hover:text-ink",
								children: "Ecosystem"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "text-ink/90 hover:text-ink",
								children: "About"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "text-ink/90 hover:text-ink",
								children: "Contact"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/review",
								className: "text-ink/90 hover:text-ink",
								children: "Leave a Review"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-tech mb-4",
						children: "Services"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3 text-sm",
						children: services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: s.href,
							className: "text-ink/90 hover:text-ink",
							children: s.name
						}) }, s.slug))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-tech mb-4",
						children: "Ecosystem"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3 text-sm",
						children: ecosystemProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ecosystem",
							hash: p.slug,
							className: "text-ink/90 hover:text-ink",
							children: p.name
						}) }, p.slug))
					})] })
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-hairline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
				className: "flex flex-col gap-3 py-6 text-xs text-faint md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" IGRIS Tech. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-x-5 gap-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "hover:text-quiet",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "hover:text-quiet",
							children: "Terms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono tracking-wider",
							children: "BUILDING · AUTOMATING"
						})
					]
				})]
			})
		})]
	});
}
function SiteNav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [hidden, setHidden] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const lastY = (0, import_react.useRef)(0);
	const ticking = (0, import_react.useRef)(false);
	const headerRef = (0, import_react.useRef)(null);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		lastY.current = window.scrollY;
		const update = () => {
			const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			const y = window.scrollY;
			const view = window.innerHeight;
			const max = Math.max(0, document.documentElement.scrollHeight - view);
			setProgress(max > 0 ? Math.min(1, y / max) : 0);
			setScrolled(y > 8);
			const delta = y - lastY.current;
			const atBottom = y >= max - 4;
			if (reduced || open || y < 56) setHidden(false);
			else if (atBottom && delta < 0) {} else if (delta > 12 && y > 96) setHidden(true);
			else if (delta < -10) setHidden(false);
			lastY.current = y;
			ticking.current = false;
		};
		const onScroll = () => {
			if (ticking.current) return;
			ticking.current = true;
			requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [open]);
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
		const onFocus = (event) => {
			if (headerRef.current?.contains(event.target)) setHidden(false);
		};
		document.addEventListener("focusin", onFocus);
		return () => document.removeEventListener("focusin", onFocus);
	}, []);
	const collapsed = hidden && !open;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		ref: headerRef,
		inert: collapsed ? true : void 0,
		className: cn("fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", collapsed ? "-translate-y-full pointer-events-none" : "translate-y-0", scrolled || open ? "border-b border-hairline bg-canvas/92 backdrop-blur-md" : "border-b border-transparent bg-transparent"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scroll-progress pointer-events-none absolute inset-x-0 bottom-0 h-px bg-ink/70",
				style: { ["--progress"]: progress },
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 md:h-[4.5rem] lg:px-12 xl:px-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "min-w-0 shrink text-ink",
						"aria-label": "IGRIS Tech home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-9 lg:flex",
						"aria-label": "Primary",
						children: [NAV.map((item) => {
							const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("relative text-[0.8125rem] tracking-wide transition-colors duration-150 hover:text-ink", active ? "text-ink" : "text-quiet"),
								children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("absolute -bottom-1 left-0 h-px w-full origin-left bg-ink transition-transform duration-200", active ? "scale-x-100" : "scale-x-0"),
									"aria-hidden": true
								})]
							}, item.to);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "inline-flex h-10 items-center gap-2 border border-ink bg-ink px-4 text-[0.8125rem] font-medium text-canvas transition-[background-color,color] duration-150 hover:bg-paper hover:text-coal",
							children: ["Start a Project", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-arrow",
								"aria-hidden": true,
								children: "→"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "relative flex h-11 w-11 shrink-0 items-center justify-center lg:hidden",
						"aria-expanded": open,
						"aria-controls": "mobile-nav",
						"aria-label": open ? "Close menu" : "Open menu",
						onClick: () => setOpen((v) => !v),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute h-px w-5 bg-ink transition-transform duration-200", open ? "translate-y-0 rotate-45" : "-translate-y-1.5") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute h-px w-5 bg-ink transition-opacity duration-150", open ? "opacity-0" : "opacity-100") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute h-px w-5 bg-ink transition-transform duration-200", open ? "translate-y-0 -rotate-45" : "translate-y-1.5") })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "mobile-nav",
				hidden: !open,
				className: "border-t border-hairline bg-canvas lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto px-5 py-8 sm:px-8",
					"aria-label": "Mobile",
					children: [NAV.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "flex items-baseline justify-between border-b border-hairline py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl font-semibold tracking-[-0.03em] text-ink",
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] tracking-widest text-faint",
							children: String(i + 1).padStart(2, "0")
						})]
					}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "mt-8 inline-flex h-12 items-center justify-center gap-2 bg-ink text-sm font-medium text-canvas",
						children: ["Start a Project", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "→"
						})]
					})]
				})
			})
		]
	});
}
function SiteGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "site-frame",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "site-frame-inner" })
	});
}
function SiteShell({ children }) {
	if (useRouterState({ select: (s) => s.location.pathname }).startsWith("/admin")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-canvas text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGrid, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function NotFoundPage() {
	(0, import_react.useEffect)(() => {
		document.title = "Page not found — IGRIS Tech";
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "relative overflow-hidden border-b border-hairline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 hex-grid opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "relative py-32 md:py-40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-tech mb-6",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-10 h-24 w-24",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 100 100",
						className: "h-full w-full",
						fill: "none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
								points: "50,6 93,31 93,69 50,94 7,69 7,31",
								stroke: "rgba(243,243,240,0.35)",
								strokeWidth: "1.4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
								points: "50,24 76,39 76,61 50,76 24,61 24,39",
								stroke: "rgba(243,243,240,0.55)",
								strokeWidth: "1.4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "47",
								y: "47",
								width: "6",
								height: "6",
								fill: "rgba(243,243,240,0.8)"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl",
					children: "Looks like this route doesn’t exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-md text-base leading-relaxed text-quiet",
					children: "The path you asked for isn’t part of the IGRIS system. Head home, or start a project."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/",
						variant: "primary",
						children: "Return Home"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/contact",
						variant: "ghost",
						children: "Start a Project"
					})]
				})
			]
		})]
	});
}
var styles_default = "/assets/styles-zJLkm2j7.css";
var Route$23 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: SITE.name },
			{
				name: "theme-color",
				content: "#070708"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/png",
				href: "/brand/igris-mark-on-dark.png"
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&family=Syne:wght@500;600;700;800&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootComponent,
	notFoundComponent: NotFoundPage
});
function ContentHydrator() {
	useContentHydrated();
	return null;
}
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-canvas text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentHydrator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$22 = () => import("./routes-C7bwpfLS.mjs");
var Route$22 = createFileRoute("/")({
	head: () => pageHead({
		title: "IGRIS Tech — Digital Products, Web Development & Software",
		description: "IGRIS Tech builds websites, software, AI solutions, and automation for individuals, brands, and businesses.",
		path: "/"
	}),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./about-w7NzONa5.mjs");
var Route$21 = createFileRoute("/about")({
	head: () => pageHead({
		title: "About IGRIS Tech",
		description: "IGRIS Tech helps people and businesses turn ideas into digital products while building technology of its own.",
		path: "/about"
	}),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./admin-CZykBHSd.mjs");
var Route$20 = createFileRoute("/admin")({
	head: () => pageHead({
		title: "Admin — IGRIS Tech",
		description: "IGRIS Tech internal administration.",
		path: "/admin",
		noIndex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./contact-CmYOH38u.mjs");
var Route$19 = createFileRoute("/contact")({
	head: () => pageHead({
		title: "Start a Project — IGRIS Tech",
		description: "Tell IGRIS Tech what you want to build. We’ll review your project and get back to you.",
		path: "/contact"
	}),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./ecosystem-LKHq4mDk.mjs");
var Route$18 = createFileRoute("/ecosystem")({
	head: () => pageHead({
		title: "The IGRIS Ecosystem — IGRIS Tech",
		description: "Products built by IGRIS Tech, including IGRIS Hosting and IGRIS Studio. IGRIS Tech is the parent technology brand.",
		path: "/ecosystem"
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./privacy-lQgRegOx.mjs");
var Route$17 = createFileRoute("/privacy")({
	head: () => pageHead({
		title: "Privacy Policy — IGRIS Tech",
		description: "How IGRIS Tech handles information submitted through this website.",
		path: "/privacy"
	}),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./review-dUjWHubk.mjs");
var Route$16 = createFileRoute("/review")({
	head: () => pageHead({
		title: "Leave a Review — IGRIS Tech",
		description: "Share a note about working with IGRIS Tech. Reviews are published only after they have been read and approved.",
		path: "/review"
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./terms-R509Gb4v.mjs");
var Route$15 = createFileRoute("/terms")({
	head: () => pageHead({
		title: "Terms — IGRIS Tech",
		description: "Terms of use for the IGRIS Tech public website.",
		path: "/terms"
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./admin-BLiDMI-4.mjs");
var Route$14 = createFileRoute("/admin/")({
	head: () => pageHead({
		title: "Dashboard — IGRIS Admin",
		description: "IGRIS Tech internal administration.",
		path: "/admin",
		noIndex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./ecosystem-D7haMDiY.mjs");
var Route$13 = createFileRoute("/admin/ecosystem")({
	head: () => pageHead({
		title: "Ecosystem — IGRIS Admin",
		description: "Manage IGRIS ecosystem products.",
		path: "/admin/ecosystem",
		noIndex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./inquiries-DzwsWAfD.mjs");
var Route$12 = createFileRoute("/admin/inquiries")({
	head: () => pageHead({
		title: "Inquiries — IGRIS Admin",
		description: "Project briefs captured from the public form.",
		path: "/admin/inquiries",
		noIndex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./projects-CAnMb2fW.mjs");
var Route$11 = createFileRoute("/admin/projects")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./reviews-OKOe3QED.mjs");
var Route$10 = createFileRoute("/admin/reviews")({
	head: () => pageHead({
		title: "Reviews — IGRIS Admin",
		description: "Moderate client reviews.",
		path: "/admin/reviews",
		noIndex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./services-_1tA9Hxb.mjs");
var Route$9 = createFileRoute("/services/")({
	head: () => pageHead({
		title: "Services — Web Development, Software, AI & Automation | IGRIS Tech",
		description: "Web development, software development, AI solutions, and automation from IGRIS Tech. Hire a team to design, build, and launch digital products.",
		path: "/services"
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var service$3 = getService("ai-solutions");
var $$splitComponentImporter$8 = () => import("./ai-solutions-VdFr53T_.mjs");
var Route$8 = createFileRoute("/services/ai-solutions")({
	head: () => pageHead({
		title: service$3.seoTitle,
		description: service$3.seoDescription,
		path: service$3.href
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var service$2 = getService("automation");
var $$splitComponentImporter$7 = () => import("./automation-ByYhdZkm.mjs");
var Route$7 = createFileRoute("/services/automation")({
	head: () => pageHead({
		title: service$2.seoTitle,
		description: service$2.seoDescription,
		path: service$2.href
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var service$1 = getService("software-development");
var $$splitComponentImporter$6 = () => import("./software-development-woe4zCPt.mjs");
var Route$6 = createFileRoute("/services/software-development")({
	head: () => pageHead({
		title: service$1.seoTitle,
		description: service$1.seoDescription,
		path: service$1.href
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var service = getService("web-development");
var $$splitComponentImporter$5 = () => import("./web-development-tDpGwnnx.mjs");
var Route$5 = createFileRoute("/services/web-development")({
	head: () => pageHead({
		title: service.seoTitle,
		description: service.seoDescription,
		path: service.href
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./work-BRkwY6-7.mjs");
var Route$4 = createFileRoute("/work/")({
	head: () => pageHead({
		title: "Selected Work — IGRIS Tech",
		description: "Selected client work from IGRIS Tech. Case studies are published as they are ready to share.",
		path: "/work"
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_slug-5s9NSLTH.mjs");
var Route$3 = createFileRoute("/work/$slug")({
	head: ({ params }) => {
		const project = projectsService.getPublishedBySlug(params.slug);
		return pageHead({
			title: project?.seoTitle ?? "Work — IGRIS Tech",
			description: project?.seoDescription ?? "A case study from IGRIS Tech. Published when the work is ready to share.",
			path: `/work/${params.slug}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./projects-DwpgPPF7.mjs");
var Route$2 = createFileRoute("/admin/projects/")({
	head: () => pageHead({
		title: "Projects — IGRIS Admin",
		description: "Manage Selected Work.",
		path: "/admin/projects",
		noIndex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_id-DROj2gtm.mjs");
var Route$1 = createFileRoute("/admin/projects/$id")({
	head: () => pageHead({
		title: "Edit project — IGRIS Admin",
		description: "Edit a Selected Work case study.",
		path: "/admin/projects",
		noIndex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./new-B9lP31Nr.mjs");
var Route = createFileRoute("/admin/projects/new")({
	head: () => pageHead({
		title: "New project — IGRIS Admin",
		description: "Create a Selected Work case study.",
		path: "/admin/projects/new",
		noIndex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$23
});
var AboutRoute = Route$21.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$23
});
var AdminRoute = Route$20.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$23
});
var ContactRoute = Route$19.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$23
});
var EcosystemRoute = Route$18.update({
	id: "/ecosystem",
	path: "/ecosystem",
	getParentRoute: () => Route$23
});
var PrivacyRoute = Route$17.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$23
});
var ReviewRoute = Route$16.update({
	id: "/review",
	path: "/review",
	getParentRoute: () => Route$23
});
var TermsRoute = Route$15.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$23
});
var AdminIndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminEcosystemRoute = Route$13.update({
	id: "/ecosystem",
	path: "/ecosystem",
	getParentRoute: () => AdminRoute
});
var AdminInquiriesRoute = Route$12.update({
	id: "/inquiries",
	path: "/inquiries",
	getParentRoute: () => AdminRoute
});
var AdminProjectsRoute = Route$11.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => AdminRoute
});
var AdminReviewsRoute = Route$10.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => AdminRoute
});
var ServicesIndexRoute = Route$9.update({
	id: "/services/",
	path: "/services/",
	getParentRoute: () => Route$23
});
var ServicesAiSolutionsRoute = Route$8.update({
	id: "/services/ai-solutions",
	path: "/services/ai-solutions",
	getParentRoute: () => Route$23
});
var ServicesAutomationRoute = Route$7.update({
	id: "/services/automation",
	path: "/services/automation",
	getParentRoute: () => Route$23
});
var ServicesSoftwareDevelopmentRoute = Route$6.update({
	id: "/services/software-development",
	path: "/services/software-development",
	getParentRoute: () => Route$23
});
var ServicesWebDevelopmentRoute = Route$5.update({
	id: "/services/web-development",
	path: "/services/web-development",
	getParentRoute: () => Route$23
});
var WorkIndexRoute = Route$4.update({
	id: "/work/",
	path: "/work/",
	getParentRoute: () => Route$23
});
var WorkSlugRoute = Route$3.update({
	id: "/work/$slug",
	path: "/work/$slug",
	getParentRoute: () => Route$23
});
var AdminProjectsIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminProjectsRoute
});
var AdminProjectsRouteChildren = {
	AdminProjectsIdRoute: Route$1.update({
		id: "/$id",
		path: "/$id",
		getParentRoute: () => AdminProjectsRoute
	}),
	AdminProjectsNewRoute: Route.update({
		id: "/new",
		path: "/new",
		getParentRoute: () => AdminProjectsRoute
	}),
	AdminProjectsIndexRoute
};
var AdminRouteChildren = {
	AdminEcosystemRoute,
	AdminInquiriesRoute,
	AdminProjectsRoute: AdminProjectsRoute._addFileChildren(AdminProjectsRouteChildren),
	AdminReviewsRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	ContactRoute,
	EcosystemRoute,
	PrivacyRoute,
	ReviewRoute,
	TermsRoute,
	ServicesAiSolutionsRoute,
	ServicesAutomationRoute,
	ServicesSoftwareDevelopmentRoute,
	ServicesWebDevelopmentRoute,
	WorkSlugRoute,
	ServicesIndexRoute,
	WorkIndexRoute
};
var routeTree = Route$23._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { usePublishedEcosystem as _, Route$3 as a, emptyEcosystemInput as c, service as d, service$1 as f, useEcosystem as g, useContentHydrated as h, Route$1 as i, getRouter as l, service$3 as m, ECOSYSTEM_STATUSES as n, ecosystemService as o, service$2 as p, NotFoundPage as r, ecosystemToInput as s, BrandLockup as t, router_exports as u };
