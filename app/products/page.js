import Header from "../components/Header";

export const metadata = {
  title: "Digital Products - Ryan Cahalane",
  description: "Resources and tools for your manufacturing journey",
};

export default function Products() {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Digital Products
          </h1>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
            Resources and tools to accelerate your manufacturing transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Coming Soon Products */}
          
          {/* Digital Transformation Playbook */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="mb-4">
              <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Transformation Playbook</h3>
              <p className="text-white/70 text-sm mb-4">
                A comprehensive guide to planning and executing digital transformation in manufacturing. Based on real-world experience from 20+ successful transformations.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-orange-400">$197</span>
                <span className="text-white/50 line-through ml-2">$297</span>
              </div>
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Manufacturing M&A Due Diligence Checklist */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="mb-4">
              <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">M&A Due Diligence Checklist</h3>
              <p className="text-white/70 text-sm mb-4">
                Essential checklist for evaluating manufacturing technology investments. Covers technical, operational, and strategic assessment criteria.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-orange-400">$97</span>
              </div>
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Operations Excellence Framework */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="mb-4">
              <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Operations Excellence Framework</h3>
              <p className="text-white/70 text-sm mb-4">
                Proven methodology for achieving operational excellence. Includes templates, assessments, and implementation roadmaps.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-orange-400">$147</span>
              </div>
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Industry 4.0 Readiness Assessment */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="mb-4">
              <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Industry 4.0 Readiness Assessment</h3>
              <p className="text-white/70 text-sm mb-4">
                Comprehensive assessment tool to evaluate your manufacturing readiness for Industry 4.0 transformation. Includes gap analysis and recommendations.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-orange-400">$67</span>
              </div>
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Manufacturing Leadership Masterclass */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="mb-4">
              <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Manufacturing Leadership Masterclass</h3>
              <p className="text-white/70 text-sm mb-4">
                Video series covering advanced leadership strategies for manufacturing executives. Learn from real case studies and proven methodologies.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-orange-400">$397</span>
              </div>
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Strategic Planning Templates */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="mb-4">
              <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Strategic Planning Templates</h3>
              <p className="text-white/70 text-sm mb-4">
                Ready-to-use strategic planning templates for manufacturing companies. Includes business model canvas, SWOT analysis, and roadmap planning tools.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-orange-400">$47</span>
              </div>
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Notified When Products Launch</h2>
          <p className="text-white/80 mb-6">
            Be the first to know when new resources become available. Newsletter subscribers get early access and exclusive discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/newsletter"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Join Newsletter
            </a>
            <a 
              href="/contact"
              className="border border-white/20 hover:bg-white/5 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Custom Solutions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 