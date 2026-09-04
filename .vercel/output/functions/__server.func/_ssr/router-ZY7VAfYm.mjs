import { i as __toESM } from "../_runtime.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { d as require_react, u as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as router_exports } from "./router-ZY7VAfYm2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BGxJXod1.js
/**
* Single mock dataset. Public UI and admin both read through the content store.
* Replace this module with API responses later — do not duplicate these arrays in components.
*/
var seedProjects = [
	{
		id: "proj_web_platform",
		slug: "web-platform",
		title: "Web platform",
		client: "To be announced",
		category: "Web Development",
		year: null,
		description: "A web platform case study will be published here when the work is ready to share.",
		overview: "This entry is a structured placeholder. The case study format is in place so real work can be published without rebuilding the site.",
		challenge: "",
		objectives: [],
		approach: "",
		design: "",
		development: "",
		keyDecisions: [],
		results: null,
		services: ["web-development"],
		technologies: [],
		gallery: [],
		testimonial: null,
		featuredImage: null,
		url: null,
		featured: true,
		published: true,
		placeholder: true,
		status: "in-preparation",
		visual: "alpha",
		publishedAt: null,
		seoTitle: "Web platform — IGRIS Tech",
		seoDescription: "A web development case study from IGRIS Tech. Published when the work is ready to share."
	},
	{
		id: "proj_custom_system",
		slug: "custom-system",
		title: "Custom system",
		client: "To be announced",
		category: "Software Development",
		year: null,
		description: "A custom software case study will be published here when the work is ready to share.",
		overview: "This entry is a structured placeholder. Challenge, approach, design, and development will be written from the actual project — not invented.",
		challenge: "",
		objectives: [],
		approach: "",
		design: "",
		development: "",
		keyDecisions: [],
		results: null,
		services: ["software-development"],
		technologies: [],
		gallery: [],
		testimonial: null,
		featuredImage: null,
		url: null,
		featured: true,
		published: true,
		placeholder: true,
		status: "in-preparation",
		visual: "beta",
		publishedAt: null,
		seoTitle: "Custom system — IGRIS Tech",
		seoDescription: "A software development case study from IGRIS Tech. Published when the work is ready to share."
	},
	{
		id: "proj_intelligent_product",
		slug: "intelligent-product",
		title: "Intelligent product",
		client: "To be announced",
		category: "AI Solutions",
		year: null,
		description: "An intelligent product case study will be published here when the work is ready to share.",
		overview: "This entry is a structured placeholder. No metrics, quotes, or client names are fabricated to fill the page.",
		challenge: "",
		objectives: [],
		approach: "",
		design: "",
		development: "",
		keyDecisions: [],
		results: null,
		services: ["ai-solutions", "automation"],
		technologies: [],
		gallery: [],
		testimonial: null,
		featuredImage: null,
		url: null,
		featured: true,
		published: true,
		placeholder: true,
		status: "in-preparation",
		visual: "gamma",
		publishedAt: null,
		seoTitle: "Intelligent product — IGRIS Tech",
		seoDescription: "An AI and automation case study from IGRIS Tech. Published when the work is ready to share."
	}
];
var seedEcosystem = [{
	id: "eco_hosting",
	name: "IGRIS Hosting",
	slug: "hosting",
	description: "Infrastructure for the modern web. Product details will be published as the work lands.",
	status: "In development",
	url: null,
	order: 1,
	published: true,
	category: "Infrastructure",
	subdomain: "hosting.igristech.com"
}, {
	id: "eco_studio",
	name: "IGRIS Studio",
	slug: "studio",
	description: "A product in the IGRIS ecosystem. Scope and features will be published when they are real.",
	status: "In development",
	url: null,
	order: 2,
	published: true,
	category: "Platform",
	subdomain: "studio.igristech.com"
}];
var seedReviews = [];
var FUTURE_PRODUCTS_NOTE = "Further products will sit on their own subdomains under igristech.com when they are ready.";
function createId(prefix) {
	return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
function slugify(value) {
	return value.toLowerCase().trim().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "item";
}
function uniqueSlug(base, taken) {
	const set = new Set(taken);
	const slug = slugify(base);
	if (!set.has(slug)) return slug;
	let n = 2;
	while (set.has(`${slug}-${n}`)) n += 1;
	return `${slug}-${n}`;
}
function hostnameFromUrl(url) {
	try {
		return new URL(url).host;
	} catch {
		return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
	}
}
var VISUALS = [
	"alpha",
	"beta",
	"gamma"
];
function buildProject(input, existing, current) {
	const taken = existing.filter((p) => p.id !== current?.id).map((p) => p.slug);
	const slug = uniqueSlug(input.slug || input.title, taken);
	const placeholder = !input.challenge && !input.approach && !input.design;
	const published = input.published;
	return {
		id: current?.id ?? createId("proj"),
		slug,
		title: input.title.trim(),
		client: input.client.trim() || "To be announced",
		category: input.category.trim() || "Web Development",
		year: current?.year ?? null,
		description: input.description.trim(),
		overview: input.overview.trim(),
		challenge: input.challenge.trim(),
		objectives: current?.objectives ?? [],
		approach: input.approach.trim(),
		design: input.design.trim(),
		development: input.development.trim(),
		keyDecisions: current?.keyDecisions ?? [],
		results: input.results.trim() ? input.results.trim() : null,
		services: input.services,
		technologies: input.technologies,
		gallery: current?.gallery ?? [],
		testimonial: current?.testimonial ?? null,
		featuredImage: current?.featuredImage ?? null,
		url: input.url.trim() ? input.url.trim() : null,
		featured: input.featured,
		published,
		placeholder,
		status: input.status,
		visual: current?.visual ?? VISUALS[existing.length % VISUALS.length],
		publishedAt: published ? current?.publishedAt ?? (/* @__PURE__ */ new Date()).toISOString() : null,
		seoTitle: `${input.title.trim()} — IGRIS Tech`,
		seoDescription: input.description.trim() || `A case study from IGRIS Tech. Published when the work is ready to share.`
	};
}
function buildEcosystem(input, existing, current) {
	const taken = existing.filter((p) => p.id !== current?.id).map((p) => p.slug);
	const slug = uniqueSlug(input.name, taken);
	const url = input.url.trim() ? input.url.trim() : null;
	return {
		id: current?.id ?? createId("eco"),
		name: input.name.trim(),
		slug,
		description: input.description.trim(),
		status: input.status,
		url,
		order: Number.isFinite(input.order) ? input.order : existing.length + 1,
		published: input.published,
		category: current?.category || "Product",
		subdomain: url ? hostnameFromUrl(url) : current?.subdomain || `${slug}.igristech.com`
	};
}
var useContentStore = create()(persist((set, get) => ({
	projects: seedProjects,
	ecosystem: seedEcosystem,
	reviews: seedReviews,
	inquiries: [],
	createProject: (input) => {
		const project = buildProject(input, get().projects);
		set({ projects: [...get().projects, project] });
		return project;
	},
	updateProject: (id, input) => {
		const current = get().projects.find((p) => p.id === id);
		if (!current) return null;
		const next = buildProject(input, get().projects, current);
		set({ projects: get().projects.map((p) => p.id === id ? next : p) });
		return next;
	},
	deleteProject: (id) => {
		set({ projects: get().projects.filter((p) => p.id !== id) });
	},
	setProjectPublished: (id, published) => {
		set({ projects: get().projects.map((p) => p.id === id ? {
			...p,
			published,
			publishedAt: published ? p.publishedAt ?? (/* @__PURE__ */ new Date()).toISOString() : null
		} : p) });
	},
	createEcosystem: (input) => {
		const item = buildEcosystem(input, get().ecosystem);
		set({ ecosystem: [...get().ecosystem, item] });
		return item;
	},
	updateEcosystem: (id, input) => {
		const current = get().ecosystem.find((p) => p.id === id);
		if (!current) return null;
		const next = buildEcosystem(input, get().ecosystem, current);
		set({ ecosystem: get().ecosystem.map((p) => p.id === id ? next : p) });
		return next;
	},
	deleteEcosystem: (id) => {
		set({ ecosystem: get().ecosystem.filter((p) => p.id !== id) });
	},
	createReview: (input) => {
		const review = {
			id: createId("rev"),
			clientName: input.clientName.trim(),
			company: input.company.trim(),
			role: input.role.trim(),
			rating: input.rating,
			content: input.content.trim(),
			avatar: null,
			project: input.project.trim() || null,
			website: input.website.trim() || null,
			status: "pending",
			published: false,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		set({ reviews: [review, ...get().reviews] });
		return review;
	},
	updateReview: (id, patch) => {
		const current = get().reviews.find((r) => r.id === id);
		if (!current) return null;
		const next = {
			...current,
			...patch,
			id: current.id
		};
		set({ reviews: get().reviews.map((r) => r.id === id ? next : r) });
		return next;
	},
	deleteReview: (id) => {
		set({ reviews: get().reviews.filter((r) => r.id !== id) });
	},
	createInquiry: (input) => {
		const inquiry = {
			id: createId("inq"),
			name: input.name.trim(),
			email: input.email.trim(),
			company: input.company.trim(),
			type: input.type.trim(),
			description: input.description.trim(),
			budget: input.budget.trim(),
			timeline: input.timeline.trim(),
			website: input.website.trim(),
			contactMethod: input.contactMethod.trim(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			read: false
		};
		set({ inquiries: [inquiry, ...get().inquiries] });
		return inquiry;
	},
	setInquiryRead: (id, read) => {
		set({ inquiries: get().inquiries.map((i) => i.id === id ? {
			...i,
			read
		} : i) });
	},
	deleteInquiry: (id) => {
		set({ inquiries: get().inquiries.filter((i) => i.id !== id) });
	}
}), {
	name: "igris-content-v1",
	skipHydration: true,
	storage: createJSONStorage(() => {
		if (typeof window === "undefined") return {
			getItem: () => null,
			setItem: () => {},
			removeItem: () => {}
		};
		return localStorage;
	})
}));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/projects-B7PfSoQw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var PROJECT_CATEGORIES = [
	"Web Development",
	"Software Development",
	"AI Solutions",
	"Automation",
	"Digital Product"
];
var PROJECT_SERVICE_OPTIONS = [
	{
		slug: "web-development",
		label: "Web Development"
	},
	{
		slug: "software-development",
		label: "Software Development"
	},
	{
		slug: "ai-solutions",
		label: "AI Solutions"
	},
	{
		slug: "automation",
		label: "Automation"
	}
];
var PROJECT_STATUSES = [
	{
		value: "in-preparation",
		label: "In preparation"
	},
	{
		value: "live",
		label: "Live"
	},
	{
		value: "archived",
		label: "Archived"
	}
];
function emptyProjectInput() {
	return {
		title: "",
		slug: "",
		client: "",
		category: "Web Development",
		description: "",
		overview: "",
		challenge: "",
		approach: "",
		design: "",
		development: "",
		results: "",
		services: [],
		technologies: [],
		url: "",
		status: "in-preparation",
		published: false,
		featured: true
	};
}
function projectToInput(project) {
	return {
		title: project.title,
		slug: project.slug,
		client: project.client === "To be announced" ? "" : project.client,
		category: project.category,
		description: project.description,
		overview: project.overview,
		challenge: project.challenge,
		approach: project.approach,
		design: project.design,
		development: project.development,
		results: project.results ?? "",
		services: project.services,
		technologies: project.technologies,
		url: project.url ?? "",
		status: project.status,
		published: project.published,
		featured: project.featured
	};
}
/**
* Project repository.
* Mock implementation today. Swap the body of these functions for
* GET/POST/PUT/DELETE /api/projects later — UI should keep calling this module.
*/
var projectsService = {
	list() {
		return useContentStore.getState().projects;
	},
	getById(id) {
		return useContentStore.getState().projects.find((p) => p.id === id) ?? null;
	},
	getBySlug(slug) {
		return useContentStore.getState().projects.find((p) => p.slug === slug) ?? null;
	},
	getPublishedBySlug(slug) {
		return useContentStore.getState().projects.find((p) => p.slug === slug && p.published) ?? null;
	},
	published() {
		return useContentStore.getState().projects.filter((p) => p.published);
	},
	featured() {
		return useContentStore.getState().projects.filter((p) => p.published && p.featured);
	},
	related(slug) {
		return useContentStore.getState().projects.filter((p) => p.published && p.slug !== slug);
	},
	create(input) {
		return useContentStore.getState().createProject(input);
	},
	update(id, input) {
		return useContentStore.getState().updateProject(id, input);
	},
	delete(id) {
		useContentStore.getState().deleteProject(id);
	},
	setPublished(id, published) {
		useContentStore.getState().setProjectPublished(id, published);
	}
};
function useProjects() {
	return useContentStore((s) => s.projects);
}
function usePublishedProjects() {
	const projects = useContentStore((s) => s.projects);
	return (0, import_react.useMemo)(() => projects.filter((p) => p.published), [projects]);
}
function useFeaturedProjects() {
	const projects = useContentStore((s) => s.projects);
	return (0, import_react.useMemo)(() => projects.filter((p) => p.published && p.featured), [projects]);
}
function useProjectBySlug(slug) {
	return useContentStore((s) => s.projects.find((p) => p.slug === slug && p.published) ?? null);
}
function useProjectById(id) {
	return useContentStore((s) => s.projects.find((p) => p.id === id) ?? null);
}
function useRelatedProjects(slug) {
	const projects = useContentStore((s) => s.projects);
	return (0, import_react.useMemo)(() => projects.filter((p) => p.published && p.slug !== slug), [projects, slug]);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/utils-C_uf36nf.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/button-link-DuD0WsTl.js
var import_jsx_runtime = require_jsx_runtime();
var variants = {
	primary: "bg-ink text-canvas border border-ink hover:bg-paper hover:text-coal",
	inverse: "bg-canvas text-ink border border-canvas hover:bg-raised",
	ghost: "bg-transparent text-ink border border-hairline hover:border-quiet hover:bg-raised/40",
	text: "bg-transparent text-ink hover:text-paper px-0 h-auto min-h-0 border-0"
};
var base = "inline-flex items-center justify-center gap-2.5 h-12 min-h-12 px-6 text-sm font-medium tracking-wide transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none";
function withArrow(children, arrow) {
	if (!arrow) return children;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "btn-arrow",
		"aria-hidden": true,
		children: "→"
	})] });
}
function ButtonLink({ to, href, variant = "primary", className, children, external, arrow = true }) {
	const classes = cn(base, variants[variant], className);
	const content = withArrow(children, arrow && variant !== "text");
	if (href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className: classes,
		...external ? {
			target: "_blank",
			rel: "noreferrer"
		} : {},
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: to ?? "/",
		className: classes,
		children: content
	});
}
function Button({ variant = "primary", className, type = "button", arrow = false, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(base, variants[variant], className),
		...props,
		children: withArrow(children, arrow && variant !== "text")
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/container-CGk6eJJy.js
function Container({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16", className),
		children
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/services-CsiE3ino.js
var services = [
	{
		index: "01",
		name: "Web Development",
		slug: "web-development",
		href: "/services/web-development",
		short: "Websites and web applications designed around a real job to do.",
		description: "We design and build websites and web applications that are fast, clear, and built to last — from a company’s public face to the product people actually use.",
		forWhom: "Founders, brands, and operators who need a site or web product that holds up in production — not a template with a new coat of paint.",
		problem: "Most websites are assembled. They look finished and fail at the work: unclear, slow, hard to change, and disconnected from the business.",
		points: [
			"Marketing and product websites",
			"Web applications and dashboards",
			"Performance, accessibility, and SEO foundations",
			"Design systems that can grow with the product"
		],
		seoTitle: "Web Development Services — IGRIS Tech",
		seoDescription: "IGRIS Tech builds modern websites and web applications around real business goals — fast, accessible, and ready to grow."
	},
	{
		index: "02",
		name: "Software Development",
		slug: "software-development",
		href: "/services/software-development",
		short: "Custom software when off-the-shelf tools are not enough.",
		description: "We build custom software — internal systems, digital products, and the infrastructure around them — when the work does not fit a generic tool.",
		forWhom: "Teams whose operations, product, or customers have outgrown spreadsheets, plugins, and disconnected apps.",
		problem: "Generic software forces the business to bend. Custom software is expensive when it is built without a clear product and technical direction.",
		points: [
			"Custom product development",
			"Internal tools and operational systems",
			"APIs and platform architecture",
			"Codebases meant to be maintained, not replaced"
		],
		seoTitle: "Software Development — IGRIS Tech",
		seoDescription: "Custom software and digital products from IGRIS Tech — systems designed around how your business actually works."
	},
	{
		index: "03",
		name: "AI Solutions",
		slug: "ai-solutions",
		href: "/services/ai-solutions",
		short: "AI features and tools that are useful in production.",
		description: "We integrate AI where it creates real leverage — assistants, workflows, and product features that have to work on ordinary days, not just in a demo.",
		forWhom: "Product and operations teams who have a specific job for AI, not a mandate to “add AI” somewhere.",
		problem: "Most AI work stops at a prototype. The hard part is making it reliable, scoped, and worth the complexity it adds.",
		points: [
			"AI features inside existing products",
			"Intelligent internal tools",
			"Workflow and document intelligence",
			"Practical, production-minded implementation"
		],
		seoTitle: "AI Solutions — IGRIS Tech",
		seoDescription: "IGRIS Tech builds AI-powered experiences and intelligent tools that work in real products, not just prototypes."
	},
	{
		index: "04",
		name: "Automation",
		slug: "automation",
		href: "/services/automation",
		short: "Systems that remove repetitive work and make operations reliable.",
		description: "We design automation that takes friction out of operations — connecting tools, reducing manual work, and making processes something you can trust.",
		forWhom: "Operators and founders spending too much time moving information between tools, people, and spreadsheets.",
		problem: "Manual processes do not scale, and automation without process design just moves the mess into software.",
		points: [
			"Workflow automation",
			"Integrations between existing tools",
			"Operational systems and reporting",
			"Process design before implementation"
		],
		seoTitle: "Automation Services — IGRIS Tech",
		seoDescription: "IGRIS Tech designs automation systems that reduce repetitive work and make operations more reliable."
	}
];
var supportingCapabilities = [
	{
		name: "Digital Products",
		text: "From first version to a product people return to — structure, interface, and the software underneath."
	},
	{
		name: "Custom Systems",
		text: "Software shaped around how the work actually happens, not around a vendor’s idea of a workflow."
	},
	{
		name: "Integrations",
		text: "Connecting the tools you already use so information does not have to be copied by hand."
	}
];
function getService(slug) {
	return services.find((s) => s.slug === slug);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/seo-CU7LXOqa.js
var SITE = {
	name: "IGRIS Tech",
	legalName: "IGRIS Tech",
	domain: "https://igristech.com",
	tagline: "We build what's next.",
	description: "IGRIS Tech builds digital products, software, websites, and intelligent solutions for individuals, brands, and businesses.",
	email: null,
	social: []
};
var NAV = [
	{
		label: "Services",
		to: "/services"
	},
	{
		label: "Work",
		to: "/work"
	},
	{
		label: "Ecosystem",
		to: "/ecosystem"
	},
	{
		label: "About",
		to: "/about"
	}
];
function absoluteUrl(path = "/") {
	if (path.startsWith("http")) return path;
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return `${SITE.domain}${normalized}`;
}
function pageHead({ title, description, path = "/", noIndex }) {
	const url = absoluteUrl(path);
	return {
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				name: "theme-color",
				content: "#070708"
			},
			{
				name: "application-name",
				content: SITE.name
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:url",
				content: url
			},
			{
				property: "og:site_name",
				content: SITE.name
			},
			{
				name: "twitter:title",
				content: title
			},
			{
				name: "twitter:description",
				content: description
			},
			...noIndex ? [{
				name: "robots",
				content: "noindex, nofollow"
			}] : []
		],
		links: [{
			rel: "canonical",
			href: url
		}]
	};
}
function organizationJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SITE.name,
		url: SITE.domain,
		description: SITE.description,
		logo: `${SITE.domain}/brand/igris-mark.png`
	};
}
function websiteJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SITE.name,
		url: SITE.domain,
		description: SITE.description
	};
}
function serviceJsonLd(name, description, url) {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name,
		description,
		url,
		provider: {
			"@type": "Organization",
			name: SITE.name,
			url: SITE.domain
		}
	};
}
function breadcrumbJsonLd(items) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: absoluteUrl(item.path)
		}))
	};
}
function creativeWorkJsonLd(input) {
	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: input.name,
		description: input.description,
		url: input.url,
		creator: {
			"@type": "Organization",
			name: SITE.name,
			url: SITE.domain
		},
		...input.dateCreated ? { dateCreated: input.dateCreated } : {}
	};
}
//#endregion
export { FUTURE_PRODUCTS_NOTE as A, projectsService as C, useProjects as D, useProjectBySlug as E, useContentStore as M, usePublishedProjects as O, projectToInput as S, useProjectById as T, cn as _, breadcrumbJsonLd as a, PROJECT_STATUSES as b, pageHead as c, getService as d, services as f, ButtonLink as g, Button as h, absoluteUrl as i, slugify as j, useRelatedProjects as k, serviceJsonLd as l, Container as m, NAV as n, creativeWorkJsonLd as o, supportingCapabilities as p, SITE as r, organizationJsonLd as s, router_exports as t, websiteJsonLd as u, PROJECT_CATEGORIES as v, useFeaturedProjects as w, emptyProjectInput as x, PROJECT_SERVICE_OPTIONS as y };
