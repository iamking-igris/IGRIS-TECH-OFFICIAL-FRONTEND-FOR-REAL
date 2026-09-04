import { u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as cn } from "./router-ZY7VAfYm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fields-BhPnEFGH.js
var import_jsx_runtime = require_jsx_runtime();
var fieldControl = "h-11 w-full border border-hairline bg-canvas px-3 text-sm text-ink placeholder:text-faint transition-colors duration-150 focus:border-ink";
function Field({ label, hint, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			htmlFor,
			className: "text-sm text-ink",
			children: [label, hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-faint",
				children: [" ", hint]
			}) : null]
		}), children]
	});
}
function TextInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(fieldControl, className),
		...props
	});
}
function TextArea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn(fieldControl, "h-32 py-3 leading-relaxed", className),
		...props
	});
}
function SelectInput({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(fieldControl, className),
		...props,
		children
	});
}
function CheckRow({ checked, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex cursor-pointer items-center gap-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked,
			onChange: (e) => onChange(e.target.checked),
			className: "size-4 shrink-0 accent-ink"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
}
function AdminEmpty({ title, body, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-hairline py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold tracking-[-0.03em]",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-md text-sm leading-relaxed text-quiet",
				children: body
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: action
			}) : null
		]
	});
}
function StatusMark({ tone = "quiet", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-block border px-2 py-1 font-mono text-[10px] tracking-widest", tone === "ink" && "border-ink/40 text-ink", tone === "danger" && "border-danger/40 text-danger", tone === "quiet" && "border-hairline text-quiet"),
		children
	});
}
//#endregion
export { StatusMark as a, SelectInput as i, CheckRow as n, TextArea as o, Field as r, TextInput as s, AdminEmpty as t };
