import { i as __toESM } from "../_runtime.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as cn, m as Container } from "./router-ZY7VAfYm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/process-section-DPmsKxDg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Reveal({ children, className, delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setOn(true);
			return;
		}
		const io = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) {
				setOn(true);
				io.disconnect();
			}
		}, {
			threshold: .12,
			rootMargin: "0px 0px -8% 0px"
		});
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("reveal", on && "is-in", className),
		style: delay ? { transitionDelay: `${delay}ms` } : void 0,
		children
	});
}
var processStages = [
	{
		index: "01",
		name: "Discover",
		text: "Understand the idea, the users, the business, and the actual goal."
	},
	{
		index: "02",
		name: "Define",
		text: "Turn requirements into a clear product and technical direction."
	},
	{
		index: "03",
		name: "Design",
		text: "Design the experience and the interface — before the build runs ahead of the thinking."
	},
	{
		index: "04",
		name: "Build",
		text: "Develop the product. Test it. Refine what does not hold up."
	},
	{
		index: "05",
		name: "Ship",
		text: "Launch, watch it in the real world, and support what comes next."
	}
];
function ProcessSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-hairline",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-20 md:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-tech mb-4",
				children: "Process / 04"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "max-w-3xl font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl",
				children: "What happens after you reach out."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-14 grid gap-0 md:grid-cols-5",
				children: processStages.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative border-t border-hairline py-8 md:border-t-0 md:border-l md:px-5 md:py-0 first:md:border-l-0 first:md:pl-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tracking-widest text-faint",
							children: stage.index
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-2xl font-semibold tracking-[-0.03em]",
							children: stage.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-quiet",
							children: stage.text
						})
					]
				}, stage.index))
			})]
		})
	});
}
//#endregion
export { Reveal as n, ProcessSection as t };
