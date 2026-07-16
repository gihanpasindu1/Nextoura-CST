import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime, _ as Trigger, a as Overlay2, c as Title2, d as Content, f as Description, g as Title, h as Root, i as Description2, l as Trigger2, m as Portal, n as Cancel, o as Portal2, p as Overlay, r as Content2, s as Root2, t as Action, u as Close } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn, i as buttonVariants, n as Input, o as supabase, r as Label, t as Button } from "./label-ChrkDSnk.mjs";
import { d as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as ChartColumn, C as Copy, D as ChevronUp, E as CircleAlert, F as ArrowLeft, M as Building2, N as Briefcase, O as ChevronDown, P as Bell, S as CreditCard, T as CircleCheck, _ as Mail, a as Trash2, b as Info, c as Settings2, d as Plus, f as Plane, g as MapPin, h as MessageCircle, i as TriangleAlert, j as Calendar, k as Check, l as Send, m as Moon, n as Users, o as Sun, p as Phone, r as UserPlus, s as Settings, t as X, u as Search, v as LoaderCircle, w as Clock, x as FileText, y as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { n as useTheme } from "./theme-CiBQ68xT.mjs";
import { i as Trigger$1, n as List, r as Root2$1, t as Content$1 } from "../_libs/radix-ui__react-tabs.mjs";
import { a as ItemText, c as Root2$2, d as Separator$1, f as Trigger$2, i as ItemIndicator, l as ScrollDownButton, m as Viewport, n as Icon, o as Label$1, p as Value, r as Item, s as Portal$1, t as Content2$1, u as ScrollUpButton } from "../_libs/@radix-ui/react-select+[...].mjs";
import { a as Viewport$1, i as ScrollAreaThumb, n as Root$1, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
import { t as Root$2 } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cii3Q9t8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var Tabs = Root2$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$1, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger$1.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content$1, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content$1.displayName;
var Select = Root2$2;
var SelectValue = Value;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger$2, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = Trigger$2.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = Content2$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = Label$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemText, { children })]
}));
SelectItem.displayName = Item.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = Separator$1.displayName;
var Dialog = Root;
var DialogTrigger = Trigger;
var DialogPortal = Portal;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = Overlay.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = Title.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = Description.displayName;
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root$1, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport$1, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
	]
}));
ScrollArea.displayName = Root$1.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$2, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root$2.displayName;
function flagEmoji(code) {
	return code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}
