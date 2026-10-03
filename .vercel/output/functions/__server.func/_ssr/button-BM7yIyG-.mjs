import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BM7yIyG-.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-fg border border-border hover:border-border-strong hover:bg-raised",
			quiet: "bg-transparent text-muted hover:text-fg"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-[var(--radius-sm)]",
			md: "h-11 px-4 text-sm rounded-[var(--radius-md)]",
			lg: "h-12 px-5 text-base rounded-[var(--radius-md)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
