// src/App.tsx
import Dashboards from "./pages/Dashboards";
import { motion, useReducedMotion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./components/Reveal";
import {
  BarChart3,
  ShieldCheck,
  Hand,
  Brain,
  GraduationCap,
  Code2,
  LayoutDashboard,
  Cpu,
  Layers,
  Wrench,
  FileText,
  Microscope,
  Presentation,
} from "lucide-react";

type Tag = { t: string; c: string };

type Project = {
  title: string;
  desc: string;
  icon: any;
  accent: string;
  tags: Tag[];
  extra: string | null;
};

type ResearchItem = {
  title: string;
  pill: { t: string; c: string };
  meta: string;
  mentor: string | null;
  tags: Tag[];
  pdf: string | null;
  note: string | null;
  icon: any;
  accent: string;
  abstract?: string;
};

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  // ✅ Controls which Research card's abstract is expanded
  const [openAbstract, setOpenAbstract] = useState<string | null>(null);

  // Parallax photo ref
  const bgRef = useRef<HTMLImageElement | null>(null);

  // ✅ smoother parallax (RAF) + respects reduced motion
  useEffect(() => {
    if (prefersReducedMotion) return;

    let raf = 0;

    const handleMove = (e: MouseEvent) => {
      if (!bgRef.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!bgRef.current) return;
        bgRef.current.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [prefersReducedMotion]);

  // Scroll progress bar (subtle, top)
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });

  const navItems = useMemo(
    () => [
      { href: "#projects", label: "Projects" },
      { href: "#skills", label: "Skills" },
      { href: "#dashboards", label: "Dashboards" },
      { href: "#research", label: "Research" },
      { href: "#ai", label: "AI Lab" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  const projects: Project[] = useMemo(
    () => [
      {
        title: "Trade Compliance Dashboard",
        desc: "Built interactive dashboards to monitor compliance KPIs, shipment risks, and delay trends for reporting and visibility.",
        icon: ShieldCheck,
        accent: "from-emerald-400/25 to-emerald-400/0",
        tags: [
          { t: "Analytics", c: "bg-sky-400/15 text-sky-200" },
          { t: "Dashboards", c: "bg-emerald-400/15 text-emerald-200" },
          { t: "KPI Tracking", c: "bg-purple-400/15 text-purple-200" },
        ],
        extra: null,
      },
      {
        title: "Sign Language Interpreter (Real-Time)",
        desc: "Developed a real-time, bidirectional system translating sign language into text and speech to improve accessibility.",
        icon: Hand,
        accent: "from-sky-300/25 to-sky-300/0",
        tags: [
          { t: "Machine Learning", c: "bg-emerald-400/15 text-emerald-200" },
          { t: "Computer Vision", c: "bg-purple-400/15 text-purple-200" },
          { t: "Python", c: "bg-sky-400/15 text-sky-200" },
          { t: "Speech / NLP", c: "bg-pink-400/15 text-pink-200" },
        ],
        extra: null,
      },
      {
        title: "NBA 2024–2025 Data Scraping & Statistical Analysis",
        desc: "Built a Python scraper using Requests + BeautifulSoup to extract real-time NBA data and generate 18+ visualizations with Matplotlib/Seaborn for trend analysis and reporting.",
        icon: BarChart3,
        accent: "from-purple-400/25 to-purple-400/0",
        tags: [
          { t: "Python", c: "bg-emerald-400/15 text-emerald-200" },
          { t: "Web Scraping", c: "bg-sky-400/15 text-sky-200" },
          { t: "EDA", c: "bg-purple-400/15 text-purple-200" },
          { t: "Viz", c: "bg-pink-400/15 text-pink-200" },
        ],
        extra: "Streamlined processing with custom modules (sub-30s execution) and reduced redundancy by 80%+.",
      },
      {
        title: "Brain Tumor Classification using CNN",
        desc: "Built a CNN-based model in TensorFlow/Keras to detect brain tumors from MRI scans using preprocessing and augmentation.",
        icon: Brain,
        accent: "from-pink-400/25 to-pink-400/0",
        tags: [
          { t: "Deep Learning", c: "bg-emerald-400/15 text-emerald-200" },
          { t: "CNN", c: "bg-purple-400/15 text-purple-200" },
          { t: "TensorFlow", c: "bg-sky-400/15 text-sky-200" },
          { t: "Model Eval", c: "bg-pink-400/15 text-pink-200" },
        ],
        extra: "Improved performance with dropout, batch norm, transfer learning; evaluated using precision/recall.",
      },
      {
        title: "Deloitte Australia – Data Analytics Simulation (Forage)",
        desc: "Analyzed business datasets to identify trends and create actionable reports; built Tableau dashboards and Excel models.",
        icon: GraduationCap,
        accent: "from-emerald-400/25 to-emerald-400/0",
        tags: [
          { t: "Tableau", c: "bg-sky-400/15 text-sky-200" },
          { t: "Analytics", c: "bg-emerald-400/15 text-emerald-200" },
          { t: "Excel", c: "bg-purple-400/15 text-purple-200" },
          { t: "Reporting", c: "bg-pink-400/15 text-pink-200" },
        ],
        extra: "Improved simulated decision-making efficiency by ~30% through clearer KPI reporting.",
      },
    ],
    []
  );

  const skills = useMemo(
    () => [
      {
        title: "Programming",
        items: ["Python", "SQL", "JavaScript", "TypeScript"],
        icon: Code2,
        accent: "from-emerald-400/25 to-emerald-400/0",
      },
      {
        title: "Data Analytics",
        items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "EDA"],
        icon: BarChart3,
        accent: "from-sky-300/25 to-sky-300/0",
      },
      {
        title: "Dashboards & BI",
        items: ["Tableau", "Power BI", "Excel", "KPI Design"],
        icon: LayoutDashboard,
        accent: "from-purple-400/25 to-purple-400/0",
      },
      {
        title: "Machine Learning & AI",
        items: ["Scikit-learn", "TensorFlow", "CNNs", "Computer Vision", "NLP"],
        icon: Cpu,
        accent: "from-pink-400/25 to-pink-400/0",
      },
      {
        title: "Data Engineering",
        items: ["Web Scraping", "Requests", "BeautifulSoup", "ETL Pipelines"],
        icon: Layers,
        accent: "from-emerald-400/25 to-emerald-400/0",
      },
      {
        title: "Tools & Platforms",
        items: ["Git", "GitHub", "VS Code", "Linux"],
        icon: Wrench,
        accent: "from-sky-300/25 to-sky-300/0",
      },
    ],
    []
  );

  const research: ResearchItem[] = useMemo(
    () => [
      {
        title: "Sign Language Interpreter For Physically Challenged People",
        pill: { t: "Published", c: "bg-emerald-400/15 text-emerald-200" },
        meta:
          "International Journal of Advanced Research in Science, Communication and Technology (IJARSCT) — May 2024",
        mentor: "Prof. Neha Chaube",
        tags: [
          { t: "Accessibility", c: "bg-purple-400/15 text-purple-200" },
          { t: "Computer Vision", c: "bg-sky-400/15 text-sky-200" },
          { t: "Real-Time Systems", c: "bg-pink-400/15 text-pink-200" },
        ],
        pdf: "papers/ijarsct-sign-language.pdf",
        note: "public/papers/ijarsct-sign-language.pdf",
        icon: FileText,
        accent: "from-emerald-400/25 to-emerald-400/0",
        abstract:
          "This study introduces a novel sign language interpreter designed to improve accessibility and communication for those with physical disabilities, particularly those who experience hearing loss. Through the use of cutting-edge artificial intelligence and machine learning algorithms, the technology interprets sign language movements in real-time, removing social, professional, and educational communication barriers. By means of ongoing cooperation among researchers, technology developers, and individuals with physical disabilities, this invention hopes to make a substantial contribution towards the development of a more inclusive society. People of all physical capacities can actively interact, participate, and succeed in such a community. The fundamental ideas of a revolutionary technology that promotes acceptance, equality, and understanding at the formal, academic level are captured in this abstract.",
      },
      {
        title:
          "Building Data Pipelines Using Python: A Hands-On Journey in Web Scraping, Analysis and Visualization",
        pill: { t: "Present", c: "bg-sky-400/15 text-sky-200" },
        meta: "ICERI — To be presented",
        mentor: "Prof. Mary Tadeschi",
        tags: [
          { t: "Python", c: "bg-emerald-400/15 text-emerald-200" },
          { t: "Data Pipelines", c: "bg-purple-400/15 text-purple-200" },
          { t: "Visualization", c: "bg-pink-400/15 text-pink-200" },
        ],
        pdf: "papers/iceri-data-pipelines.pdf",
        note: "public/papers/iceri-data-pipelines.pdf",
        icon: Presentation,
        accent: "from-sky-300/25 to-sky-300/0",
        abstract:
          "Contemporary database systems, while effective, suffer severe issues related to complexity and usability, especially among individuals who lack technical expertise but are unfamiliar with query languages like SQL. This paper presents a new database system supported by AI, intended to improve data management using NLP-based interfaces, automatic creation of structured queries, and semi-structured formats such as YAML, JSON, and API documentation. The system strengthens database capabilities through integration of LLMs and advanced machine learning algorithms to automate tasks such as data modeling, schema creation, query comprehension, and performance optimization. It reduces manual tuning, technical dependency, and human error. The AI database employs generative schema inference and format selection to build schema models and execution formats, enabling continuous performance enhancement across relational, NoSQL, NewSQL, graph databases, and vector stores. Reinforcement learning mechanisms are investigated for ongoing improvement and adaptation. The research addresses AI-specific challenges such as query hallucinations, schema drift, and schema evolution, and proposes empirical evaluation and comparative benchmarking against existing technologies. Compared to solutions like MIT GenSQL, this work targets complete database management automation with dynamic schema creation, adaptive optimization across heterogeneous systems, and explicit RL-based self-improvement.",
      },
      {
        title: "More Research (Coming Soon)",
        pill: { t: "Next", c: "bg-purple-400/15 text-purple-200" },
        meta: "Adding more publications, conference submissions, and technical write-ups soon.",
        mentor: null,
        tags: [
          { t: "AI", c: "border border-white/10 bg-black/20 text-white/80" },
          { t: "Analytics", c: "border border-white/10 bg-black/20 text-white/80" },
          { t: "Research", c: "border border-white/10 bg-black/20 text-white/80" },
        ],
        pdf: null,
        note: null,
        icon: Microscope,
        accent: "from-purple-400/25 to-purple-400/0",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white">
      {/* top progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-emerald-400 via-sky-300 to-purple-400"
        style={{ scaleX: progress }}
      />

      {/* Navbar */}
      <motion.header
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"
        initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <motion.div
          className="text-lg font-semibold tracking-wide"
          whileHover={prefersReducedMotion ? undefined : { y: -1 }}
          transition={{ duration: 0.2 }}
        >
          Madhur Gattani<span className="text-emerald-400">.</span>
        </motion.div>

        <nav className="hidden gap-6 text-sm text-white/80 md:flex">
          {navItems.map((n) => (
            <motion.a
              key={n.href}
              className="group relative hover:text-white"
              href={n.href}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              transition={{ duration: 0.18 }}
            >
              {n.label}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-[1px] w-full origin-left scale-x-0 bg-white/60 transition-transform duration-200 group-hover:scale-x-100" />
            </motion.a>
          ))}
        </nav>

        <motion.a
          href="#contact"
          className="rounded-xl bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
          whileHover={prefersReducedMotion ? undefined : { y: -2 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        >
          Let’s Talk
        </motion.a>
      </motion.header>

      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-emerald-400/15 blur-[90px]"
            animate={prefersReducedMotion ? undefined : { x: [0, 18, 0], y: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-sky-300/15 blur-[90px]"
            animate={prefersReducedMotion ? undefined : { x: [0, -18, 0], y: [0, -10, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay">
            <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:14px_14px]" />
          </div>

          {/* ✅ Stable GitHub Pages profile image */}
          <div className="absolute inset-0">
            <img
              ref={bgRef}
              src={`${import.meta.env.BASE_URL}me.jpg?v=2`}
              alt="Madhur Gattani"
              onError={(e) => {
                const img = e.currentTarget;
                const base = import.meta.env.BASE_URL;

                const tries = [
                  `${base}me.jpg?v=2`,
                  `${base}me.jpeg?v=2`,
                  `${base}me.png?v=2`,
                  `${base}Me.jpg?v=2`,
                  `${base}Me.JPG?v=2`,
                ];

                const current = img.getAttribute("data-try") || "0";
                const idx = Math.min(parseInt(current, 10), tries.length - 1);

                if (img.src.includes(tries[tries.length - 1])) return;

                img.setAttribute("data-try", String(idx + 1));
                img.src = tries[idx + 1] || tries[tries.length - 1];
              }}
              className="absolute right-0 top-0 h-full w-full object-cover opacity-[0.95] md:opacity-[1] saturate-[1.15] contrast-[1.12]"
              style={{
                maskImage:
                  "radial-gradient(60% 60% at 70% 30%, black 0%, rgba(0,0,0,0.85) 40%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(60% 60% at 70% 30%, black 0%, rgba(0,0,0,0.85) 40%, transparent 70%)",
                filter: "brightness(1.08)",
                transform: "scale(1.08)",
                transition: "transform 120ms ease-out",
                willChange: "transform",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-slate-950/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.22)_45%,rgba(0,0,0,0.62)_85%)]" />
          </div>
        </div>

        <motion.main
          className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pt-10 md:grid-cols-2 md:pt-16"
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion ? undefined : "show"}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
          }}
        >
          <motion.section
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <motion.p
              className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Data Analytics • Automation • AI
            </motion.p>

            <motion.h1
              className="text-4xl font-semibold leading-tight md:text-5xl"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              I turn <span className="text-emerald-400">data</span> into{" "}
              <span className="text-sky-300">decisions</span>.
            </motion.h1>

            <motion.p
              className="mt-4 max-w-xl text-white/70"
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              I build dashboards, analytics pipelines, and decision-support systems that reduce manual work and
              drive faster, consistent outcomes.
            </motion.p>

            <motion.div
              className="mt-7 flex flex-wrap gap-3"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <motion.a
                href="#projects"
                className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                View Projects
              </motion.a>

              <motion.a
                href="#dashboards"
                className="rounded-xl bg-sky-300 px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                Live Dashboards
              </motion.a>

              <motion.a
                href="#contact"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium transition hover:bg-white/10 backdrop-blur-md"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                Contact
              </motion.a>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              {[
                { label: "Automation Impact", value: "+38%" },
                { label: "Dashboards Built", value: "10+" },
                { label: "Focus", value: "Decision Intelligence" },
              ].map((x) => (
                <motion.div
                  key={x.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
                  transition={{ duration: 0.18 }}
                >
                  <p className="text-xs text-white/60">{x.label}</p>
                  <p className="text-lg font-semibold">{x.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            className="relative"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
            }}
          >
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white/90">🧠 Decision Intelligence Preview</h2>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">Demo</span>
              </div>

              <div className="mt-5 space-y-4">
                <motion.div
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                >
                  <p className="text-xs text-white/60">Input</p>
                  <p className="mt-1 text-sm">“Compliance delay increased this week”</p>
                </motion.div>

                <motion.div
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                >
                  <p className="text-xs text-white/60">AI Insight</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                    <li>Pattern detected in exception handling</li>
                    <li>Recommend standard rule checks + routing</li>
                    <li>Estimated time reduction: 25–40%</li>
                  </ul>
                </motion.div>

                <motion.div
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                >
                  <p className="text-xs text-white/60">Suggested Next Action</p>
                  <p className="mt-1 text-sm text-white/80">
                    Add automated validation steps and prioritize high-risk records.
                  </p>
                </motion.div>
              </div>

              <motion.a
                href="#ai"
                className="mt-6 block w-full rounded-2xl bg-white/10 py-3 text-center text-sm transition hover:bg-white/15"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
              >
                Open AI Lab →
              </motion.a>
            </motion.div>
          </motion.section>
        </motion.main>

        <div className="mx-auto mt-14 max-w-6xl px-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </section>

      {/* Skills Section */}
      <Reveal>
        <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold">
            Technical <span className="text-emerald-400">Skills</span>
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Tools and technologies I actively use to build analytics, machine learning, and decision-support systems.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
                  whileHover={prefersReducedMotion ? undefined : { y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <div
                    className={`pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${card.accent} blur-2xl opacity-80`}
                  />

                  <div className="relative flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/25 backdrop-blur">
                      <Icon className="h-5 w-5 text-white/90 transition-transform duration-200 group-hover:rotate-[-6deg] group-hover:scale-[1.05]" />
                    </div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                  </div>

                  <div className="relative mt-4 flex flex-wrap gap-2 text-xs">
                    {card.items.map((s: string) => (
                      <span key={s} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-white/80">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* Projects Section */}
      <Reveal>
        <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold">
            Selected <span className="text-emerald-400">Projects</span>
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Real-world analytics, machine learning, and decision-support work—built with a focus on impact and clarity.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                  whileHover={prefersReducedMotion ? undefined : { y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  <div
                    className={`pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${p.accent} blur-2xl opacity-80`}
                  />

                  <div className="relative flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/25 backdrop-blur">
                      <Icon className="h-5 w-5 text-white/90 transition-transform duration-200 group-hover:rotate-[-6deg] group-hover:scale-[1.05]" />
                    </div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                  </div>

                  <p className="relative mt-3 text-sm text-white/70">{p.desc}</p>

                  <div className="relative mt-4 flex flex-wrap gap-2 text-xs">
                    {p.tags.map((x) => (
                      <span key={x.t} className={`rounded-full px-3 py-1 ${x.c}`}>
                        {x.t}
                      </span>
                    ))}
                  </div>

                  {p.extra ? <p className="relative mt-3 text-xs text-white/50">{p.extra}</p> : null}

                  <a href="#" className="relative mt-5 inline-block text-sm text-emerald-300 hover:underline">
                    View Case Study →
                  </a>

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* Dashboards */}
      <Reveal>
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <Dashboards />
      </Reveal>

      {/* Research Papers Section */}
      <Reveal>
        <section id="research" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold">
            Research <span className="text-emerald-400">Papers</span>
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Published and upcoming research connecting accessibility, data pipelines, and applied analytics.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {research.map((r) => {
              const Icon = r.icon;
              const isOpen = openAbstract === r.title;

              return (
                <motion.div
                  key={r.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                  whileHover={prefersReducedMotion ? undefined : { y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  <div
                    className={`pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${r.accent} blur-2xl opacity-80`}
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/25 backdrop-blur">
                        <Icon className="h-5 w-5 text-white/90 transition-transform duration-200 group-hover:rotate-[-6deg] group-hover:scale-[1.05]" />
                      </div>
                      <h3 className="text-lg font-semibold leading-snug">{r.title}</h3>
                    </div>

                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${r.pill.c}`}>{r.pill.t}</span>
                  </div>

                  <p className="relative mt-2 text-sm text-white/70">{r.meta}</p>

                  {r.mentor ? (
                    <p className="relative mt-3 text-sm text-white/70">
                      Mentor: <span className="text-white/90">{r.mentor}</span>
                    </p>
                  ) : null}

                  <div className="relative mt-4 flex flex-wrap gap-2 text-xs">
                    {r.tags.map((t) => (
                      <span key={t.t} className={`rounded-full px-3 py-1 ${t.c}`}>
                        {t.t}
                      </span>
                    ))}
                  </div>

                  <div className="relative mt-5 flex flex-wrap gap-3">
                    {r.title.includes("Coming Soon") ? (
                      <a
                        href="#contact"
                        className="rounded-xl bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
                      >
                        Collaborate →
                      </a>
                    ) : (
                      <button
                        onClick={() => setOpenAbstract((prev) => (prev === r.title ? null : r.title))}
                        className="rounded-xl bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
                      >
                        {isOpen ? "Hide Abstract →" : "Read Abstract →"}
                      </button>
                    )}

                    {r.pdf ? (
                      <a
                        href={r.pdf}
                        className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm transition hover:bg-white/10"
                        target="_blank"
                        rel="noreferrer"
                      >
                        PDF
                      </a>
                    ) : null}
                  </div>

                  <AnimatePresence>
                    {isOpen && r.abstract && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25 }}
                        className="relative mt-4 rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <p className="text-xs text-white/60">Abstract</p>
                        <p className="mt-2 text-sm text-white/80 leading-relaxed">{r.abstract}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* AI Lab Section */}
      <Reveal>
        <section id="ai" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold">
            AI <span className="text-emerald-400">Lab</span>
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            A space for experiments in decision intelligence, NLP, and model-driven insights. I’ll publish demos and
            write-ups here as I build.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { k: "Current Focus", t: "Text-to-Decision Systems", d: "Turning unstructured text into actionable recommendations with guardrails." },
              { k: "Next Demo", t: "Risk Signal Extraction", d: "Identify risks in logs/reports and summarize “what to do next”." },
              { k: "Coming Soon", t: "Interactive Case Studies", d: "Clickable project breakdowns with metrics, visuals, and lessons learned." },
            ].map((x) => (
              <motion.div
                key={x.k}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                whileHover={prefersReducedMotion ? undefined : { y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-xs text-white/60">{x.k}</p>
                <p className="mt-2 text-lg font-semibold">{x.t}</p>
                <p className="mt-2 text-sm text-white/70">{x.d}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Contact Section */}
      <Reveal>
        <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10"
            whileHover={prefersReducedMotion ? undefined : { y: -6 }}
            transition={{ duration: 0.22 }}
          >
            <h2 className="text-3xl font-semibold">
              Let’s <span className="text-sky-300">Connect</span>
            </h2>
            <p className="mt-3 max-w-2xl text-white/70">
              Want to collaborate, discuss analytics roles, or review a dashboard idea? Send a message and I’ll respond quickly.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                { k: "Email", v: "madhurgattani5@gmail.com", d: "Click to send an email", href: "mailto:madhurgattani5@gmail.com" },
                { k: "LinkedIn", v: "linkedin.com/in/madhurgattani", d: "Open profile", href: "https://www.linkedin.com/in/madhurgattani", ext: true },
                { k: "GitHub", v: "github.com/Madhur0203", d: "View repositories", href: "https://github.com/Madhur0203", ext: true },
              ].map((x) => (
                <motion.a
                  key={x.k}
                  className="rounded-2xl border border-white/10 bg-black/20 p-6 transition hover:bg-white/10"
                  href={x.href}
                  target={x.ext ? "_blank" : undefined}
                  rel={x.ext ? "noreferrer" : undefined}
                  whileHover={prefersReducedMotion ? undefined : { y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs text-white/60">{x.k}</p>
                  <p className="mt-2 text-lg font-semibold">{x.v}</p>
                  <p className="mt-1 text-sm text-white/70">{x.d}</p>
                </motion.a>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
                className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
                href="#projects"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                View Projects
              </motion.a>

              {/* ✅ Resume button (GitHub Pages safe) */}
              <motion.a
                className="rounded-xl bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/15"
                href="resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                Download Resume
              </motion.a>
            </div>

            <p className="mt-6 text-xs text-white/50">
              To enable the resume button: place your resume file at <code>public/resume.pdf</code>.
            </p>
          </motion.div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 pb-10 text-sm text-white/50">
        <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Madhur. Built with React + Tailwind.</p>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#projects">
              Projects
            </a>
            <a className="hover:text-white" href="#dashboards">
              Dashboards
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </footer>

      <div className="h-10" />
    </div>
  );
}