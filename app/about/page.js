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
        background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)'
      }}
    >
      
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
            
            {/* LinkedIn Link */}
            <div className="flex justify-center lg:justify-start">
              <a 
                href="https://linkedin.com/in/ryancahalane" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Professional Profile */}
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 sm:p-8 mb-8"
             style={{ 
               background: 'rgba(58, 58, 60, 0.6)',
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)'
             }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-orange-400">Professional Profile</h2>
          <p className="text-white/80 leading-relaxed">
            Global executive with a proven record of driving growth, operational scale, and digital transformation across complex industrial and technology enterprises. Trusted by Fortune 500 companies to lead strategic initiatives, modernize operations, and deliver consistent shareholder value. Expert in P&L leadership, product strategy, partnership development, and executing growth agendas.
          </p>
        </div>

        {/* Education and Technical Expertise - Smaller boxes on same row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Education */}
          <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6"
               style={{ 
                 background: 'rgba(58, 58, 60, 0.6)',
                 backdropFilter: 'blur(20px)',
                 WebkitBackdropFilter: 'blur(20px)'
               }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-400">Education</h2>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold">M.S., Systems Engineering & Engineering Management</span>
                  <p className="text-white/60 text-sm">Case Western Reserve University</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold">B.S., Electrical Engineering</span>
                  <p className="text-white/60 text-sm">Purdue University</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Technical Expertise & Patents */}
          <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6"
               style={{ 
                 background: 'rgba(58, 58, 60, 0.6)',
                 backdropFilter: 'blur(20px)',
                 WebkitBackdropFilter: 'blur(20px)'
               }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-400">Technical Expertise & Patents</h2>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">Holds multiple patents in industrial data analytics, AR, and cloud systems</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">Fluent in manufacturing operations systems (MES, SCADA, HMI, PLC)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">Broad experience in systems architecture and application across industrial verticals</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">Expertise: Startup Growth & Scale, Technology Due Diligence, Business Development, Strategic Planning</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Key Achievements and Recent Engagement Highlights - Larger boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Achievements */}
          <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 sm:p-8"
               style={{ 
                 background: 'rgba(58, 58, 60, 0.6)',
                 backdropFilter: 'blur(20px)',
                 WebkitBackdropFilter: 'blur(20px)'
               }}>
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

          {/* Recent Engagement Highlights */}
          <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 sm:p-8"
               style={{ 
                 background: 'rgba(58, 58, 60, 0.6)',
                 backdropFilter: 'blur(20px)',
                 WebkitBackdropFilter: 'blur(20px)'
               }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-400">Recent Engagement Highlights</h2>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Supported a $1B PE firm in identifying, evaluating, and integrating investments in the industrial OT technology space — providing market insight, sourcing, due diligence, and integration support.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Advised multiple regional systems integrators on strategic growth, operational scaling, and ownership transition — including facilitating introductions to potential investors and buyers.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Guided a cohort of international technology startups through U.S. market entry via the JETRO program — refining messaging, go-to-market strategy, and partnerships to create immediate commercial traction.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Led advisory and operational engagements for manufacturers pursuing performance improvement, digital transformation, and market expansion.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Board Leadership */}
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 sm:p-8 mt-8"
             style={{ 
               background: 'rgba(58, 58, 60, 0.6)',
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)'
             }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-400">Board Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-orange-400/20 p-3 rounded-full w-fit mx-auto mb-2">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Executive-in-Residence</h3>
              <p className="text-white/70 text-sm">Industry 4.0 Accelerator</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-400/20 p-3 rounded-full w-fit mx-auto mb-2">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Strategic Advisor</h3>
              <p className="text-white/70 text-sm">Bennit A.I.</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-400/20 p-3 rounded-full w-fit mx-auto mb-2">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Board Advisor</h3>
              <p className="text-white/70 text-sm">IIoT World</p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 sm:p-8 mt-8"
             style={{ 
               background: 'rgba(58, 58, 60, 0.6)',
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)'
             }}>
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

            {/* Director of Innovation */}
            <div className="border-l-4 border-orange-400 pl-6">
              <h3 className="text-xl font-bold mb-2">Director of Innovation</h3>
              <p className="text-orange-300 mb-3">QSIsoft / 2016–2017</p>
              <ul className="space-y-2 text-white/80">
                <li>• Responsible for driving innovation for the next generation of products and solutions.</li>
                <li>• Identified and incubated technology prototypes for then-new cloud applications.</li>
              </ul>
            </div>

            {/* Global Business Director */}
            <div className="border-l-4 border-orange-400 pl-6">
              <h3 className="text-xl font-bold mb-2">Global Business Director, Software</h3>
              <p className="text-orange-300 mb-3">Rockwell Automation / 2014–2016</p>
              <ul className="space-y-2 text-white/80">
                <li>• Product and general management of a $200MM+ software business with segment-leading growth and margins. Global P&L responsibility.</li>
                <li>• Led company-wide digital transformation to SaaS and high-value software.</li>
                <li>• Expanded ARR and improved operating margins by 18%.</li>
              </ul>
            </div>

            {/* Product General Manager */}
            <div className="border-l-4 border-orange-400 pl-6">
              <h3 className="text-xl font-bold mb-2">Product General Manager, Data Management</h3>
              <p className="text-orange-300 mb-3">GE Intelligent Platforms / 2008–2013</p>
              <ul className="space-y-2 text-white/80">
                <li>• Global product leadership of industrial data management and analytics software.</li>
                <li>• Turned around struggling product line, achieving portfolio-leading growth through transformative product development, rebrand and direct field engagement.</li>
              </ul>
            </div>

            {/* Senior Consultant */}
            <div className="border-l-4 border-orange-400 pl-6">
              <h3 className="text-xl font-bold mb-2">Senior Consultant</h3>
              <p className="text-orange-300 mb-3">Deloitte Consulting</p>
              <ul className="space-y-2 text-white/80">
                <li>• Supported senior management in major decision-making and change initiatives.</li>
                <li>• Led multiple engagements involving strategy development, planning, requirements gathering, system definition, prototyping, and design.</li>
              </ul>
            </div>

            {/* Earlier Career */}
            <div className="border-l-4 border-orange-400 pl-6">
              <h3 className="text-xl font-bold mb-2">Earlier Career</h3>
              <p className="text-orange-300 mb-3">Various Manufacturing & Technology Companies</p>
              <ul className="space-y-2 text-white/80">
                <li>• Activplant</li>
                <li>• Brock Solutions</li>
                <li>• Goodyear</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 