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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-orange-400">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-400/20 p-3 rounded-full">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-white/70">+1 (440) 749-3614</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-orange-400/20 p-3 rounded-full">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:rdcahalane@gmail.com" className="text-white/70 hover:text-white transition-colors">
                      rdcahalane@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-orange-400/20 p-3 rounded-full">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-white/70">Cleveland, OH</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-orange-400/20 p-3 rounded-full">
                    <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <a 
                      href="https://linkedin.com/in/ryancahalane" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      linkedin.com/in/ryancahalane
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form or Additional Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-orange-400">Ready to Connect?</h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">📞 Quick Call</h3>
                  <p className="text-white/70 text-sm">
                    Book a 15-minute discovery call to discuss your manufacturing challenges and see how we can help.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">💼 Consulting Inquiry</h3>
                  <p className="text-white/70 text-sm">
                    Need strategic advice for digital transformation or operational improvement? Let&apos;s explore partnership opportunities.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">🎯 PE/Investment Discussion</h3>
                  <p className="text-white/70 text-sm">
                    Interested in manufacturing technology investments or need due diligence support? I&apos;d love to connect.
                  </p>
                </div>

                <div className="pt-4">
                  <a 
                    href="mailto:rdcahalane@gmail.com?subject=Let's Connect - Manufacturing Discussion"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 