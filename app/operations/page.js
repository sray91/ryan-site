import Header from "../components/Header";

export const metadata = {
  title: "Operations Resources - Ryan Cahalane",
  description: "Operational excellence frameworks and best practices for manufacturing companies",
};

export default function Operations() {
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
            Operations Resources
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed" style={{ color: '#a1a1a6' }}>
            Operational excellence frameworks and best practices for manufacturing companies. From lean manufacturing to digital transformation.
          </p>
        </div>


        {/* Newsletter CTA */}
        <div className="mt-12 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center"
             style={{
               background: 'rgba(58, 58, 60, 0.6)',
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)'
             }}>
          <h2 className="text-2xl font-bold mb-4 text-white">Transform Your Operations</h2>
          <p className="mb-6" style={{ color: '#a1a1a6' }}>
            Stay updated with the latest operational excellence strategies and manufacturing best practices. Get insights delivered weekly.
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
              Operational Assessment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
