// src/App.tsx
import Dashboards from "./pages/Dashboards";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
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
  Database,
  Workflow,
  FileSpreadsheet,
  X,
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

type AbstractModalState = {
  title: string;
  abstract: string;
  meta?: string;
  mentor?: string | null;
  pdf?: string | null;
};

type CaseStudySection = { h: string; p: string };
type CaseStudyModalState = {
  title: string;
  subtitle?: string;
  sections: CaseStudySection[];
  stack?: string[];
  impact?: string[];
};

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  // Parallax photo ref
  const bgRef = useRef<HTMLImageElement | null>(null);

  // ✅ Popup abstract modal state
  const [abstractModal, setAbstractModal] = useState<AbstractModalState | null>(
    null
  );

  // ✅ Popup case study modal state
  const [caseStudyModal, setCaseStudyModal] =
    useState<CaseStudyModalState | null>(null);

  // ✅ ESC close + lock page scroll when ANY modal is open
  useEffect(() => {
    const hasModalOpen = Boolean(abstractModal || caseStudyModal);
    if (!hasModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbstractModal(null);
        setCaseStudyModal(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [abstractModal, caseStudyModal]);

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
        desc: "Built a Python scraper using Requests + BeautifulSoup to extract real-time NBA data and generate 18+ visualizations for trend analysis and reporting.",
        icon: BarChart3,
        accent: "from-purple-400/25 to-purple-400/0",
        tags: [
          { t: "Python", c: "bg-emerald-400/15 text-emerald-200" },
          { t: "Web Scraping", c: "bg-sky-400/15 text-sky-200" },
          { t: "EDA", c: "bg-purple-400/15 text-purple-200" },
          { t: "Viz", c: "bg-pink-400/15 text-pink-200" },
        ],
        extra:
          "Streamlined processing with custom modules (sub-30s execution) and reduced redundancy by 80%+.",
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
        extra:
          "Improved performance with dropout, batch norm, transfer learning; evaluated using precision/recall.",
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
        extra:
          "Improved simulated decision-making efficiency by ~30% through clearer KPI reporting.",
      },
    ],
    []
  );

  // ✅ Case studies content (descriptive)
  const caseStudies = useMemo<Record<string, CaseStudyModalState>>(
    () => ({
      "Trade Compliance Dashboard": {
        title: "Trade Compliance Dashboard",
        subtitle:
          "Interactive KPI dashboards for shipment risk visibility, compliance monitoring, and faster reporting.",
        stack: [
          "Tableau",
          "Excel",
          "ERP Data (Syteline)",
          "Data Modeling",
          "KPI Design",
        ],
        impact: [
          "Improved visibility into compliance KPIs and exceptions (single source of truth).",
          "Reduced manual reporting effort by standardizing metrics and views.",
          "Enabled faster decision-making through drill-downs by vendor/port/time.",
        ],
        sections: [
          {
            h: "Problem",
            p: "Trade compliance teams often lose time consolidating data from multiple sources (ERP, trackers, ISF/entry documentation) and then manually preparing weekly updates. The result is delayed visibility, inconsistent KPI definitions, and slow escalation of high-risk shipments.",
          },
          {
            h: "Goal",
            p: "Create a dashboard system that clearly answers: What is happening right now? Where are the risks? Which vendors/ports are driving delays? What actions should be taken next?",
          },
          {
            h: "Approach",
            p: "Designed KPI definitions (delay trends, exception volume, risk signals), built a clean structure for reporting dimensions (vendor, port, shipment stage, date), and implemented interactive dashboards with drill-downs and filters so stakeholders can move from summary to root cause in seconds.",
          },
          {
            h: "What I Built",
            p: "A set of dashboards including KPI cards, trend lines, exception breakdowns, and risk views that support day-to-day operational decisions—plus a consistent reporting format so weekly updates are fast and repeatable.",
          },
          {
            h: "Outcome",
            p: "The dashboard became a visibility layer for stakeholders: less time preparing slides and more time acting on issues. It also improves alignment because everyone is reading the same metrics and definitions.",
          },
        ],
      },

      "Sign Language Interpreter (Real-Time)": {
        title: "Sign Language Interpreter (Real-Time)",
        subtitle:
          "Real-time sign-to-text/speech translation system to improve accessibility and communication.",
        stack: [
          "Python",
          "Computer Vision",
          "ML Classification",
          "Real-Time Pipeline",
          "Speech / NLP",
        ],
        impact: [
          "Delivered a real-time translation workflow from gesture → meaning → output.",
          "Improved accessibility by enabling faster communication without manual interpretation.",
          "Applied CV + ML for practical, real-world inference constraints (latency + stability).",
        ],
        sections: [
          {
            h: "Problem",
            p: "Communication barriers for people using sign language often require a human interpreter, which is not always available. A practical solution needs to be fast, consistent, and usable in real time.",
          },
          {
            h: "Goal",
            p: "Build a real-time system that captures sign gestures, recognizes them reliably, and produces text and speech output to support day-to-day communication.",
          },
          {
            h: "Approach",
            p: "Created a real-time pipeline that captures video frames, extracts gesture features, and uses a trained ML model to classify signs. Outputs are stabilized to reduce flicker and then converted into readable text (and speech when needed).",
          },
          {
            h: "What I Built",
            p: "An end-to-end interpreter prototype: live camera input, inference pipeline, predicted sign output, and an accessibility-friendly output layer designed for responsiveness.",
          },
          {
            h: "Outcome",
            p: "The system demonstrates how computer vision can be applied for accessibility impact—balancing accuracy with performance constraints required in a live environment.",
          },
        ],
      },

      "NBA 2024–2025 Data Scraping & Statistical Analysis": {
        title: "NBA 2024–2025 Data Scraping & Statistical Analysis",
        subtitle:
          "End-to-end sports analytics pipeline: scrape → clean → analyze → visualize (18+ charts).",
        stack: [
          "Python",
          "Requests",
          "BeautifulSoup",
          "Pandas",
          "NumPy",
          "Matplotlib",
          "Seaborn",
        ],
        impact: [
          "Automated repeatable extraction of live tables and metrics from the web.",
          "Generated 18+ visualizations for trends, comparisons, and distributions.",
          "Reduced redundancy via modular pipeline design and faster execution.",
        ],
        sections: [
          {
            h: "Problem",
            p: "Sports data is spread across multiple web pages and formats. Manually collecting stats is slow, inconsistent, and hard to reproduce for weekly updates or reporting.",
          },
          {
            h: "Goal",
            p: "Build a reliable pipeline that scrapes NBA data, performs statistical analysis, and produces clear visualizations for insights (player/team trends, distributions, comparisons).",
          },
          {
            h: "Approach",
            p: "Built a structured scraper using Requests + BeautifulSoup, then standardized tables with Pandas. Designed a clean analysis layer (summary statistics, trend comparisons) and produced a visualization pack for reporting.",
          },
          {
            h: "What I Built",
            p: "A modular pipeline that pulls multiple datasets, cleans and merges them, calculates key metrics, and outputs charts (histogram, bar, line, pie, etc.) with consistent formatting for storytelling.",
          },
          {
            h: "Outcome",
            p: "The project demonstrates an end-to-end analytics workflow—repeatable, fast, and report-ready—with a strong focus on transforming raw web data into decision-friendly visuals.",
          },
        ],
      },

      "Brain Tumor Classification using CNN": {
        title: "Brain Tumor Classification using CNN",
        subtitle:
          "Deep learning model to classify brain MRI scans using CNN architecture and robust evaluation.",
        stack: [
          "TensorFlow",
          "Keras",
          "CNNs",
          "Image Preprocessing",
          "Data Augmentation",
          "Model Evaluation",
        ],
        impact: [
          "Built a complete ML workflow from preprocessing to evaluation.",
          "Improved generalization using augmentation and regularization.",
          "Evaluated with precision/recall to handle classification quality properly.",
        ],
        sections: [
          {
            h: "Problem",
            p: "MRI classification is challenging because images vary in contrast, noise, orientation, and quality. A successful model must generalize well beyond a small training set and remain stable across real-world variation.",
          },
          {
            h: "Goal",
            p: "Develop a CNN-based model that can learn meaningful visual patterns from MRI scans and accurately classify tumor presence (or categories depending on dataset).",
          },
          {
            h: "Approach",
            p: "Applied preprocessing and augmentation to improve model robustness, then trained a CNN in TensorFlow/Keras. Used regularization strategies (dropout, batch normalization, and transfer learning concepts where applicable) to reduce overfitting.",
          },
          {
            h: "What I Built",
            p: "A deep learning training pipeline with data preparation, model training, validation, and evaluation. The workflow includes metric-driven improvement and careful evaluation using precision/recall to ensure reliability.",
          },
          {
            h: "Outcome",
            p: "The project shows strong fundamentals in computer vision model building—data handling, architecture selection, performance tuning, and evaluation—aligned with real applied ML practices.",
          },
        ],
      },

      "Deloitte Australia – Data Analytics Simulation (Forage)": {
        title: "Deloitte Australia – Data Analytics Simulation (Forage)",
        subtitle:
          "Business analytics simulation: trend discovery, reporting, and dashboard storytelling.",
        stack: ["Tableau", "Excel", "Analytics", "Reporting", "Data Storytelling"],
        impact: [
          "Converted raw business datasets into insights and executive-ready reporting.",
          "Built dashboards that communicate trends and KPIs clearly.",
          "Improved simulated decision-making efficiency via structured KPI reporting.",
        ],
        sections: [
          {
            h: "Problem",
            p: "Business teams often have data but lack clarity—trends are hidden in spreadsheets, and decisions slow down when insights aren’t presented clearly to stakeholders.",
          },
          {
            h: "Goal",
            p: "Identify patterns in business datasets and communicate insights through a clear story: what’s happening, why it matters, and what actions should be taken.",
          },
          {
            h: "Approach",
            p: "Performed data preparation in Excel, explored trends and outliers, then designed Tableau dashboards that make KPIs easy to interpret with filters and clean layouts.",
          },
          {
            h: "What I Built",
            p: "An analysis + reporting deliverable: cleaned datasets, insight notes, and a dashboard that supports stakeholder questions with drill-down exploration.",
          },
          {
            h: "Outcome",
            p: "The simulation demonstrates practical analytics skills—turning raw data into a decision narrative using dashboards and reporting best practices.",
          },
        ],
      },
    }),
    []
  );

  // ✅ UPDATED + EXPANDED (no duplicates; nothing removed)
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
        items: [
          "Pandas",
          "NumPy",
          "Matplotlib",
          "Seaborn",
          "EDA",
          "Data Cleaning",
          "Data Wrangling",
          "Descriptive Statistics",
          "Probability",
          "Hypothesis Testing",
          "Correlation Analysis",
          "Regression Analysis",
          "Outlier Detection",
          "Feature Engineering",
        ],
        icon: BarChart3,
        accent: "from-sky-300/25 to-sky-300/0",
      },
      {
        title: "Dashboards & BI",
        items: [
          "Tableau",
          "Power BI",
          "Excel",
          "KPI Design",
          "Dashboard Design",
          "Data Storytelling",
          "Interactive Filters",
          "Drill-Down Analysis",
        ],
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
      {
        title: "Database & Data Modeling",
        items: [
          "MySQL",
          "PostgreSQL",
          "Relational Modeling",
          "Schema Design",
          "ERD / EERD",
          "Normalization (1NF–3NF)",
          "Constraints & Keys",
          "Indexing Concepts",
          "Query Optimization Basics",
          "DFD Diagrams",
        ],
        icon: Database,
        accent: "from-emerald-400/25 to-emerald-400/0",
      },
      {
        title: "Database Design Tools",
        items: [
          "Lucidchart",
          "Microsoft Visio",
          "draw.io (diagrams.net)",
          "MySQL Workbench",
          "pgAdmin",
        ],
        icon: Workflow,
        accent: "from-sky-300/25 to-sky-300/0",
      },
      {
        title: "Microsoft & Power Platform",
        items: [
          "Word",
          "PowerPoint",
          "Outlook",
          "Teams",
          "OneNote",
          "SharePoint",
          "Power Automate",
          "Power Apps",
          "Power Query",
          "Power Pivot",
        ],
        icon: FileSpreadsheet,
        accent: "from-purple-400/25 to-purple-400/0",
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
        meta:
          "Adding more publications, conference submissions, and technical write-ups soon.",
        mentor: null,
        tags: [
          { t: "AI", c: "border border-white/10 bg-black/20 text-white/80" },
          {
            t: "Analytics",
            c: "border border-white/10 bg-black/20 text-white/80",
          },
          {
            t: "Research",
            c: "border border-white/10 bg-black/20 text-white/80",
          },
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
            animate={
              prefersReducedMotion ? undefined : { x: [0, 18, 0], y: [0, 10, 0] }
            }
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-sky-300/15 blur-[90px]"
            animate={
              prefersReducedMotion
                ? undefined
                : { x: [0, -18, 0], y: [0, -10, 0] }
            }
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
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.05 },
            },
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
              I build dashboards, analytics pipelines, and decision-support systems
              that reduce manual work and drive faster, consistent outcomes.
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
                whileHover={
                  prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                View Projects
              </motion.a>

              <motion.a
                href="#dashboards"
                className="rounded-xl bg-sky-300 px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
                whileHover={
                  prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                Live Dashboards
              </motion.a>

              <motion.a
                href="#contact"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium transition hover:bg-white/10 backdrop-blur-md"
                whileHover={
                  prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }
                }
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
                  whileHover={
                    prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }
                  }
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
                <h2 className="text-sm font-semibold text-white/90">
                  🧠 Decision Intelligence Preview
                </h2>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">
                  Demo
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <motion.div
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                >
                  <p className="text-xs text-white/60">Input</p>
                  <p className="mt-1 text-sm">
                    “Compliance delay increased this week”
                  </p>
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
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-white/80"
                      >
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
            Projects<span className="text-emerald-400">Created</span>
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Real-world analytics, machine learning, and decision-support work—built with a focus on impact and clarity.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const Icon = p.icon;
              const cs = caseStudies[p.title];

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

                  {p.extra ? (
                    <p className="relative mt-3 text-xs text-white/50">{p.extra}</p>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => {
                      if (!cs) return;
                      setCaseStudyModal(cs);
                    }}
                    className="relative mt-5 inline-block text-sm text-emerald-300 hover:underline"
                  >
                    View Case Study →
                  </button>

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

                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${r.pill.c}`}>
                      {r.pill.t}
                    </span>
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
                        onClick={() => {
                          if (!r.abstract) return;
                          setAbstractModal({
                            title: r.title,
                            abstract: r.abstract,
                            meta: r.meta,
                            mentor: r.mentor,
                            pdf: r.pdf,
                          });
                        }}
                        className="rounded-xl bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
                      >
                        Read Abstract →
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

                  {r.note ? (
                    <p className="relative mt-4 text-xs text-white/50">
                      To enable PDF: place file at <code>{r.note}</code>
                    </p>
                  ) : null}

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
              {
                k: "Current Focus",
                t: "Text-to-Decision Systems",
                d: "Turning unstructured text into actionable recommendations with guardrails.",
              },
              {
                k: "Next Demo",
                t: "Risk Signal Extraction",
                d: "Identify risks in logs/reports and summarize “what to do next”.",
              },
              {
                k: "Coming Soon",
                t: "Interactive Case Studies",
                d: "Clickable project breakdowns with metrics, visuals, and lessons learned.",
              },
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
                {
                  k: "Email",
                  v: "madhurgattani5@gmail.com",
                  d: "Click to send an email",
                  href: "mailto:madhurgattani5@gmail.com",
                },
                {
                  k: "LinkedIn",
                  v: "linkedin.com/in/madhurgattani",
                  d: "Open profile",
                  href: "https://www.linkedin.com/in/madhurgattani",
                  ext: true,
                },
                {
                  k: "GitHub",
                  v: "github.com/Madhur0203",
                  d: "View repositories",
                  href: "https://github.com/Madhur0203",
                  ext: true,
                },
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
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                Download Resume
              </motion.a>
            </div>

            <p className="mt-6 text-xs text-white/50">
            </p>
          </motion.div>
        </section>
      </Reveal>

      {/* ================= ABSTRACT POPUP MODAL (✅ removed bottom Close button) ================= */}
      <AnimatePresence>
        {abstractModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAbstractModal(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl"
              initial={
                prefersReducedMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }
              }
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }
              }
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* header */}
              <div className="flex items-start justify-between gap-3 border-b border-white/10 bg-black/20 p-5">
                <div>
                  <h3 className="text-lg font-semibold leading-snug">
                    {abstractModal.title}
                  </h3>
                  {abstractModal.meta ? (
                    <p className="mt-1 text-sm text-white/60">{abstractModal.meta}</p>
                  ) : null}
                  {abstractModal.mentor ? (
                    <p className="mt-1 text-sm text-white/60">
                      Mentor:{" "}
                      <span className="text-white/80">{abstractModal.mentor}</span>
                    </p>
                  ) : null}
                </div>

                <button
                  onClick={() => setAbstractModal(null)}
                  className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* body */}
              <div className="max-h-[70vh] overflow-y-auto p-5">
                <p className="text-xs text-white/60">Abstract</p>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  {abstractModal.abstract}
                </p>

                {/* actions (no Close button now) */}
                <div className="mt-5 flex items-center gap-3">
                  {abstractModal.pdf ? (
                    <a
                      href={abstractModal.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                    >
                      Open PDF →
                    </a>
                  ) : null}

                  <p className="ml-auto text-xs text-white/40">
                    Tip: press <span className="text-white/60">ESC</span> to close
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CASE STUDY POPUP MODAL (same style as abstract) ================= */}
      <AnimatePresence>
        {caseStudyModal && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCaseStudyModal(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl"
              initial={
                prefersReducedMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }
              }
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }
              }
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* header */}
              <div className="flex items-start justify-between gap-3 border-b border-white/10 bg-black/20 p-5">
                <div>
                  <h3 className="text-lg font-semibold leading-snug">
                    {caseStudyModal.title}
                  </h3>
                  {caseStudyModal.subtitle ? (
                    <p className="mt-1 text-sm text-white/60">{caseStudyModal.subtitle}</p>
                  ) : null}
                </div>

                <button
                  onClick={() => setCaseStudyModal(null)}
                  className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* body */}
              <div className="max-h-[72vh] overflow-y-auto p-5">
                {/* quick chips */}
                {caseStudyModal.stack?.length ? (
                  <div className="mb-4">
                    <p className="text-xs text-white/60">Tech Stack</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {caseStudyModal.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-white/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* sections */}
                <div className="space-y-4">
                  {caseStudyModal.sections.map((sec) => (
                    <div
                      key={sec.h}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <p className="text-sm font-semibold text-white/90">
                        {sec.h}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">
                        {sec.p}
                      </p>
                    </div>
                  ))}
                </div>

                {/* impact */}
                {caseStudyModal.impact?.length ? (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-semibold text-white/90">Impact</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                      {caseStudyModal.impact.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-5 flex items-center">
                  <p className="ml-auto text-xs text-white/40">
                    Tip: press <span className="text-white/60">ESC</span> to close
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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