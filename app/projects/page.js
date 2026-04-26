import Image from "next/image";
import Header from "../components/Header";

export const metadata = {
  title: "Projects - Ryan Cahalane",
  description: "Side projects, tools, and experiments Ryan Cahalane is working on.",
};

const projects = [
  {
    href: "https://storyforge.ryancahalane.com",
    title: "storyforge",
    description: "An AI-powered interactive storybook for kids. Choose your own adventure with custom characters, illustrated scenes, and puzzles woven into every chapter.",
    placeholder: { from: "#2d1b69", to: "#4c1d95", accent: "#f59e0b" },
    label: "📖",
  },
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
  {
    href: "https://dungeoncrawler.ryancahalane.com",
    title: "dungeon crawler",
    description: "A browser-based dungeon crawler game. Explore procedurally generated levels, battle enemies, and collect loot.",
    placeholder: { from: "#1a0a2e", to: "#4a1060", accent: "#c084fc" },
    label: "dungeon",
  },
  {
    href: "https://drive.google.com/file/d/1bC6RYlVYgxU6lBNJOG1soD0_Fzwk9bFz/view?usp=drivesdk",
    title: "beatrice and the big honey crisis",
    description: "A children's illustrated story about supply chain risk, early warning signals, and the scout bee nobody listened to — until it was too late.",
    placeholder: { from: "#2d1a00", to: "#7c4a00", accent: "#f59e0b" },
    label: "book",
  },
  {
    href: "/products/everymans-playbook",
    title: "the everyman's playbook",
    description: "A plain-language operations guide for leaders who want to fix their shop floor before it breaks.",
    screenshot: "/screenshots/everymans-playbook.png",
    label: "playbook",
  },
];

export default function Products() {
  return (
    <div
      className="min-h-screen text-white flex flex-col relative"
      style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)' }}
    >
      <Header />

      <div className="flex-1 px-4 sm:px-8 lg:px-16 py-12 relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">cool stuff I&apos;m building</h1>
          <p className="text-lg leading-relaxed" style={{ color: '#a1a1a6' }}>
            Side projects, tools, and experiments I&apos;m working on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <a
              key={project.href}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : "_self"}
              rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              style={{
                background: 'rgba(58, 58, 60, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Screenshot or placeholder preview */}
              <div className="relative w-full h-44 overflow-hidden border-b border-white/10">
                {project.screenshot ? (
                  <Image
                    src={project.screenshot}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${project.placeholder.from} 0%, ${project.placeholder.to} 100%)` }}
                  >
                    <span
                      className="text-4xl font-bold tracking-widest uppercase opacity-80"
                      style={{ color: project.placeholder.accent, fontFamily: 'Georgia, serif', letterSpacing: '0.15em' }}
                    >
                      {project.label || project.title}
                    </span>
                  </div>
                )}
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
