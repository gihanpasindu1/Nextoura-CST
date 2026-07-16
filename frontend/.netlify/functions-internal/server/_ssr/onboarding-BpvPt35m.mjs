import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Input, o as supabase, r as Label, t as Button } from "./label-ChrkDSnk.mjs";
import { d as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as Building2, a as Trash2, d as Plus, v as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-BpvPt35m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OnboardingPage() {
	const router = useRouter();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [user, setUser] = (0, import_react.useState)(null);
	const [companyName, setCompanyName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [ceoName, setCeoName] = (0, import_react.useState)("");
	const [phoneNumbers, setPhoneNumbers] = (0, import_react.useState)([""]);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (!session) router.navigate({ to: "/login" });
			else {
				setUser(session.user);
				setEmail(session.user.email || "");
				setLoading(false);
			}
		});
	}, [router]);
	const handleAddPhone = () => {
		setPhoneNumbers([...phoneNumbers, ""]);
	};
	const handleRemovePhone = (index) => {
		setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
	};
	const handlePhoneChange = (index, value) => {
		const newPhones = [...phoneNumbers];
		newPhones[index] = value;
		setPhoneNumbers(newPhones);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!companyName || !email || !ceoName || phoneNumbers.some((p) => !p)) {
			toast.error("Please fill in all fields");
			return;
		}
		try {
			setSubmitting(true);
			const res = await fetch("https://cst-tour-management-system.onrender.com/api/companies/onboard", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					company_name: companyName,
					email,
					auth_user_id: user.id,
					ceo_name: ceoName,
					phone_numbers: phoneNumbers
				})
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.detail || "Failed to onboard company");
			}
			toast.success("Profile completed successfully!");
			router.navigate({ to: "/" });
		} catch (err) {
			toast.error(err.message);
		} finally {
			setSubmitting(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-screen w-full items-center justify-center bg-slate-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-blue-600" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-slate-50 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl space-y-8 rounded-2xl border border-slate-200 bg-white p-10 shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 grid h-14 w-14 place-items-center rounded-xl bg-blue-600 text-white shadow-md ring-4 ring-blue-600/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-7 w-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold tracking-tight text-slate-900",
						children: "Complete Your Profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-500",
						children: "Welcome! Please provide your company details to continue."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "companyName",
								className: "text-slate-700 font-medium",
								children: "Company Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "companyName",
								placeholder: "Horizon Travel Agency",
								value: companyName,
								onChange: (e) => setCompanyName(e.target.value),
								className: "bg-white border-slate-200 focus:border-blue-500",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								className: "text-slate-700 font-medium",
								children: "Company Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								placeholder: "info@horizontravel.com",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "bg-white border-slate-200 focus:border-blue-500",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ceoName",
								className: "text-slate-700 font-medium",
								children: "CEO Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ceoName",
								placeholder: "John Doe",
								value: ceoName,
								onChange: (e) => setCeoName(e.target.value),
								className: "bg-white border-slate-200 focus:border-blue-500",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-slate-700 font-medium",
									children: "Phone Numbers"
								}),
								phoneNumbers.map((phone, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "+1 234 567 8900",
										value: phone,
										onChange: (e) => handlePhoneChange(index, e.target.value),
										className: "bg-white border-slate-200 focus:border-blue-500 flex-1",
										required: true
									}), phoneNumbers.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										size: "icon",
										onClick: () => handleRemovePhone(index),
										className: "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								}, index)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: handleAddPhone,
									className: "w-full mt-2 border-dashed border-slate-300 text-slate-600 hover:text-slate-900",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Add Another Phone Number"]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: submitting,
					className: "w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all",
					children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Saving Profile..."] }) : "Complete Setup & Continue"
				})]
			})]
		})
	});
}
//#endregion
export { OnboardingPage as component };
