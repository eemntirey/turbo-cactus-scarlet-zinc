import { t as cn } from "./utils-C_uf36nf.mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-BPksScAj.js
var import_jsx_runtime = require_jsx_runtime();
var fieldClass = "h-11 w-full rounded-[var(--radius-md)] border border-border bg-raised px-3 text-sm text-fg tabular placeholder:text-faint transition-[border-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("block text-xs font-medium uppercase tracking-[0.14em] text-muted", className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(fieldClass, className),
		...props
	});
}
function Select({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(fieldClass, "pr-8", className),
		...props,
		children
	});
}
//#endregion
export { Label as n, Select as r, Input as t };
