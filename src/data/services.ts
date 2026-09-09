export type Service = {
  index: string;
  name: string;
  slug: string;
  href: string;
  short: string;
  description: string;
  forWhom: string;
  problem: string;
  points: string[];
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    index: "01",
    name: "Web Development",
    slug: "web-development",
    href: "/services/web-development",
    short: "Websites and web applications designed around a real job to do.",
    description:
      "We design and build websites and web applications that are fast, clear, and built to last — from a company’s public face to the product people actually use.",
    forWhom:
      "Founders, brands, and operators who need a site or web product that holds up in production — not a template with a new coat of paint.",
    problem:
      "Most websites are assembled. They look finished and fail at the work: unclear, slow, hard to change, and disconnected from the business.",
    points: [
      "Marketing and product websites",
      "Web applications and dashboards",
      "Performance, accessibility, and SEO foundations",
      "Design systems that can grow with the product",
    ],
    seoTitle: "Web Development Services — IGRIS Tech",
    seoDescription:
      "IGRIS Tech builds modern websites and web applications around real business goals — fast, accessible, and ready to grow.",
  },
  {
    index: "02",
    name: "Software Development",
    slug: "software-development",
    href: "/services/software-development",
    short: "Custom software when off-the-shelf tools are not enough.",
    description:
      "We build custom software — internal systems, digital products, and the infrastructure around them — when the work does not fit a generic tool.",
    forWhom:
      "Teams whose operations, product, or customers have outgrown spreadsheets, plugins, and disconnected apps.",
    problem:
      "Generic software forces the business to bend. Custom software is expensive when it is built without a clear product and technical direction.",
    points: [
      "Custom product development",
      "Internal tools and operational systems",
      "APIs and platform architecture",
      "Codebases meant to be maintained, not replaced",
    ],
    seoTitle: "Software Development — IGRIS Tech",
    seoDescription:
      "Custom software and digital products from IGRIS Tech — systems designed around how your business actually works.",
  },
  {
    index: "03",
    name: "AI Solutions",
    slug: "ai-solutions",
    href: "/services/ai-solutions",
    short: "AI features and tools that are useful in production.",
    description:
      "We integrate AI where it creates real leverage — assistants, workflows, and product features that have to work on ordinary days, not just in a demo.",
    forWhom:
      "Product and operations teams who have a specific job for AI, not a mandate to “add AI” somewhere.",
    problem:
      "Most AI work stops at a prototype. The hard part is making it reliable, scoped, and worth the complexity it adds.",
    points: [
      "AI features inside existing products",
      "Intelligent internal tools",
      "Workflow and document intelligence",
      "Practical, production-minded implementation",
    ],
    seoTitle: "AI Solutions — IGRIS Tech",
    seoDescription:
      "IGRIS Tech builds AI-powered experiences and intelligent tools that work in real products, not just prototypes.",
  },
  {
    index: "04",
    name: "Automation",
    slug: "automation",
    href: "/services/automation",
    short: "Systems that remove repetitive work and make operations reliable.",
    description:
      "We design automation that takes friction out of operations — connecting tools, reducing manual work, and making processes something you can trust.",
    forWhom:
      "Operators and founders spending too much time moving information between tools, people, and spreadsheets.",
    problem:
      "Manual processes do not scale, and automation without process design just moves the mess into software.",
    points: [
      "Workflow automation",
      "Integrations between existing tools",
      "Operational systems and reporting",
      "Process design before implementation",
    ],
    seoTitle: "Automation Services — IGRIS Tech",
    seoDescription:
      "IGRIS Tech designs automation systems that reduce repetitive work and make operations more reliable.",
  },
];

export const supportingCapabilities = [
  {
    name: "Digital Products",
    text: "From first version to a product people return to — structure, interface, and the software underneath.",
  },
  {
    name: "Custom Systems",
    text: "Software shaped around how the work actually happens, not around a vendor’s idea of a workflow.",
  },
  {
    name: "Integrations",
    text: "Connecting the tools you already use so information does not have to be copied by hand.",
  },
] as const;

export function getService(slug: string): Service | undefined {
  if (!services || !Array.isArray(services)) {
    return undefined;
  }
  return services.find((s) => s.slug === slug);
}
