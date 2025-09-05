import Header from "../components/Header";

export const metadata = {
  title: "Resources - Ryan Cahalane",
  description: "Expert insights and resources for private equity, startups, and operations",
};

export default function Products() {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Resources
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed" style={{ color: '#a1a1a6' }}>
            Expert insights and resources for private equity, startups, and operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Private Equity */}
          <div className="backdrop-blur-md border border-white/20 rounded-xl p-6 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
               style={{
                 background: 'rgba(58, 58, 60, 0.6)',
                 backdropFilter: 'blur(20px)',
                 WebkitBackdropFilter: 'blur(20px)'
               }}>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                   style={{ background: 'rgba(0, 122, 255, 0.2)' }}>
                <svg className="w-6 h-6" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Private Equity</h3>
              <p className="text-sm mb-4" style={{ color: '#a1a1a6' }}>
                Strategic insights and resources for private equity investors in manufacturing and industrial sectors. From due diligence to value creation strategies.
              </p>
            </div>
            <div className="flex justify-end">
              <a
                href="/private-equity"
                className="text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 text-sm hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                  boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)'
                }}
              >
                Explore Resources
              </a>
            </div>
          </div>

          {/* Startups */}
          <div className="backdrop-blur-md border border-white/20 rounded-xl p-6 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
               style={{
                 background: 'rgba(58, 58, 60, 0.6)',
                 backdropFilter: 'blur(20px)',
                 WebkitBackdropFilter: 'blur(20px)'
               }}>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                   style={{ background: 'rgba(0, 122, 255, 0.2)' }}>
                <svg className="w-6 h-6" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Startups</h3>
              <p className="text-sm mb-4" style={{ color: '#a1a1a6' }}>
                Essential guidance for manufacturing startups. From product development and scaling strategies to securing funding and building sustainable operations.
              </p>
            </div>
            <div className="flex justify-end">
              <a
                href="/startups"
                className="text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 text-sm hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                  boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)'
                }}
              >
                Explore Resources
              </a>
            </div>
          </div>

          {/* Operations */}
          <div className="backdrop-blur-md border border-white/20 rounded-xl p-6 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
               style={{
                 background: 'rgba(58, 58, 60, 0.6)',
                 backdropFilter: 'blur(20px)',
                 WebkitBackdropFilter: 'blur(20px)'
               }}>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                   style={{ background: 'rgba(0, 122, 255, 0.2)' }}>
                <svg className="w-6 h-6" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Operations</h3>
              <p className="text-sm mb-4" style={{ color: '#a1a1a6' }}>
                Operational excellence frameworks and best practices for manufacturing companies. From lean manufacturing to digital transformation strategies.
              </p>
            </div>
            <div className="flex justify-end">
              <a
                href="/operations"
                className="text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 text-sm hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                  boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)'
                }}
              >
                Explore Resources
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center"
             style={{
               background: 'rgba(58, 58, 60, 0.6)',
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)'
             }}>
          <h2 className="text-2xl font-bold mb-4 text-white">Get Notified When Products Launch</h2>
          <p className="mb-6" style={{ color: '#a1a1a6' }}>
            Be the first to know when new resources become available. Newsletter subscribers get early access and exclusive discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/newsletter"
              className="text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)'
              }}
            >
              Join Newsletter
            </a>
            <a 
              href="/contact"
              className="border border-white/20 hover:border-white/30 hover:bg-white/5 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Custom Solutions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 