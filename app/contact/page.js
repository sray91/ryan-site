import Header from "../components/Header";

export const metadata = {
  title: "Contact - Ryan Cahalane",
  description: "Get in touch with Ryan Cahalane",
};

export default function Contact() {
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
      <div className="flex-1 px-4 sm:px-8 lg:px-16 py-8 relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Let&apos;s Chat!
          </h1>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
            Ready to unlock hidden value in your manufacturing operations? Let&apos;s discuss how we can help.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-orange-400">Schedule a Meeting</h2>
            
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="font-semibold mb-4 text-xl">Ready to Connect?</h3>
                <p className="text-white/70 mb-8 leading-relaxed">
                  Book a consultation to discuss your manufacturing challenges, explore partnership opportunities, 
                  or connect about investment discussions. Let&apos;s unlock the hidden value in your operations.
                </p>
                
                <a 
                  href="https://calendly.com/axiomsystemsio/1-on-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
                >
                  Schedule Your Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 