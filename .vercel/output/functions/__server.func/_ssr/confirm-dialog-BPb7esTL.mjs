import { a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Button } from "./router-RsAy9zmm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/confirm-dialog-BPb7esTL.js
var import_jsx_runtime = require_jsx_runtime();
function ConfirmDialog({ open, title, body, confirmLabel = "Delete", danger = true, onConfirm, onCancel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		open,
		onOpenChange: (next) => !next && onCancel(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, { className: "fixed inset-0 z-[80] bg-canvas/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
			className: "fixed top-1/2 left-1/2 z-[90] w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 border border-hairline bg-panel p-6 text-ink shadow-none md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
					className: "font-display text-2xl font-semibold tracking-[-0.03em]",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
					className: "mt-3 text-sm leading-relaxed text-quiet",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: danger ? "primary" : "ghost",
							className: danger ? "border-danger bg-danger text-ink hover:bg-danger/90 hover:text-ink" : void 0,
							onClick: onConfirm,
							children: confirmLabel
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: onCancel,
							children: "Cancel"
						})
					})]
				})
			]
		})] })
	});
}
//#endregion
export { ConfirmDialog as t };
