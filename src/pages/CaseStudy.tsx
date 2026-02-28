import { Link, useParams } from "react-router-dom";

type CaseStudyData = {
  title: string;
  subtitle: string;
  stack: string[];
  bullets: string[];
};

const CASE_STUDIES: Record<string, CaseStudyData> = {
  "trade-compliance": {
    title: "Trade Compliance KPI Dashboard",
    subtitle:
      "Interactive dashboards to monitor compliance KPIs, shipment risks, and delay trends for reporting and visibility.",
    stack: ["Tableau", "Analytics", "KPI Tracking"],
    bullets: [
      "Designed KPI views for compliance reporting and operational visibility.",
      "Built views to monitor trends, exceptions, and risk signals.",
      "Improved clarity and speed of decision-making with interactive visuals.",
    ],
  },
  "sign-language": {
    title: "Sign Language Interpreter (Real-Time)",
    subtitle:
      "A real-time, bidirectional system translating sign language into text and speech to improve accessibility.",
    stack: ["Python", "Computer Vision", "NLP", "Speech"],
    bullets: [
      "Enabled real-time translation between sign language, text, and speech.",
      "Focused on accessibility and communication for physically challenged individuals.",
      "Built for low-latency interaction and practical usage scenarios.",
    ],
  },
  nba: {
    title: "NBA 2024–2025 Data Scraping & Statistical Analysis",
    subtitle:
      "Python scraping pipeline + 18+ visualizations with optimized processing and reduced redundancy.",
    stack: ["Python", "Requests", "BeautifulSoup", "Matplotlib", "Seaborn"],
    bullets: [
      "Collaboratively built a Python scraper using Requests + BeautifulSoup to extract real-time NBA data.",
      "Generated 18+ visualizations using Matplotlib and Seaborn for trend analysis.",
      "Streamlined data processing with custom modules (sub-30s execution) and reduced redundancy by 80%+.",
    ],
  },
  "brain-tumor": {
    title: "Brain Tumor Classification using CNN",
    subtitle:
      "CNN-based MRI classification using TensorFlow/Keras with preprocessing, augmentation, and strong evaluation metrics.",
    stack: ["TensorFlow", "Keras", "CNN", "Transfer Learning"],
    bullets: [
      "Built CNN model for brain tumor detection from MRI scans.",
      "Applied preprocessing + augmentation to improve robustness.",
      "Optimized performance using dropout, batch normalization, and transfer learning.",
      "Evaluated with precision, recall, and real-time classification readiness.",
    ],
  },
  deloitte: {
    title: "Deloitte Australia – Data Analytics Simulation (Forage)",
    subtitle:
      "Analyzed real-world datasets to identify trends and create actionable visual reports with Tableau and Excel.",
    stack: ["Tableau", "Excel", "Analytics", "Reporting"],
    bullets: [
      "Completed Deloitte job simulation using real-world business datasets.",
      "Created actionable visual reports and Tableau dashboards.",
      "Built Excel models supporting decision-making (efficiency improved by ~30% in simulation).",
    ],
  },
};

export default function CaseStudy() {
  const { slug } = useParams();
  const data = slug ? CASE_STUDIES[slug] : undefined;

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold">Case Study Not Found</h1>
          <p className="mt-3 text-white/70">
            This case study doesn’t exist yet.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block text-emerald-300 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-emerald-300 hover:underline">
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-4xl font-semibold leading-tight">
          {data.title}
        </h1>
        <p className="mt-3 text-white/70">{data.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          {data.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-white/10 px-3 py-1 text-white/80"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Highlights</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-white/75">
            {data.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Links (Add later)</h2>
          <p className="mt-2 text-white/70">
            We’ll connect GitHub/demo links here when you’re ready.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="#"
              className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
            >
              GitHub
            </a>
            <a
              href="#"
              className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
            >
              Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
