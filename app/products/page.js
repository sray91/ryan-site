import Image from "next/image";
import Header from "../components/Header";

export const metadata = {
  title: "Cool Stuff I'm Building - Ryan Cahalane",
  description: "Side projects, tools, and experiments Ryan Cahalane is working on.",
};

const projects = [
  {
    href: "https://portfolio.ryancahalane.com",
    title: "portfolio",
    description: "An AI tool for tracking, analyzing, and surfacing insights across investment portfolio companies.",
    screenshot: "/screenshots/portfolio.png",
  },
  {
    href: "https://ops-maturity.ryancahalane.com",
    title: "ops maturity tool",
    description: "A self-assessment tool that benchmarks where your manufacturing operation stands and tells you what to fix first.",
    screenshot: "/screenshots/ops-maturity.png",
  },
  {
    href: "https://genomesim.ryancahalane.com",
    title: "genome sim",
    description: "A browser-based simulation game where you evolve organisms, mutate genomes, and watch natural selection play out in real time.",
    screenshot: "/screenshots/genomesim.png",
  },
];

export default function Products() {
  return (
    <div
      className="min-h-screen text-white flex flex-col relative"
      style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)' }}
    >
      <Header />

      <div className="flex-1 px-4 sm:px-8 lg:px-16 py-12 relative z-10 max-w-5xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">cool stuff I&apos;m building</h1>
          <p className="text-lg leading-relaxed" style={{ color: '#a1a1a6' }}>
            Side projects, tools, and experiments I&apos;m working on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.href}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              style={{
                background: 'rgba(58, 58, 60, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Screenshot preview */}
              <div className="relative w-full h-44 overflow-hidden border-b border-white/10">
                <Image
                  src={project.screenshot}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <svg className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#a1a1a6' }}>
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
