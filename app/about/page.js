import Image from "next/image";
import Header from "../components/Header";

export const metadata = {
  title: "About - Ryan Cahalane",
  description: "Global executive with a proven record of driving multimillion-dollar growth",
};

export default function About() {
  return (
    <div 
      className="min-h-screen text-white flex flex-col relative"
      style={{
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark blue transparent overlay */}
      <div className="absolute inset-0 bg-blue-900/90 z-0"></div>
      
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-8 lg:px-16 py-8 relative z-10 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-12">
          <div className="flex-shrink-0">
            <Image
              src="/ryan-pfp.png"
              alt="Ryan Cahalane"
              width={200}
              height={200}
              className="rounded-full shadow-2xl w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-cover"
              priority
            />
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Ryan Cahalane
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 leading-relaxed">
              Global executive with a proven record of driving multimillion-dollar growth
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (440) 749-3614</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:rdcahalane@gmail.com" className="hover:text-white transition-colors">
                  rdcahalane@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Cleveland, OH</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <a href="https://linkedin.com/in/ryancahalane" target="_blank" className="hover:text-white transition-colors">
                  linkedin.com/in/ryancahalane
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Profile */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-orange-400">Professional Profile</h2>
          <p className="text-white/80 leading-relaxed">
            Global executive with a proven record of driving growth, operational scale, and digital transformation across complex industrial and technology enterprises. Trusted by Fortune 500 companies to lead strategic initiatives, modernize operations, and deliver consistent shareholder value. Expert in P&L leadership, product strategy, partnership development, and executing growth agendas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Achievements */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-400">Key Achievements</h2>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Founded and grew Axiom Manufacturing Systems to $2MM in 24 months, with over $17MM in pipeline including multiple F500 customers, successful exit.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Scaled national operations for FZ Industrial Tech leading to a strategic acquisition; achieved 30%+ YoY growth during pandemic.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Architected &apos;Data Driven Advantage&apos; strategy at Colfax and led digital transformation across portfolio companies and multiple product and service lines.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Led a $200M software portfolio at Rockwell Automation, expanding GTM reach and global market share.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Mentored and developed numerous leaders now in executive positions from F500 to leading startups.</span>
              </li>
            </ul>
          </div>

          {/* Board Leadership */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-400">Board Leadership</h2>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Executive-in-Residence, Industry 4.0 Accelerator</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Strategic Advisor, Bennit A.I.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Board Advisor, IIoT World</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-orange-400">Experience</h2>
          
          <div className="space-y-8">
            {/* Managing Partner */}
            <div className="border-l-4 border-orange-400 pl-6">
              <h3 className="text-xl font-bold mb-2">Managing Partner</h3>
              <p className="text-orange-300 mb-3">Axiom Manufacturing Systems / Cleveland, OH / Present</p>
              <ul className="space-y-2 text-white/80">
                <li>• Founded a next-generation advisory and systems integration firm.</li>
                <li>• Grew business from inception to over $2MM (1MM ARR) and $17MM in pipeline within 24 months.</li>
                <li>• Positioned firm as premier mid-market digital transformation consultancy.</li>
                <li>• Led strategy for M&A preparedness that led to multiple offers and successful exit to Nasdaq-listed Magic Software.</li>
                <li>• Provided strategic advisory services to private equity firms and institutional investors on manufacturing technology investments, including target identification, technical due diligence, and post-acquisition operational improvement roadmaps across industrial automation and digital transformation initiatives.</li>
              </ul>
            </div>

            {/* President */}
            <div className="border-l-4 border-orange-400 pl-6">
              <h3 className="text-xl font-bold mb-2">President</h3>
              <p className="text-orange-300 mb-3">Feyen Zylstra Industrial Tech / 2019–2022</p>
              <ul className="space-y-2 text-white/80">
                <li>• Developed and executed the rapid transformation and growth of a digital manufacturing consulting and integration services firm.</li>
                <li>• Drove 30%+ annual growth during pandemic.</li>
                <li>• Expanded national footprint, and executed successful strategic sale.</li>
              </ul>
            </div>

            {/* Vice President */}
            <div className="border-l-4 border-orange-400 pl-6">
              <h3 className="text-xl font-bold mb-2">Vice President, Digital Growth</h3>
              <p className="text-orange-300 mb-3">Colfax Fluid Handling / 2017–2019</p>
              <ul className="space-y-2 text-white/80">
                <li>• Led enterprise-wide digital transformation.</li>
                <li>• Defined and launched multiple high-growth digital offerings with the potential to create disruptive competitive advantage.</li>
                <li>• Drove IT cost reduction and engineering efficiency across portfolio companies.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 