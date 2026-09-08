import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as cn } from "./router-RsAy9zmm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-visual-CawO2wU_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectVisual({ visual, imageUrl, className, interactive = true, caption }) {
	const ref = (0, import_react.useRef)(null);
	const [imgError, setImgError] = (0, import_react.useState)(false);
	const [imgLoaded, setImgLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setImgError(false);
		setImgLoaded(false);
	}, [imageUrl]);
	const onMove = (0, import_react.useCallback)((e) => {
		if (!interactive) return;
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (window.matchMedia("(pointer: coarse)").matches) return;
		const r = el.getBoundingClientRect();
		const x = (e.clientX - r.left) / r.width - .5;
		const y = (e.clientY - r.top) / r.height - .5;
		el.style.setProperty("--px", x.toFixed(3));
		el.style.setProperty("--py", y.toFixed(3));
	}, [interactive]);
	const onLeave = (0, import_react.useCallback)(() => {
		const el = ref.current;
		if (!el) return;
		el.style.setProperty("--px", "0");
		el.style.setProperty("--py", "0");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("project-frame relative isolate overflow-hidden border border-hairline bg-panel", className),
		onPointerMove: onMove,
		onPointerLeave: onLeave,
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "project-stage absolute inset-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 hex-grid opacity-30" }),
				visual === "alpha" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alpha, {}),
				visual === "beta" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Beta, {}),
				visual === "gamma" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gamma, {}),
				imageUrl && !imgError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: imageUrl,
					alt: "",
					className: cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", imgLoaded ? "opacity-100" : "opacity-0"),
					onLoad: () => setImgLoaded(true),
					onError: () => setImgError(true)
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] tracking-widest text-faint",
				children: visual === "alpha" ? "WEB / PREVIEW" : visual === "beta" ? "SYSTEM / PREVIEW" : "PRODUCT / PREVIEW"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] tracking-widest text-faint",
				children: caption ?? "PREPARING"
			})]
		})]
	});
}
function Alpha() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 800 500",
		className: "absolute inset-0 h-full w-full",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "88",
				y: "72",
				width: "624",
				height: "356",
				stroke: "rgba(243,243,240,0.16)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "88",
				y: "72",
				width: "624",
				height: "28",
				fill: "rgba(243,243,240,0.04)",
				stroke: "rgba(243,243,240,0.16)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "108",
				cy: "86",
				r: "4",
				fill: "rgba(243,243,240,0.28)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "124",
				cy: "86",
				r: "4",
				fill: "rgba(243,243,240,0.18)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "140",
				cy: "86",
				r: "4",
				fill: "rgba(243,243,240,0.12)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "112",
				y: "124",
				width: "180",
				height: "280",
				stroke: "rgba(243,243,240,0.14)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "312",
				y: "124",
				width: "376",
				height: "48",
				stroke: "rgba(243,243,240,0.22)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "312",
				y: "188",
				width: "180",
				height: "216",
				stroke: "rgba(243,243,240,0.14)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "508",
				y: "188",
				width: "180",
				height: "100",
				stroke: "rgba(243,243,240,0.18)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "508",
				y: "304",
				width: "180",
				height: "100",
				stroke: "rgba(243,243,240,0.12)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "132",
				y1: "160",
				x2: "272",
				y2: "160",
				stroke: "rgba(243,243,240,0.2)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "132",
				y1: "184",
				x2: "248",
				y2: "184",
				stroke: "rgba(243,243,240,0.12)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "132",
				y1: "208",
				x2: "260",
				y2: "208",
				stroke: "rgba(243,243,240,0.12)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "400,210 430,227 430,262 400,279 370,262 370,227",
				stroke: "rgba(243,243,240,0.45)",
				strokeWidth: "1.2"
			})
		]
	});
}
function Beta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 800 500",
		className: "absolute inset-0 h-full w-full",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "64",
				y: "64",
				width: "672",
				height: "372",
				stroke: "rgba(243,243,240,0.14)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "64",
				y: "64",
				width: "168",
				height: "372",
				stroke: "rgba(243,243,240,0.16)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "256",
				y: "88",
				width: "200",
				height: "72",
				stroke: "rgba(243,243,240,0.22)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "472",
				y: "88",
				width: "200",
				height: "72",
				stroke: "rgba(243,243,240,0.16)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "256",
				y: "176",
				width: "416",
				height: "220",
				stroke: "rgba(243,243,240,0.18)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "256",
				y1: "232",
				x2: "672",
				y2: "232",
				stroke: "rgba(243,243,240,0.12)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "256",
				y1: "288",
				x2: "672",
				y2: "288",
				stroke: "rgba(243,243,240,0.1)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "256",
				y1: "344",
				x2: "672",
				y2: "344",
				stroke: "rgba(243,243,240,0.1)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "88",
				y1: "120",
				x2: "208",
				y2: "120",
				stroke: "rgba(243,243,240,0.28)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "88",
				y1: "152",
				x2: "188",
				y2: "152",
				stroke: "rgba(243,243,240,0.14)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "88",
				y1: "184",
				x2: "200",
				y2: "184",
				stroke: "rgba(243,243,240,0.14)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "88",
				y1: "216",
				x2: "176",
				y2: "216",
				stroke: "rgba(243,243,240,0.1)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "392",
				y: "268",
				width: "12",
				height: "12",
				fill: "rgba(243,243,240,0.7)"
			})
		]
	});
}
function Gamma() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 800 500",
		className: "absolute inset-0 h-full w-full",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "400,70 670,226 670,374 400,530 130,374 130,226",
				stroke: "rgba(243,243,240,0.12)",
				strokeWidth: "1",
				transform: "translate(0 -50)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "400,140 575,241 575,359 400,460 225,359 225,241",
				stroke: "rgba(243,243,240,0.28)",
				strokeWidth: "1.15",
				transform: "translate(0 -50)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "400,210 490,262 490,338 400,390 310,338 310,262",
				stroke: "rgba(243,243,240,0.55)",
				strokeWidth: "1.2",
				transform: "translate(0 -50)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "130",
				y1: "176",
				x2: "310",
				y2: "238",
				stroke: "rgba(243,243,240,0.16)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "670",
				y1: "176",
				x2: "490",
				y2: "238",
				stroke: "rgba(243,243,240,0.16)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "400",
				y1: "90",
				x2: "400",
				y2: "186",
				stroke: "rgba(243,243,240,0.2)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "130",
				cy: "176",
				r: "3",
				fill: "rgba(243,243,240,0.5)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "670",
				cy: "176",
				r: "3",
				fill: "rgba(243,243,240,0.5)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "400",
				cy: "90",
				r: "3",
				fill: "rgba(243,243,240,0.5)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "394",
				y: "244",
				width: "12",
				height: "12",
				fill: "rgba(243,243,240,0.8)"
			})
		]
	});
}
//#endregion
export { ProjectVisual as t };
