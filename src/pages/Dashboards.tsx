import React from "react";
type Category = "ALL" | "ETL PIPELINES" | "EXPLORATORY DATA ANALYSIS" | "KPI DASHBOARDS";

type DashItem = {
  title: string;
  category: Exclude<Category, "ALL">;
  img: string;      // preview image
  href: string;     // tableau view link
};

const DASHBOARDS: DashItem[] = [
  {
    title: "Operations KPI Dashboard",
    category: "KPI DASHBOARDS",
    img: "https://public.tableau.com/static/images/Ai/AirlineOperationsControlCenter/Dashboard1/1.png",
    href: "https://public.tableau.com/views/AirlineOperationsControlCenter/Dashboard1",
  },
  {
    title: "SaaS Retention Analytics",
    category: "KPI DASHBOARDS",
    img: "https://public.tableau.com/static/images/Sa/SaaSCustomerChurnRevenueRetentionDashboard/CustomerOverview/1.png",
    href: "https://public.tableau.com/views/SaaSCustomerChurnRevenueRetentionDashboard/CustomerOverview",
  },
  {
    title: "E-Commerce Pricing Strategy",
    category: "EXPLORATORY DATA ANALYSIS",
    img: "https://public.tableau.com/static/images/E-/E-CommercePricingStrategyAnalysis/Dashboard1/1.png",
    href: "https://public.tableau.com/views/E-CommercePricingStrategyAnalysis/Dashboard1",
  },

  // Add ETL items later if you have links/images
  // {
  //   title: "ETL Pipeline – XYZ",
  //   category: "ETL PIPELINES",
  //   img: "...",
  //   href: "...",
  // },
];

const TABS: Category[] = [
  "ALL",
  "ETL PIPELINES",
  "EXPLORATORY DATA ANALYSIS",
  "KPI DASHBOARDS",
];

export default function Dashboards() {
  const [active, setActive] = React.useState<Category>("ALL");

  const items =
    active === "ALL"
      ? DASHBOARDS
      : DASHBOARDS.filter((d) => d.category === active);

  return (
    <section id="dashboards" className="mx-auto max-w-6xl px-6 py-16">
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          Tableau Dashboards
        </h2>
        <p className="mt-2 text-sm text-white/70">
          Browse dashboards by category. Click any tile to open on Tableau Public.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-6 text-sm font-semibold uppercase tracking-wide">
        {TABS.map((t) => {
          const isActive = t === active;
          return (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`transition ${
                isActive
                  ? "text-sky-300"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Tiles */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((d) => (
          <a
            key={d.href}
            href={d.href}
            target="_blank"
            rel="noreferrer"
            className="group block"
            title={d.title}
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition hover:border-white/20">
              {/* Image */}
              <div className="relative">
                <img
                  src={d.img}
                  alt={d.title}
                  className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />

                {/* Open badge */}
                <div className="absolute right-4 top-4 rounded-xl bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
                  Open →
                </div>
              </div>

              {/* Text */}
              <div className="p-4">
                <div className="text-base font-semibold">{d.title}</div>
                <div className="mt-1 text-xs text-white/60">{d.category}</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer link */}
      <div className="mt-10">
        <a
          href="https://public.tableau.com/app/profile/madhur.gattani/vizzes"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          View all dashboards on Tableau Public →
        </a>
      </div>
    </section>
  );
}