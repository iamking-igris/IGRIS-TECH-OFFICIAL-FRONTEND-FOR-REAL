import { u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as cn } from "./router-LJGBwkzE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-chip-DXl3zibr.js
var import_jsx_runtime = require_jsx_runtime();
function StatusChip({ children, invert = false, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-block border px-2 py-1 font-mono text-[10px] tracking-widest", invert ? "border-coal/20 text-coal/70" : "border-hairline text-quiet", className),
		children
	});
}
//#endregion
export { StatusChip as t };