var Sheet = Root;
var SheetClose = Close;
var SheetPortal = Portal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = Title.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = Description.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var validateTouristData = (data, mode) => {
	const newErrors = {};
	if (!data.name || !data.name.trim() || data.name === "Unknown") newErrors.name = "Name is required";
	if (mode === "confirmed") {
		if (!data.country || data.country === "TBD" || data.country === "Unknown") newErrors.country = "Country is required";
		if (!data.countryCode || data.countryCode === "UN") newErrors.countryCode = "Code is required";
		if (!data.passport || data.passport === "N/A" || !data.passport.trim()) newErrors.passport = "Passport is required";
		if (!data.phone || data.phone === "N/A" || !data.phone.trim()) newErrors.phone = "Phone is required";
		if (!data.email || data.email === "N/A" || !data.email.trim()) newErrors.email = "Email is required";
		if (!data.arrival || data.arrival === "TBD") newErrors.arrival = "Arrival date is required";
		if (!data.departure) newErrors.departure = "Departure date is required";
		if (!data.duration || data.duration === "TBD") newErrors.duration = "Duration is required";
		if (data.agent === "All Agents") newErrors.agent = "Agent is required";
		if (data.pax > 1 && data.group) for (let i = 0; i < data.pax - 1; i++) {
			const member = data.group[i];
			if (!member || !member.name || !member.name.trim() || member.name === "Unknown") newErrors[`group_${i}_name`] = "Name is required";
			if (!member || !member.passport || !member.passport.trim() || member.passport === "N/A") newErrors[`group_${i}_passport`] = "Passport is required";
		}
	}
	return newErrors;
};
function AddTouristSheet({ open, onOpenChange, onAdd, mode = "confirmed", initialData, agents = [], drivers = [], hotels = [] }) {
	const [isGenerating, setIsGenerating] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		country: "",
		countryCode: "",
		passport: "",
		phone: "",
		email: "",
		pax: 1,
		arrival: "",
		departure: "",
		duration: "",
		status: "Upcoming",
		agent: "All Agents",
		driver: "All Drivers",
		group: []
	});
	(0, import_react.useEffect)(() => {
		if (open) if (initialData) {
			const initForm = {
				name: initialData.name || "",
				country: initialData.country || "",
				countryCode: initialData.countryCode || "",
				passport: initialData.passport || "",
				phone: initialData.phone || "",
				email: initialData.email || "",
				pax: initialData.pax || 1,
				arrival: initialData.arrival || "",
				departure: initialData.departure || "",
				duration: initialData.duration || "",
				status: mode === "confirmed" && initialData.isLead ? "Active" : initialData.status || "Upcoming",
				agent: initialData.agent || "All Agents",
				driver: initialData.driver || "All Drivers",
				group: initialData.group || []
			};
			setFormData(initForm);
			setItinerary(initialData.itinerary || []);
			if (mode === "confirmed" && initialData.isLead) setErrors(validateTouristData(initForm, mode));
			else setErrors({});
		} else {
			setFormData({
				name: "",
				country: "",
				countryCode: "",
				passport: "",
				phone: "",
				email: "",
				pax: 1,
				arrival: "",
				duration: "",
				departure: "",
				status: "Upcoming",
				agent: "All Agents",
				driver: "All Drivers",
				group: []
			});
			setItinerary([]);
			setErrors({});
		}
	}, [
		open,
		initialData,
		mode
	]);
	(0, import_react.useEffect)(() => {
		if (formData.arrival && formData.departure) {
			const start = new Date(formData.arrival);
			const end = new Date(formData.departure);
			if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
				const diff = end.getTime() - start.getTime();
				const days = Math.ceil(diff / (1e3 * 3600 * 24)) + 1;
				if (formData.duration !== `${days} Days`) setFormData((prev) => ({
					...prev,
					duration: `${days} Days`
				}));
			}
		}
	}, [formData.arrival, formData.departure]);
	const [itinerary, setItinerary] = (0, import_react.useState)([]);
	const [itineraryText, setItineraryText] = (0, import_react.useState)("");
	const [rawItineraryData, setRawItineraryData] = (0, import_react.useState)(null);
	const handleGenerate = async (type) => {
		if (type === "text" && !itineraryText.trim()) {
			toast.error("Please paste the raw itinerary text first.");
			return;
		}
		setIsGenerating(true);
		try {
			if (type === "text") {
				const response = await fetch("https://cst-tour-management-system.onrender.com/api/itinerary/generate-text", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ raw_text: itineraryText })
				});
				if (!response.ok) throw new Error("Failed to extract itinerary from text.");
				const data = await response.json();
				setRawItineraryData(data);
				setItinerary((data.days || []).map((d) => {
					const matchingHotel = (data.hotels || []).find((h) => d.destination && h.destination && h.destination.toLowerCase() === d.destination.toLowerCase());
					return {
						day: d.day_number,
						title: d.title || `Day ${d.day_number}`,
						hotel: matchingHotel ? matchingHotel.hotel_name : "",
						hotelEmail: "",
						destinations: [{
							location: d.destination || "",
							activities: Array.isArray(d.description) ? d.description.join("\n") : d.description || ""
						}]
					};
				}));
				setFormData((prev) => ({
					...prev,
					name: prev.name || data.guest_name || "",
					duration: prev.duration || data.duration || prev.duration
				}));
				toast.success("Itinerary extracted successfully!");
			} else if (type === "pdf") {
				if (!itineraryText.trim()) {
					toast.error("Please paste the raw itinerary text in the Auto (Text) tab first.");
					setIsGenerating(false);
					return;
				}
				const response = await fetch(rawItineraryData ? "https://cst-tour-management-system.onrender.com/api/itinerary/generate-pdf-from-json" : "https://cst-tour-management-system.onrender.com/api/itinerary/generate-pdf", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(rawItineraryData ? { parsed_data: rawItineraryData } : { raw_text: itineraryText })
				});
				if (!response.ok) throw new Error("Failed to generate PDF.");
				const blob = await response.blob();
				console.log("PDF Blob received. Size:", blob.size, "Type:", blob.type);
				if (blob.size === 0) throw new Error("Received empty PDF file from the server.");
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.style.display = "none";
				a.href = url;
				a.download = `${(formData.name || "Client").replace(/\s+/g, "_")}_Itinerary.pdf`;
				document.body.appendChild(a);
				a.click();
				setTimeout(() => {
					document.body.removeChild(a);
					window.URL.revokeObjectURL(url);
				}, 1e3);
				toast.success("PDF generated successfully!");
			}
		} catch (err) {
			toast.error(err.message || "An error occurred during generation.");
		} finally {
			setIsGenerating(false);
		}
	};
	const handleSave = () => {
		const newErrors = validateTouristData(formData, mode);
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		setErrors({});
		onAdd({
			id: initialData ? initialData.id : "t" + Math.floor(Math.random() * 1e4),
			name: formData.name,
			country: formData.country || "TBD",
			countryCode: formData.countryCode || "UN",
			pax: formData.pax,
			arrival: formData.arrival || "TBD",
			departure: formData.departure || "",
			duration: formData.duration || "TBD",
			status: formData.status,
			agent: formData.agent !== "All Agents" ? formData.agent : "Direct",
			driver: formData.driver !== "All Drivers" ? formData.driver : "TBD",
			passport: formData.passport || "N/A",
			phone: formData.phone || "N/A",
			email: formData.email || "N/A",
			group: formData.group || [],
			currentLocation: initialData ? initialData.currentLocation : "TBD",
			itinerary,
			isLead: mode === "lead"
		});
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "sm:max-w-[600px] w-full p-0 flex flex-col h-full bg-background border-l border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
					className: "px-6 py-4 border-b border-border bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: mode === "lead" ? "Add New Inquiry" : initialData ? "Confirm Tour" : "Add New Client" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: mode === "lead" ? "Create a new lead profile. Only the name is mandatory." : "Create a confirmed client profile. All personal details are required." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
							id: "hotels-list",
							children: hotels.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: h.hotel_name }, h.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "flex-1 p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-semibold flex items-center gap-2 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-4 w-4" }), "Personal Information"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: cn(errors.name && "text-destructive"),
													children: "Full Name *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: cn(errors.name && "border-destructive focus-visible:ring-destructive"),
													value: formData.name,
													onChange: (e) => {
														setFormData({
															...formData,
															name: e.target.value
														});
														if (errors.name) setErrors({
															...errors,
															name: ""
														});
													},
													placeholder: "e.g. John Doe"
												}),
												errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-destructive flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
														" ",
														errors.name
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: cn(errors.country && "text-destructive"),
													children: ["Country ", mode === "confirmed" && "*"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: cn(errors.country && "border-destructive focus-visible:ring-destructive"),
													value: formData.country,
													onChange: (e) => {
														setFormData({
															...formData,
															country: e.target.value
														});
														if (errors.country) setErrors({
															...errors,
															country: ""
														});
													},
													placeholder: "e.g. United Kingdom"
												}),
												errors.country && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-destructive flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
														" ",
														errors.country
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: cn(errors.countryCode && "text-destructive"),
													children: ["Country Code (emoji) ", mode === "confirmed" && "*"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: cn(errors.countryCode && "border-destructive focus-visible:ring-destructive"),
													value: formData.countryCode,
													onChange: (e) => {
														setFormData({
															...formData,
															countryCode: e.target.value
														});
														if (errors.countryCode) setErrors({
															...errors,
															countryCode: ""
														});
													},
													placeholder: "e.g. GB"
												}),
												errors.countryCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-destructive flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
														" ",
														errors.countryCode
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: cn(errors.passport && "text-destructive"),
													children: ["Passport Number ", mode === "confirmed" && "*"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: cn(errors.passport && "border-destructive focus-visible:ring-destructive"),
													value: formData.passport,
													onChange: (e) => {
														setFormData({
															...formData,
															passport: e.target.value
														});
														if (errors.passport) setErrors({
															...errors,
															passport: ""
														});
													},
													placeholder: "e.g. P1234567"
												}),
												errors.passport && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-destructive flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
														" ",
														errors.passport
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: cn(errors.phone && "text-destructive"),
													children: ["Phone ", mode === "confirmed" && "*"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: cn(errors.phone && "border-destructive focus-visible:ring-destructive"),
													value: formData.phone,
													onChange: (e) => {
														setFormData({
															...formData,
															phone: e.target.value
														});
														if (errors.phone) setErrors({
															...errors,
															phone: ""
														});
													},
													placeholder: "+44 7700 900077"
												}),
												errors.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-destructive flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
														" ",
														errors.phone
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: cn(errors.email && "text-destructive"),
													children: ["Email ", mode === "confirmed" && "*"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: cn(errors.email && "border-destructive focus-visible:ring-destructive"),
													value: formData.email,
													onChange: (e) => {
														setFormData({
															...formData,
															email: e.target.value
														});
														if (errors.email) setErrors({
															...errors,
															email: ""
														});
													},
													placeholder: "john@example.com"
												}),
												errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-destructive flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
														" ",
														errors.email
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Pax (Group Size)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												min: "1",
												value: formData.pax,
												onChange: (e) => setFormData({
													...formData,
													pax: parseInt(e.target.value) || 1
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: cn(errors.agent && "text-destructive"),
													children: ["Agent ", mode === "confirmed" && "*"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													value: formData.agent,
													onValueChange: (v) => {
														setFormData({
															...formData,
															agent: v
														});
														if (errors.agent) setErrors({
															...errors,
															agent: ""
														});
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														className: cn(errors.agent && "border-destructive focus:ring-destructive"),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select Agent" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "All Agents",
														children: "Select Agent"
													}), agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: a.agent_name || a.name,
														children: a.agent_name || a.name
													}, a.id))] })]
												}),
												errors.agent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-destructive flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
														" ",
														errors.agent
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Driver / Guide" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: formData.driver,
												onValueChange: (v) => setFormData({
													...formData,
													driver: v
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select Driver" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "All Drivers",
													children: "Select Driver / Guide"
												}), drivers.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: d.name,
													children: d.name
												}, d.id))] })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: cn(errors.arrival && "text-destructive"),
													children: ["Arrival Date ", mode === "confirmed" && "*"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "date",
													className: cn(errors.arrival && "border-destructive focus-visible:ring-destructive"),
													value: formData.arrival,
													onChange: (e) => {
														setFormData({
															...formData,
															arrival: e.target.value
														});
														if (errors.arrival) setErrors({
															...errors,
															arrival: ""
														});
													}
												}),
												errors.arrival && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-destructive flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
														" ",
														errors.arrival
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: cn(errors.departure && "text-destructive"),
													children: ["Departure Date ", mode === "confirmed" && "*"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "date",
													className: cn(errors.departure && "border-destructive focus-visible:ring-destructive"),
													value: formData.departure,
													onChange: (e) => {
														setFormData({
															...formData,
															departure: e.target.value
														});
														if (errors.departure) setErrors({
															...errors,
															departure: ""
														});
													}
												}),
												errors.departure && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-destructive flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
														" ",
														errors.departure
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: cn(errors.duration && "text-destructive"),
													children: ["Duration ", mode === "confirmed" && "*"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: cn(errors.duration && "border-destructive focus-visible:ring-destructive"),
													value: formData.duration,
													onChange: (e) => {
														setFormData({
															...formData,
															duration: e.target.value
														});
														if (errors.duration) setErrors({
															...errors,
															duration: ""
														});
													},
													placeholder: "e.g. 7 Days"
												}),
												errors.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-destructive flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
														" ",
														errors.duration
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: formData.status,
												onValueChange: (v) => setFormData({
													...formData,
													status: v
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select Status" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "Upcoming",
														children: "Upcoming"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "Active",
														children: "Active"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "On Tour",
														children: "On Tour"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "Completed",
														children: "Completed"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "Cancelled",
														children: "Cancelled"
													})
												] })]
											})]
										})
									]
								})]
							}),
							formData.pax > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 pt-4 border-t border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-semibold flex items-center gap-2 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), "Other Group Members"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4",
									children: Array.from({ length: formData.pax - 1 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 p-4 border border-border rounded-md bg-muted/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
											children: ["Member ", i + 1]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
															className: cn("text-xs", errors[`group_${i}_name`] && "text-destructive"),
															children: ["Name ", mode === "confirmed" && "*"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															className: cn("h-8 text-sm", errors[`group_${i}_name`] && "border-destructive focus-visible:ring-destructive"),
															value: formData.group[i]?.name || "",
															onChange: (e) => {
																const newGroup = [...formData.group];
																if (!newGroup[i]) newGroup[i] = {
																	name: "",
																	passport: ""
																};
																newGroup[i].name = e.target.value;
																setFormData({
																	...formData,
																	group: newGroup
																});
																if (errors[`group_${i}_name`]) {
																	const newErrors = { ...errors };
																	delete newErrors[`group_${i}_name`];
																	setErrors(newErrors);
																}
															}
														}),
														errors[`group_${i}_name`] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-[10px] text-destructive flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), " Required"]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
															className: cn("text-xs", errors[`group_${i}_passport`] && "text-destructive"),
															children: ["Passport ", mode === "confirmed" && "*"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															className: cn("h-8 text-sm", errors[`group_${i}_passport`] && "border-destructive focus-visible:ring-destructive"),
															value: formData.group[i]?.passport || "",
															onChange: (e) => {
																const newGroup = [...formData.group];
																if (!newGroup[i]) newGroup[i] = {
																	name: "",
																	passport: ""
																};
																newGroup[i].passport = e.target.value;
																setFormData({
																	...formData,
																	group: newGroup
																});
																if (errors[`group_${i}_passport`]) {
																	const newErrors = { ...errors };
																	delete newErrors[`group_${i}_passport`];
																	setErrors(newErrors);
																}
															}
														}),
														errors[`group_${i}_passport`] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-[10px] text-destructive flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), " Required"]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs",
														children: "Phone"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														className: "h-8 text-sm",
														value: formData.group[i]?.phone || "",
														onChange: (e) => {
															const newGroup = [...formData.group];
															if (!newGroup[i]) newGroup[i] = {
																name: "",
																passport: ""
															};
															newGroup[i].phone = e.target.value;
															setFormData({
																...formData,
																group: newGroup
															});
														}
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs",
														children: "Email"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														className: "h-8 text-sm",
														value: formData.group[i]?.email || "",
														onChange: (e) => {
															const newGroup = [...formData.group];
															if (!newGroup[i]) newGroup[i] = {
																name: "",
																passport: ""
															};
															newGroup[i].email = e.target.value;
															setFormData({
																...formData,
																group: newGroup
															});
														}
													})]
												})
											]
										})]
									}, i))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 pt-4 border-t border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-semibold flex items-center gap-2 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), "Itinerary Builder"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
									defaultValue: "text",
									className: "w-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
											className: "grid w-full grid-cols-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
													value: "manual",
													children: "Manual Entry"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
													value: "text",
													children: "Auto (Text)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
													value: "pdf",
													children: "Auto (PDF)"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
											value: "manual",
											className: "pt-4 space-y-4",
											children: [itinerary.map((day, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "border border-border p-4 rounded-md space-y-3 bg-accent/20 relative",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "icon",
														className: "absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-destructive",
														onClick: () => {
															const updated = [...itinerary];
															updated.splice(i, 1);
															setItinerary(updated);
														},
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
														className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
														children: ["Day ", day.day]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 gap-3",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																	className: "text-xs",
																	children: "Title"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	className: "h-8 text-sm",
																	value: day.title,
																	onChange: (e) => {
																		const updated = [...itinerary];
																		updated[i].title = e.target.value;
																		setItinerary(updated);
																	}
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "grid grid-cols-2 gap-3",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																		className: "text-xs",
																		children: "Hotel"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																		className: "h-8 text-sm",
																		list: "hotels-list",
																		value: day.hotel,
																		onChange: (e) => {
																			const val = e.target.value;
																			const updated = [...itinerary];
																			updated[i].hotel = val;
																			const matched = hotels.find((h) => h.hotel_name === val);
																			if (matched && matched.hotel_email) updated[i].hotelEmail = matched.hotel_email;
																			setItinerary(updated);
																		}
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																		className: "text-xs",
																		children: "Hotel Email"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																		className: "h-8 text-sm",
																		value: day.hotelEmail,
																		onChange: (e) => {
																			const updated = [...itinerary];
																			updated[i].hotelEmail = e.target.value;
																			setItinerary(updated);
																		}
																	})]
																})]
															}),
															day.hotel && day.hotelEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "pt-1",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
																	asChild: true,
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																		variant: "outline",
																		size: "sm",
																		className: "h-7 text-[10px] gap-1.5 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 w-full sm:w-auto",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3 w-3" }), "Send Booking Request"]
																	})
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Auto-Generated Booking Request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: ["Draft a new booking email to ", day.hotel] })] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "space-y-4 py-2",
																		children: [
																			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "grid gap-2",
																				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "From" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																					disabled: true,
																					defaultValue: "info@ceylonsignaturetravels.com"
																				})]
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "grid gap-2",
																				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "To" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																					disabled: true,
																					value: day.hotelEmail || "No email provided"
																				})]
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "grid gap-2",
																				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																					htmlFor: `subject-${i}`,
																					children: "Subject"
																				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																					id: `subject-${i}`,
																					defaultValue: `New Booking Request - ${formData.name || "Client"} (Pax: ${formData.pax})`
																				})]
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "grid gap-2",
																				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																					htmlFor: `message-${i}`,
																					children: "Message"
																				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																					id: `message-${i}`,
																					className: "flex min-h-[160px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
																					defaultValue: `Dear Reservation Team at ${day.hotel},\n\nWe would like to request a new booking for our client, ${formData.name || "Client Name"} (Group Size: ${formData.pax}), arriving for Day ${day.day} of their tour.\n\nPlease check your availability for these dates and provide us with a quotation.\n\nWe look forward to hearing from you soon.\n\nBest regards,\nCeylon Signature Travels`
																				})]
																			})
																		]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																		type: "submit",
																		children: "Send Booking Request"
																	}) })
																] })] })
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-3 pt-2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																className: "text-xs text-muted-foreground uppercase tracking-wider",
																children: "Destinations & Activities"
															}),
															(day.destinations || []).map((dest, destIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "border border-border rounded-lg bg-background relative",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																		variant: "ghost",
																		size: "icon",
																		className: "absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full bg-background border border-border text-muted-foreground hover:text-destructive hover:border-destructive z-10",
																		onClick: () => {
																			const updated = [...itinerary];
																			updated[i].destinations.splice(destIndex, 1);
																			setItinerary(updated);
																		},
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "px-3 pt-3 pb-2 border-b border-border",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																			className: "h-8 text-sm font-semibold border-0 p-0 focus-visible:ring-0 bg-transparent",
																			placeholder: "Location name (e.g. Sigiriya Rock)",
																			value: dest.location,
																			onChange: (e) => {
																				const updated = [...itinerary];
																				updated[i].destinations[destIndex].location = e.target.value;
																				setItinerary(updated);
																			}
																		})
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "px-3 pt-2 pb-1 space-y-1.5",
																		children: [(Array.isArray(dest.activities) ? dest.activities : dest.activities ? [dest.activities] : []).map((act, actIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "flex items-center gap-1.5",
																			children: [
																				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: "text-muted-foreground text-xs mt-0.5",
																					children: "â€¢"
																				}),
																				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																					className: "h-7 text-xs flex-1 bg-muted/30",
																					placeholder: "Activity description...",
																					value: act,
																					onChange: (e) => {
																						const updated = [...itinerary];
																						const acts = Array.isArray(updated[i].destinations[destIndex].activities) ? [...updated[i].destinations[destIndex].activities] : updated[i].destinations[destIndex].activities ? [updated[i].destinations[destIndex].activities] : [];
																						acts[actIdx] = e.target.value;
																						updated[i].destinations[destIndex].activities = acts;
																						setItinerary(updated);
																					}
																				}),
																				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																					variant: "ghost",
																					size: "icon",
																					className: "h-5 w-5 shrink-0 text-muted-foreground hover:text-destructive",
																					onClick: () => {
																						const updated = [...itinerary];
																						const acts = Array.isArray(updated[i].destinations[destIndex].activities) ? [...updated[i].destinations[destIndex].activities] : [];
																						acts.splice(actIdx, 1);
																						updated[i].destinations[destIndex].activities = acts;
																						setItinerary(updated);
																					},
																					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
																				})
																			]
																		}, actIdx)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																			variant: "ghost",
																			size: "sm",
																			className: "h-6 text-xs gap-1 text-muted-foreground hover:text-foreground px-1 mt-1",
																			onClick: () => {
																				const updated = [...itinerary];
																				const acts = Array.isArray(updated[i].destinations[destIndex].activities) ? [...updated[i].destinations[destIndex].activities] : updated[i].destinations[destIndex].activities ? [updated[i].destinations[destIndex].activities] : [];
																				acts.push("");
																				updated[i].destinations[destIndex].activities = acts;
																				setItinerary(updated);
																			},
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Add Activity"]
																		})]
																	})
																]
															}, `dest-${destIndex}`)),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																variant: "ghost",
																size: "sm",
																className: "h-7 text-xs gap-1.5",
																onClick: () => {
																	const updated = [...itinerary];
																	if (!updated[i].destinations) updated[i].destinations = [];
																	updated[i].destinations.push({
																		location: "",
																		activities: []
																	});
																	setItinerary(updated);
																},
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Add Location"]
															})
														]
													})
												]
											}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												className: "w-full gap-2 border-dashed",
												onClick: () => setItinerary([...itinerary, {
													day: itinerary.length + 1,
													title: "",
													hotel: "",
													hotelEmail: "",
													destinations: [{
														location: "",
														activities: ""
													}]
												}]),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Day"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
											value: "text",
											className: "pt-4 space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-sm text-muted-foreground",
													children: "Paste rough itinerary notes or chat logs below. AI will extract the days, hotels, and locations."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													placeholder: "E.g. They arrive on the 24th and stay at Galle Face Hotel. Next day they go to Dambulla and stay at Kandalama...",
													className: "min-h-[150px]",
													value: itineraryText,
													onChange: (e) => setItineraryText(e.target.value)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														className: "w-full",
														onClick: () => handleGenerate("text"),
														disabled: isGenerating || !itineraryText.trim(),
														children: isGenerating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Extracting Itinerary..."] }) : "Generate Itinerary (Text)"
													}), rawItineraryData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														className: "w-full",
														variant: "secondary",
														onClick: () => handleGenerate("pdf"),
														disabled: isGenerating,
														children: isGenerating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Generating PDF..."] }) : "Download PDF"
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
											value: "pdf",
											className: "pt-4 space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-sm text-muted-foreground",
													children: "Generate a beautifully formatted PDF itinerary with AI-selected images based on your raw text."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													placeholder: "E.g. They arrive on the 24th and stay at Galle Face Hotel. Next day they go to Dambulla and stay at Kandalama...",
													className: "min-h-[150px]",
													value: itineraryText,
													onChange: (e) => setItineraryText(e.target.value)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													className: "w-full",
													onClick: () => handleGenerate("pdf"),
													disabled: isGenerating || !itineraryText.trim(),
													children: isGenerating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Generating PDF..."] }) : "Generate & Download PDF"
												})
											]
										})
									]
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetFooter, {
					className: "px-6 py-4 border-t border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							children: "Cancel"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleSave,
						children: "Save Client"
					})]
				})
			]
		})
	});
}
var NAV = [
	{
		key: "dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		key: "tours",
		label: "Active Tours",
		icon: Plane
	},
	{
		key: "leads",
		label: "Inquiries",
		icon: Users
	},
	{
		key: "agents",
		label: "Agent Management",
		icon: Briefcase
	},
	{
		key: "drivers",
		label: "Drivers & Guides",
		icon: Users
	},
	{
		key: "reports",
		label: "Reports",
		icon: ChartColumn
	},
	{
		key: "settings",
		label: "Settings",
		icon: Settings
	}
];
function Console() {
	const [nav, setNav] = (0, import_react.useState)("tours");
	const [agentFilter, setAgentFilter] = (0, import_react.useState)("all");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [driverFilter, setDriverFilter] = (0, import_react.useState)("All Drivers");
	const [query, setQuery] = (0, import_react.useState)("");
	const [selectedId, setSelectedId] = (0, import_react.useState)("t1");
	const [isDetailOpen, setIsDetailOpen] = (0, import_react.useState)(false);
	const [isAddClientOpen, setIsAddClientOpen] = (0, import_react.useState)(false);
	const [addClientMode, setAddClientMode] = (0, import_react.useState)("confirmed");
	const [editingTourist, setEditingTourist] = (0, import_react.useState)(void 0);
	const { theme, toggle } = useTheme();
	const [touristsList, setTouristsList] = (0, import_react.useState)([]);
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [agents, setAgents] = (0, import_react.useState)([]);
	const [drivers, setDrivers] = (0, import_react.useState)([]);
	const [hotels, setHotels] = (0, import_react.useState)([]);
	const [session, setSession] = (0, import_react.useState)(null);
	const [companyId, setCompanyId] = (0, import_react.useState)(null);
	const [isLoadingAuth, setIsLoadingAuth] = (0, import_react.useState)(true);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const checkOnboarding = async (userSession) => {
			try {
				const res = await fetch(`https://cst-tour-management-system.onrender.com/api/companies/me?user_id=${userSession.user.id}`);
				if (res.status === 404) router.navigate({ to: "/onboarding" });
				else if (res.ok) {
					const data = await res.json();
					setCompanyId(data.id);
					loadData(data.id);
				} else console.error("Failed to fetch company profile");
			} catch (err) {
				console.error(err);
			}
		};
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			if (!session) {
				setIsLoadingAuth(false);
				router.navigate({ to: "/login" });
			} else checkOnboarding(session).finally(() => setIsLoadingAuth(false));
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			if (!session) router.navigate({ to: "/login" });
			else checkOnboarding(session);
		});
		return () => subscription.unsubscribe();
	}, [router]);
	const loadData = async (compId) => {
		if (!compId) return;
		try {
			const [touristsRes, agentsRes, driversRes, notifsRes, hotelsRes] = await Promise.all([
				fetch(`https://cst-tour-management-system.onrender.com/api/tourists?company_id=${compId}`),
				fetch(`https://cst-tour-management-system.onrender.com/api/agents?company_id=${compId}`),
				fetch(`https://cst-tour-management-system.onrender.com/api/drivers?company_id=${compId}`),
				fetch(`https://cst-tour-management-system.onrender.com/api/notifications?company_id=${compId}`),
				fetch(`https://cst-tour-management-system.onrender.com/api/hotels?company_id=${compId}`)
			]);
			const touristsData = await touristsRes.json();
			const agentsData = await agentsRes.json();
			const driversData = await driversRes.json();
			const notifsData = await notifsRes.json();
			const hotelsData = await hotelsRes.json();
			setAgents(agentsData);
			setDrivers(driversData);
			setHotels(hotelsData);
			const agentMap = {};
			agentsData.forEach((a) => agentMap[a.id] = a.agent_name || a.name);
			const driverMap = {};
			driversData.forEach((d) => driverMap[d.id] = d.name);
			setTouristsList(touristsData.map((t) => {
				const sortedItinerary = (t.itineraries || []).sort((a, b) => {
					if (a.day_number !== b.day_number) return a.day_number - b.day_number;
					return (a.stop_order || 0) - (b.stop_order || 0);
				});
				let loc = "Not Started";
				for (const i of sortedItinerary) {
					if (i.driver_status === "Completed") loc = i.location_name || i.day_title || "TBD";
					if (i.destinations && i.destinations.length > 0) {
						const sortedDests = [...i.destinations].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
						for (const d of sortedDests) if (d.driver_status === "Completed") loc = d.location_name;
					}
					if (i.hotel_driver_status === "Completed" && i.hotel?.hotel_name) loc = i.hotel.hotel_name;
				}
				return {
					id: t.id,
					name: t.name,
					country: t.country,
					countryCode: t.country_code,
					passport: t.passport_number,
					phone: t.phone || "",
					email: t.email,
					pax: t.pax_count,
					arrival: t.arrival_date,
					departure: t.departure_date || "",
					duration: t.duration,
					status: t.status,
					currentLocation: loc,
					agent: agentMap[t.agent_id] || "All Agents",
					driver: driverMap[t.driver_id] || "All Drivers",
					group: t.group_members?.map((g) => ({
						name: g.name,
						passport: g.passport_number,
						email: g.email
					})) || [],
					itinerary: sortedItinerary.map((i) => ({
						day: i.day_number,
						title: i.day_title,
						hotel: i.hotel?.hotel_name || "",
						hotelEmail: i.hotel?.hotel_email || "",
						status: i.driver_status || "Pending",
						destinations: i.destinations?.map((d) => ({
							location: d.location_name,
							activities: d.activities,
							status: d.driver_status || "Pending"
						})) || []
					})),
					isLead: t.is_lead
				};
			}));
			setNotifications(notifsData.map((n) => ({
				id: n.id,
				touristId: n.tourist_id,
				type: n.notification_type,
				title: n.alert_title,
				body: n.alert_message,
				time: n.created_at,
				resolved: n.is_resolved
			})));
		} catch (e) {
			console.error("Failed to load backend data", e);
		}
	};
	(0, import_react.useEffect)(() => {
		if (!companyId) return;
		const channel1 = supabase.channel("itineraries_updates").on("postgres_changes", {
			event: "UPDATE",
			schema: "public",
			table: "tour_itineraries"
		}, (payload) => {
			console.log("Itinerary updated in realtime! Refreshing data...", payload);
			loadData(companyId);
		}).subscribe();
		const channel2 = supabase.channel("destinations_updates").on("postgres_changes", {
			event: "UPDATE",
			schema: "public",
			table: "itinerary_destinations"
		}, (payload) => {
			console.log("Destination updated in realtime! Refreshing data...", payload);
			loadData(companyId);
		}).subscribe();
		return () => {
			supabase.removeChannel(channel1);
			supabase.removeChannel(channel2);
		};
	}, [companyId]);
	const alertCounts = (0, import_react.useMemo)(() => {
		const counts = {};
		for (const n of notifications) if (!n.resolved && n.touristId && n.touristId !== "all" && (n.type === "alert" || n.type === "warn")) counts[n.touristId] = (counts[n.touristId] || 0) + 1;
		return counts;
	}, [notifications]);
	const filtered = (0, import_react.useMemo)(() => {
		const results = touristsList.filter((t) => {
			if (nav === "leads") {
				if (!t.isLead) return false;
			} else if (nav === "tours") {
				if (t.isLead) return false;
			}
			if (agentFilter !== "all") {
				const agent = agents.find((a) => a.id === agentFilter);
				if (agent && t.agent !== (agent.agent_name || agent.name)) return false;
			}
			if (statusFilter !== "all" && t.status !== statusFilter) return false;
			if (driverFilter !== "All Drivers" && t.driver !== driverFilter) return false;
			if (query.trim()) {
				const q = query.toLowerCase();
				if (!t.name.toLowerCase().includes(q) && !t.country.toLowerCase().includes(q) && !t.passport.toLowerCase().includes(q)) return false;
			}
			return true;
		});
		results.sort((a, b) => {
			const aCount = alertCounts[a.id] || 0;
			return (alertCounts[b.id] || 0) - aCount;
		});
		return results;
	}, [
		agentFilter,
		statusFilter,
		driverFilter,
		query,
		alertCounts,
		nav,
		touristsList
	]);
	const selected = touristsList.find((t) => t.id === selectedId) ?? filtered[0] ?? touristsList[0];
	const stats = (0, import_react.useMemo)(() => {
		return {
			active: touristsList.filter((t) => t.status === "Active").length,
			upcoming: touristsList.filter((t) => t.status === "Upcoming").length,
			pax: touristsList.filter((t) => t.status !== "Completed").reduce((s, t) => s + t.pax, 0),
			countries: new Set(touristsList.map((t) => t.country)).size
		};
	}, [touristsList]);
	if (isLoadingAuth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-screen w-full items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen w-full overflow-hidden bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex w-64 shrink-0 flex-col border-r border-border bg-sidebar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-5 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold tracking-tight",
							children: "Horizon Travel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted-foreground",
							children: "Operations Console"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
						children: "Agent View"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: agentFilter,
						onValueChange: setAgentFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-9 w-full bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: a.id,
							children: a.agent_name || a.name
						}, a.id)) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 px-3 py-3",
					children: NAV.map((item) => {
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setNav(item.key),
							className: cn("mb-0.5 flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors", nav === item.key ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: item.label
							})]
						}, item.key);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border p-3 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-md p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground",
							children: session?.user?.email?.substring(0, 2).toUpperCase() || "CP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-sm font-medium",
								children: session?.user?.email || "Company Profile"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-xs text-muted-foreground",
								children: "Authorized Access"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "w-full justify-start text-sm font-medium h-9 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "mr-2 h-4 w-4" }), "Sign Out"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Are you sure you want to sign out?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This will end your current session. You will need to enter your email and password again to access the Operations Console." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						className: "bg-red-600 hover:bg-red-700 text-white",
						onClick: async () => {
							await supabase.auth.signOut();
							toast.success("Signed out successfully");
						},
						children: "Sign Out"
					})] })] })] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-base font-semibold tracking-tight",
							children: nav === "agents" ? "Agent Management" : nav === "leads" ? "Inquiries & Leads" : nav === "dashboard" ? "Dashboard" : nav === "reports" ? "Reports" : nav === "settings" ? "Settings" : "Active Tours"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: nav === "agents" ? "Manage your operations team" : nav === "leads" ? "Unconfirmed inquiries and requested itineraries" : "Live overview of tourists currently on tour"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Toggle theme",
								onClick: toggle,
								className: "h-9 w-9",
								children: theme === "light" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-9 w-9 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" })]
							})]
						})]
					}), nav === "agents" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentManagement, {
						agents,
						onAddAgent: async (form) => {
							try {
								const res = await fetch("https://cst-tour-management-system.onrender.com/api/agents", {
									method: "POST",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({
										agent_name: form.name,
										email: form.email,
										region: form.region,
										company_id: companyId
									})
								});
								if (res.ok) {
									const newAgent = await res.json();
									setAgents((prev) => [...prev, newAgent]);
								}
							} catch (e) {
								console.error(e);
							}
						},
						onEditAgent: async (agent, form) => {
							try {
								const res = await fetch(`https://cst-tour-management-system.onrender.com/api/agents/${agent.id}`, {
									method: "PUT",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({
										agent_name: form.name,
										email: form.email,
										region: form.region,
										company_id: companyId
									})
								});
								if (res.ok) {
									const updated = await res.json();
									setAgents((prev) => prev.map((a) => a.id === updated.id ? updated : a));
								}
							} catch (e) {
								console.error(e);
							}
						},
						onDeleteAgent: async (agentId) => {
							try {
								if ((await fetch(`https://cst-tour-management-system.onrender.com/api/agents/${agentId}`, { method: "DELETE" })).ok) setAgents((prev) => prev.filter((a) => a.id !== agentId));
							} catch (e) {
								console.error(e);
							}
						}
					}) : nav === "drivers" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriverManagement, {
						drivers,
						onAddDriver: async (form) => {
							const res = await fetch("https://cst-tour-management-system.onrender.com/api/drivers", {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({
									name: form.name,
									phone: form.phone,
									email: form.email,
									password: form.password,
									company_id: companyId
								})
							});
							if (res.ok) {
								const newDriver = await res.json();
								setDrivers((prev) => [...prev, newDriver]);
								toast.success("Driver added!");
							} else {
								const err = await res.json().catch(() => ({}));
								throw new Error(err.detail || "Server error");
							}
						},
						onUpdateDriver: async (driverId, form) => {
							try {
								const res = await fetch(`https://cst-tour-management-system.onrender.com/api/drivers/${driverId}`, {
									method: "PUT",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({
										name: form.name,
										phone: form.phone,
										email: form.email,
										password: form.password,
										company_id: companyId
									})
								});
								if (res.ok) {
									const updated = await res.json();
									setDrivers((prev) => prev.map((d) => d.id === updated.id ? updated : d));
								}
							} catch (e) {
								console.error(e);
							}
						},
						onDeleteDriver: async (driverId) => {
							try {
								if ((await fetch(`https://cst-tour-management-system.onrender.com/api/drivers/${driverId}`, { method: "DELETE" })).ok) setDrivers((prev) => prev.filter((d) => d.id !== driverId));
							} catch (e) {
								console.error(e);
							}
						}
					}) : nav === "dashboard" || nav === "reports" || nav === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardOverview, {
						stats,
						navLabel: nav
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToursWorkspace, {
						drivers,
						query,
						setQuery,
						statusFilter,
						setStatusFilter,
						driverFilter,
						setDriverFilter,
						tourists: filtered,
						selected,
						onSelect: setSelectedId,
						isDetailOpen,
						setIsDetailOpen,
						alertCounts,
						notifications,
						onResolveAlert: async (id) => {
							try {
								await fetch(`https://cst-tour-management-system.onrender.com/api/notifications/${id}/resolve`, { method: "PATCH" });
								if (companyId) loadData(companyId);
							} catch (e) {
								toast.error("Failed to resolve notification");
							}
						},
						onAddClient: () => {
							setAddClientMode(nav === "leads" ? "lead" : "confirmed");
							setEditingTourist(void 0);
							setIsAddClientOpen(true);
						},
						onConfirmTour: (t) => {
							setAddClientMode("confirmed");
							setEditingTourist(t);
							setIsAddClientOpen(true);
						},
						onDeleteClient: async (id) => {
							console.log("DELETE called with id:", id);
							try {
								const res = await fetch(`https://cst-tour-management-system.onrender.com/api/tourists/${id}`, { method: "DELETE" });
								console.log("DELETE response status:", res.status);
								if (res.ok) {
									setTouristsList((prev) => prev.filter((t) => t.id !== id));
									setIsDetailOpen(false);
								} else {
									const text = await res.text();
									console.error("DELETE failed:", text);
								}
							} catch (e) {
								console.error("Failed to delete client", e);
							}
						}
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddTouristSheet, {
					open: isAddClientOpen,
					onOpenChange: setIsAddClientOpen,
					mode: addClientMode,
					initialData: editingTourist,
					agents,
					drivers,
					hotels,
					onAdd: async (newTourist) => {
						if (editingTourist) setTouristsList(touristsList.map((t) => t.id === newTourist.id ? newTourist : t));
						else setTouristsList([newTourist, ...touristsList]);
						setSelectedId(newTourist.id);
						setIsDetailOpen(true);
						try {
							const matchedAgent = agents.find((a) => (a.agent_name || a.name) === newTourist.agent);
							const matchedDriver = drivers.find((d) => d.name === newTourist.driver);
							let arrivalStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
							if (newTourist.arrival && newTourist.arrival !== "TBD") {
								const parsed = new Date(newTourist.arrival);
								if (!isNaN(parsed.getTime())) arrivalStr = parsed.toISOString().split("T")[0];
							}
							const payload = {
								name: newTourist.name || "Unknown",
								passport_number: newTourist.passport || "N/A",
								phone: newTourist.phone || "N/A",
								email: newTourist.email || "N/A",
								pax_count: newTourist.pax || 1,
								country: newTourist.country || "Unknown",
								country_code: newTourist.countryCode || "UN",
								arrival_date: arrivalStr,
								departure_date: newTourist.departure && newTourist.departure !== "" ? newTourist.departure : null,
								duration: newTourist.duration || "1 Day",
								status: newTourist.status || "Upcoming",
								is_lead: newTourist.isLead || false,
								company_id: companyId,
								agent_id: matchedAgent ? matchedAgent.id : null,
								driver_id: matchedDriver ? matchedDriver.id : null,
								group_members: (newTourist.group || []).map((g) => ({
									name: g.name || "Unknown",
									passport_number: g.passport || "N/A",
									email: g.email || "N/A"
								})),
								itineraries: (newTourist.itinerary || []).map((it) => ({
									day_number: it.day || 1,
									day_title: it.title || `Day ${it.day || 1}`,
									stop_order: 1,
									location_name: it.destinations?.[0]?.location || it.title || "Unknown",
									is_hotel_stay: !!it.hotel,
									hotel_name: it.hotel || null,
									hotel_email: it.hotelEmail || null,
									destinations: (it.destinations || []).map((d) => ({
										location_name: d.location || "Unknown",
										activities: Array.isArray(d.activities) ? d.activities.filter(Boolean).join("\n") : d.activities || ""
									}))
								}))
							};
							const url = editingTourist ? `https://cst-tour-management-system.onrender.com/api/tourists/${editingTourist.id}` : "https://cst-tour-management-system.onrender.com/api/tourists";
							await fetch(url, {
								method: editingTourist ? "PUT" : "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify(payload)
							});
						} catch (e) {
							console.error("Failed to save to db", e);
						}
					}
				}),
				!isDetailOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden w-80 shrink-0 flex-col border-l border-border bg-sidebar xl:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold",
								children: "Today"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Monday, 22 June 2026"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: "Active",
									value: stats.active,
									tone: "success"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: "Upcoming",
									value: stats.upcoming,
									tone: "info"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: "Pax on tour",
									value: stats.pax,
									tone: "default"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: "Countries",
									value: stats.countries,
									tone: "default"
								})
							]
						})
					]
				})
			]
		})]
	});
}
function StatTile({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-card p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-0.5 flex items-baseline gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xl font-semibold tracking-tight",
				children: value
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 w-1.5 rounded-full", tone === "success" && "bg-success", tone === "info" && "bg-primary", tone === "default" && "bg-muted-foreground/40") })]
		})]
	});
}
function NotificationItem({ n, onResolve }) {
	const Icon = n.type === "alert" ? TriangleAlert : n.type === "warn" ? Info : CircleCheck;
	const color = n.type === "alert" ? "text-destructive" : n.type === "warn" ? "text-warning" : "text-success";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-md border border-border p-3 transition-colors hover:bg-accent/40", n.resolved ? "bg-muted/30" : "bg-card"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("mt-0.5 h-4 w-4 shrink-0", color) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium leading-tight",
						children: n.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 line-clamp-2 text-[11px] text-muted-foreground",
						children: n.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-muted-foreground/70",
								children: n.time
							}),
							!n.resolved && onResolve && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => onResolve(n.id),
								className: "h-7 text-xs px-3",
								children: "Mark as Resolved"
							}),
							n.resolved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "text-[10px] font-normal text-muted-foreground bg-muted/50 border-border",
								children: "Resolved"
							})
						]
					})
				]
			})]
		})
	});
}
function ToursWorkspace({ drivers, query, setQuery, statusFilter, setStatusFilter, driverFilter, setDriverFilter, tourists, selected, onSelect, isDetailOpen, setIsDetailOpen, alertCounts, notifications, onResolveAlert, onAddClient, onConfirmTour, onDeleteClient }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: isDetailOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 bg-background overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouristDetail, {
				t: selected,
				onBack: () => setIsDetailOpen(false),
				notifications,
				onResolveAlert,
				onConfirmTour: () => onConfirmTour(selected),
				onEditClient: () => onConfirmTour(selected),
				onDeleteClient: () => onDeleteClient(selected.id)
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 border-b border-border bg-card px-6 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search by name, country, or passport numberâ€¦",
						className: "h-9 pl-9"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: statusFilter,
					onValueChange: (v) => setStatusFilter(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-9 w-[160px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All Statuses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Active",
							children: "Active"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Upcoming",
							children: "Upcoming"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Completed",
							children: "Completed"
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: driverFilter,
					onValueChange: setDriverFilter,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-9 w-[180px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Driver" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: drivers.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: d.name,
						children: d.name
					}, d.id)) })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border bg-card px-5 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 text-xs font-medium text-muted-foreground",
						children: [
							tourists.length,
							" ",
							tourists.length === 1 ? "tourist" : "tourists"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted-foreground",
							children: "Sorted by arrival"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: onAddClient,
							className: "gap-2 h-7 px-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-3.5 w-3.5" }), "Add Client"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [tourists.map((t) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							onClick: () => {
								onSelect(t.id);
								setIsDetailOpen(true);
							},
							className: cn("group cursor-pointer border-b px-6 py-4 transition-all duration-500 relative", (alertCounts[t.id] || 0) > 0 ? "animate-[alert-glow_3s_ease-in-out_infinite] z-10 hover:brightness-110" : "border-border hover:bg-accent/30"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl leading-none",
										children: flagEmoji(t.countryCode)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate text-base font-semibold",
												children: t.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: t.status })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 truncate text-sm text-muted-foreground",
											children: [
												t.country,
												" Â· ",
												t.pax,
												" Pax Â· ",
												t.duration
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "shrink-0 text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1.5 text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-muted-foreground" }), t.currentLocation]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-xs text-muted-foreground",
										children: ["Driver: ", t.driver.split(" ")[0]]
									})]
								})]
							})
						}, t.id);
					}), tourists.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "p-10 text-center text-sm text-muted-foreground",
						children: "No tourists match these filters."
					})] })
				})]
			})
		})] })
	});
}
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-4 items-center rounded-full border px-1.5 text-[10px] font-medium", {
			Active: "bg-success/15 text-success border-success/30",
			Upcoming: "bg-primary/10 text-primary border-primary/25",
			Completed: "bg-muted text-muted-foreground border-border"
		}[status]),
		children: status
	});
}
function TouristDetail({ t, onBack, notifications, onResolveAlert, onConfirmTour, onEditClient, onDeleteClient }) {
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	const personAlerts = notifications.filter((n) => n.touristId === t.id || n.touristId === "all");
	const activeAlerts = personAlerts.filter((n) => !n.resolved);
	const activeComplains = activeAlerts.filter((n) => n.type === "alert");
	const activeGuideNotices = activeAlerts.filter((n) => n.type !== "alert");
	const resolvedAlerts = personAlerts.filter((n) => n.resolved);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-in fade-in slide-in-from-right-2 duration-200",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border bg-card px-7 py-5",
					children: [onBack && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: onBack,
							className: "gap-2 -ml-2 text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Back to list"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-12 w-12 shrink-0 place-items-center rounded-md bg-accent text-xl",
								children: flagEmoji(t.countryCode)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "truncate text-lg font-semibold tracking-tight",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: t.status })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center gap-3 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), t.currentLocation]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }), t.duration]
									})]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden shrink-0 gap-2 sm:flex",
							children: [
								t.isLead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "default",
									size: "sm",
									onClick: onConfirmTour,
									className: "gap-2 bg-green-600 hover:bg-green-700 text-white",
									children: "Confirm Tour"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: onEditClient,
									className: "gap-2 border-primary text-primary hover:bg-primary/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-4 w-4" }), "Edit Profile"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 text-green-600" }), "WhatsApp"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), "Email"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									children: "Open Booking"
								})
							]
						})]
					})]
				}),
				activeAlerts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-6 px-7 pt-5",
					children: [activeComplains.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-2 border-b border-border mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold text-destructive flex items-center gap-2 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }), "Client Complain"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "destructive",
							className: "h-5 px-1.5 text-[10px] mb-2",
							children: activeComplains.length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: activeComplains.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationItem, {
							n,
							onResolve: onResolveAlert
						}, n.id))
					})] }), activeGuideNotices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-2 border-b border-border mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold text-orange-500 flex items-center gap-2 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), "Guide Notice"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20 h-5 px-1.5 text-[10px] mb-2",
							children: activeGuideNotices.length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: activeGuideNotices.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationItem, {
							n,
							onResolve: onResolveAlert
						}, n.id))
					})] })]
				}),
				resolvedAlerts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-7 pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-2 border-b border-border mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold text-muted-foreground flex items-center gap-2 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), "Alert History"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "h-5 px-1.5 text-[10px] mb-2 font-normal",
							children: resolvedAlerts.length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 opacity-70",
						children: resolvedAlerts.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationItem, { n }, n.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "contact",
					className: "px-7 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "contact",
								children: "Contact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "group",
								children: [
									"Group (",
									t.group.length + 1,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "itinerary",
								children: "Itinerary"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "contact",
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoField, {
										icon: Users,
										label: "Full Name",
										value: t.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoField, {
										icon: CreditCard,
										label: "Passport Number",
										value: t.passport
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoField, {
										icon: Phone,
										label: "Phone",
										value: t.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoField, {
										icon: Mail,
										label: "Email",
										value: t.email
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "group",
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-md border border-border bg-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-sm text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-4 py-2 font-medium",
												children: "Traveler"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-4 py-2 font-medium",
												children: "Passport No."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-4 py-2 font-medium hidden sm:table-cell",
												children: "Phone"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-4 py-2 font-medium hidden md:table-cell",
												children: "Email"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-4 py-2 font-medium",
												children: "Role"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-t border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 font-medium",
												children: t.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 font-mono text-xs",
												children: t.passport
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 text-xs hidden sm:table-cell",
												children: t.phone
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 text-xs hidden md:table-cell",
												children: t.email
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "secondary",
													children: "Lead"
												})
											})
										]
									}), t.group.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-t border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5",
												children: g.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 font-mono text-xs",
												children: g.passport
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 text-xs text-muted-foreground hidden sm:table-cell",
												children: g.phone || "â€”"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 text-xs text-muted-foreground hidden md:table-cell",
												children: g.email || "â€”"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 text-muted-foreground",
												children: "Companion"
											})
										]
									}, g.passport))] })]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "itinerary",
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "relative ml-3 space-y-5 border-l border-border pl-6",
								children: t.itinerary.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -left-[31px] top-0.5 grid h-6 w-6 place-items-center rounded-full border-2 border-background bg-primary text-[10px] font-semibold text-primary-foreground",
										children: d.day.toString().padStart(2, "0")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-md border border-border bg-card p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap items-center justify-between gap-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-xs uppercase tracking-wider text-muted-foreground",
														children: [
															"Day ",
															d.day.toString().padStart(2, "0"),
															" ",
															d.location ? `Â· ${d.location}` : ""
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mt-0.5 text-sm font-semibold",
														children: d.title
													})] }), d.status === "Completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700 border border-green-200",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Arrived"]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600 border border-amber-200",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), " Pending"]
													})]
												})
											}),
											d.destinations && d.destinations.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 space-y-4",
												children: d.destinations.map((dest, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5 relative pl-4 border-l-2 border-muted",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-1.5 top-1.5 h-2 w-2 rounded-full bg-primary/40 ring-4 ring-background" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "text-sm font-medium",
															children: dest.location
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[13px] text-muted-foreground leading-relaxed whitespace-pre-wrap",
															children: dest.activities
														})
													]
												}, i))
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "mt-3 space-y-1 text-sm text-muted-foreground",
												children: d.activities?.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a })]
												}, i))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 grid gap-2 rounded-md bg-muted/40 p-3 sm:grid-cols-[1fr_1fr_auto] items-center",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 text-xs",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-medium",
															children: d.hotel
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 text-xs text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "truncate",
															children: d.hotelEmail
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
														asChild: true,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															variant: "outline",
															size: "sm",
															className: "h-7 text-[10px] gap-1.5 w-full sm:w-auto bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3 w-3" }), "Review Auto-Generated Email"]
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Review Confirmation Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: ["Automated email to ", d.hotelEmail] })] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-4 py-2",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "grid gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "From" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																		disabled: true,
																		defaultValue: "info@ceylonsignaturetravels.com"
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "grid gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																		htmlFor: "subject",
																		children: "Subject"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																		id: "subject",
																		defaultValue: `Booking Confirmation for ${t.name} (Ref: ${t.id})`
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "grid gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																		htmlFor: "message",
																		children: "Message"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																		id: "message",
																		className: "flex min-h-[160px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
																		defaultValue: `Dear Reservation Team at ${d.hotel},\n\nWe would like to confirm the booking for our client, ${t.name} (Group Size: ${t.pax}), arriving for Day ${d.day} of their tour.\n\nPlease let us know if everything is confirmed on your end and provide any relevant reservation numbers.\n\nBest regards,\nCeylon Signature Travels`
																	})]
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															type: "submit",
															children: "Send Confirmation"
														}) })
													] })] })
												]
											})
										]
									})]
								}, d.day))
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-7 pb-10 pt-6 mt-8 border-t border-border/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
						open: deleteOpen,
						onOpenChange: setDeleteOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "destructive",
								className: "w-full sm:w-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), "Delete Client"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Are you absolutely sure?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"This action cannot be undone. This will permanently delete ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t.name }),
							" and remove all of their data, itineraries, and group members from our servers."
						] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setDeleteOpen(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								onClick: () => {
									setDeleteOpen(false);
									onDeleteClient();
									toast.success("Client deleted successfully");
									if (onBack) onBack();
								},
								children: "Yes, delete client"
							})]
						})] })]
					})
				})
			]
		}, t.id)
	});
}
function InfoField({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-card p-3.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 break-words text-sm font-medium",
			children: value
		})]
	});
}
function AgentManagement({ agents, onAddAgent, onEditAgent, onDeleteAgent }) {
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	const [editingAgent, setEditingAgent] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		region: ""
	});
	const [editForm, setEditForm] = (0, import_react.useState)({
		name: "",
		email: "",
		region: ""
	});
	function submitAdd() {
		if (!form.name || !form.email) {
			toast.error("Name and email required");
			return;
		}
		onAddAgent(form);
		setForm({
			name: "",
			email: "",
			region: ""
		});
		setAddOpen(false);
		toast.success("Agent profile created");
	}
	function submitEdit() {
		if (!editForm.name || !editForm.email) {
			toast.error("Name and email required");
			return;
		}
		onEditAgent(editingAgent, editForm);
		setEditOpen(false);
		toast.success("Agent updated successfully");
	}
	function openEdit(a) {
		setEditingAgent(a);
		setEditForm({
			name: a.agent_name || a.name || "",
			email: a.email || "",
			region: a.region || ""
		});
		setEditOpen(true);
	}
	function openDelete(a) {
		setEditingAgent(a);
		setDeleteOpen(true);
	}
	const regions = [
		"South Asia",
		"Europe",
		"East Asia",
		"Oceania",
		"Middle East",
		"Americas"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-6 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm text-muted-foreground",
					children: [
						agents.length,
						" agents Â· ",
						agents.reduce((s, a) => s + (a.clients || 0), 0),
						" clients under management"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open: addOpen,
					onOpenChange: setAddOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), "Add agent"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add new agent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Create a profile for a new team member." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ag-name",
									children: "Full name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ag-name",
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									}),
									placeholder: "e.g. Amara Jayawardena"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ag-email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ag-email",
									type: "email",
									value: form.email,
									onChange: (e) => setForm({
										...form,
										email: e.target.value
									}),
									placeholder: "amara@horizon.travel"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ag-region",
									children: "Assigned region"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.region,
									onValueChange: (v) => setForm({
										...form,
										region: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "ag-region",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a region" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: regions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: r,
										children: r
									}, r)) })]
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => setAddOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: submitAdd,
							children: "Create agent"
						})] })
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: editOpen,
				onOpenChange: setEditOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Edit Agent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Update the agent's profile information." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editForm.name,
								onChange: (e) => setEditForm({
									...editForm,
									name: e.target.value
								}),
								placeholder: "Full name"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								value: editForm.email,
								onChange: (e) => setEditForm({
									...editForm,
									email: e.target.value
								}),
								placeholder: "Email"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Assigned region" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: editForm.region,
								onValueChange: (v) => setEditForm({
									...editForm,
									region: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a region" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: regions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: r,
									children: r
								}, r)) })]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setEditOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: submitEdit,
						children: "Save changes"
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: deleteOpen,
				onOpenChange: setDeleteOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Delete Agent?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"This will permanently delete ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: editingAgent?.agent_name || editingAgent?.name }),
					". This cannot be undone."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setDeleteOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						onClick: () => {
							setDeleteOpen(false);
							onDeleteAgent(editingAgent.id);
							toast.success("Agent deleted");
						},
						children: "Yes, delete agent"
					})]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 p-6 sm:grid-cols-2 xl:grid-cols-3",
					children: agents.map((a) => {
						const initials = (a.agent_name || a.name || "?").split(" ").map((p) => p[0]).slice(0, 2).join("");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative rounded-lg border border-border bg-card p-5 transition-all hover:shadow-md hover:border-primary/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										className: "h-7 w-7 p-0 border-primary/40 text-primary hover:bg-primary/10",
										onClick: () => openEdit(a),
										title: "Edit agent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-3.5 w-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										className: "h-7 w-7 p-0 border-destructive/40 text-destructive hover:bg-destructive/10",
										onClick: () => openDelete(a),
										title: "Delete agent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary",
										children: initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-sm font-semibold",
											children: a.agent_name || a.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-xs text-muted-foreground",
											children: a.email
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: "Region"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 font-medium",
										children: a.region
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground",
											children: "Clients"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-0.5 text-base font-semibold",
											children: a.clients
										})]
									})]
								})
							]
						}, a.id);
					})
				})
			})
		]
	});
}
function DriverManagement({ drivers, onAddDriver, onUpdateDriver, onDeleteDriver }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		password: ""
	});
	const [selectedDriver, setSelectedDriver] = (0, import_react.useState)(null);
	async function submit() {
		if (!form.name || !form.phone || !form.email) {
			toast.error("Name, phone, and email required");
			return;
		}
		try {
			await onAddDriver(form);
			setForm({
				name: "",
				phone: "",
				email: "",
				password: ""
			});
			setOpen(false);
		} catch (e) {
			toast.error("Failed to add driver. Please try again.");
		}
	}
	async function submitEdit() {
		if (!form.name || !form.phone || !form.email) {
			toast.error("Name, phone, and email required");
			return;
		}
		if (selectedDriver) {
			try {
				await onUpdateDriver(selectedDriver.id, form);
			} catch (e) {
				toast.error("Failed to update driver.");
				return;
			}
			setEditOpen(false);
			setSelectedDriver(null);
			toast.success("Driver profile updated");
		}
	}
	function confirmDelete() {
		if (selectedDriver) {
			onDeleteDriver(selectedDriver.id);
			setDeleteOpen(false);
			setSelectedDriver(null);
			toast.success("Driver deleted");
		}
	}
	function openEdit(driver) {
		setSelectedDriver(driver);
		setForm({
			name: driver.name || "",
			phone: driver.phone || "",
			email: driver.email || "",
			password: ""
		});
		setEditOpen(true);
	}
	function openDelete(driver) {
		setSelectedDriver(driver);
		setDeleteOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-6 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm text-muted-foreground",
					children: [drivers.length, " drivers & guides"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), "Add driver / guide"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add new driver" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Create a profile for a driver or guide." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "drv-name",
									children: "Full name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "drv-name",
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									}),
									placeholder: "e.g. Kamal Perera"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "drv-phone",
									children: "Phone Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "drv-phone",
									value: form.phone,
									onChange: (e) => setForm({
										...form,
										phone: e.target.value
									}),
									placeholder: "+94 77 123 4567"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "drv-email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "drv-email",
									type: "email",
									value: form.email,
									onChange: (e) => setForm({
										...form,
										email: e.target.value
									}),
									placeholder: "driver@example.com"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "drv-pw",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "link",
										className: "h-auto p-0 text-xs",
										onClick: () => {
											const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
											let newPw = "";
											for (let i = 0; i < 10; i++) newPw += chars.charAt(Math.floor(Math.random() * 70));
											setForm({
												...form,
												password: newPw
											});
										},
										children: "Generate Random"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "drv-pw",
									type: "text",
									value: form.password,
									onChange: (e) => setForm({
										...form,
										password: e.target.value
									}),
									placeholder: "Optional: Auto-assigns if empty"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => setOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: submit,
							children: "Create profile"
						})] })
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 p-6 sm:grid-cols-2 xl:grid-cols-3",
					children: drivers.map((d) => {
						const initials = (d.name || "?").split(" ").map((p) => p[0]).slice(0, 2).join("");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative rounded-lg border border-border bg-card p-5 overflow-hidden transition-all hover:shadow-md hover:border-primary/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100",
								children: [
									d.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10",
										onClick: () => {
											navigator.clipboard.writeText(`Email: ${d.email}\nPassword: ${d.password}`);
											toast.success("Credentials copied!");
										},
										title: "Copy Credentials",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10",
										onClick: () => openEdit(d),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
										onClick: () => openDelete(d),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary",
									children: initials
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-sm font-semibold pr-16",
											children: d.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-xs text-muted-foreground",
											children: d.phone
										}),
										d.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-xs text-muted-foreground",
											children: d.email
										})
									]
								})]
							})]
						}, d.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: editOpen,
				onOpenChange: setEditOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Edit Driver" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Update driver details." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-drv-name",
								children: "Full name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-drv-name",
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-drv-phone",
								children: "Phone Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-drv-phone",
								value: form.phone,
								onChange: (e) => setForm({
									...form,
									phone: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-drv-email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-drv-email",
								type: "email",
								value: form.email,
								onChange: (e) => setForm({
									...form,
									email: e.target.value
								})
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setEditOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: submitEdit,
						children: "Save changes"
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: deleteOpen,
				onOpenChange: setDeleteOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Delete Driver?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"Are you sure you want to permanently delete ",
					selectedDriver?.name,
					"? This action cannot be undone."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setDeleteOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						onClick: confirmDelete,
						children: "Delete Driver"
					})]
				})] })
			})
		]
	});
}
function DashboardOverview({ stats, navLabel }) {
	const tiles = [
		{
			label: "Active tours",
			value: stats.active,
			hint: "Currently in country"
		},
		{
			label: "Upcoming arrivals",
			value: stats.upcoming,
			hint: "Next 30 days"
		},
		{
			label: "Travelers on tour",
			value: stats.pax,
			hint: "Total pax in service"
		},
		{
			label: "Source countries",
			value: stats.countries,
			hint: "Markets this month"
		}
	];
	const labelMap = {
		dashboard: "Dashboard",
		tours: "Active Tours",
		leads: "Inquiries & Leads",
		agents: "Agent Management",
		drivers: "Drivers & Guides",
		reports: "Reports",
		settings: "Settings"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
		className: "flex-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: tiles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: t.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-3xl font-semibold tracking-tight",
							children: t.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-muted-foreground",
							children: t.hint
						})
					]
				}, t.label))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-lg border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: labelMap[navLabel]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Detailed ",
						labelMap[navLabel].toLowerCase(),
						" views are available here. Switch to",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: "Active Tours"
						}),
						" from the left navigation to manage tourist itineraries and bookings."
					]
				})]
			})]
		})
	});
}
//#endregion
export { Console as component };
