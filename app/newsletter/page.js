import Header from "../components/Header";

export const metadata = {
  title: "Newsletter - Ryan Cahalane",
  description: "Join Ryan's weekly newsletter for manufacturing insights and updates",
};

export default function Newsletter() {
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
            Weekly Manufacturing Insights
          </h1>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
            Join thousands of manufacturing leaders getting actionable insights every week.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-orange-400 text-center">
              What You&apos;ll Get
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-orange-400/20 p-2 rounded-full flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Weekly Manufacturing Trends</h3>
                  <p className="text-white/70 text-sm">Stay ahead with the latest in Industry 4.0, automation, and digital transformation.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-400/20 p-2 rounded-full flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Operational Excellence Tips</h3>
                  <p className="text-white/70 text-sm">Practical strategies for improving efficiency, reducing costs, and driving growth.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-400/20 p-2 rounded-full flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Investment & M&A Insights</h3>
                  <p className="text-white/70 text-sm">Market analysis and opportunities in the manufacturing technology space.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-400/20 p-2 rounded-full flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Exclusive Content</h3>
                  <p className="text-white/70 text-sm">Behind-the-scenes insights from my consulting work and industry connections.</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Ready to Level Up?</h3>
              <p className="text-white/80 mb-6">
                Join the newsletter and get weekly insights delivered straight to your inbox.
              </p>
              
              {/* Beehiiv embed */}
              <div className="max-w-md mx-auto">
                <iframe 
                  src="https://embeds.beehiiv.com/6578c794-7b30-4330-aa9c-f2d57e32a0a0" 
                  data-test-id="beehiiv-embed" 
                  width="100%" 
                  height="320" 
                  frameBorder="0" 
                  scrolling="no" 
                  style={{
                    margin: 0, 
                    borderRadius: '4px',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-400">5k+</div>
                <div className="text-sm text-white/70">Subscribers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">Weekly</div>
                <div className="text-sm text-white/70">Delivery</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">100%</div>
                <div className="text-sm text-white/70">Free</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-8 bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-white/80 italic mb-4">
                  &quot;Ryan&apos;s insights have been game-changing for our operations. His newsletter is the first thing I read every week.&quot;
                </blockquote>
                <cite className="text-white/60 text-sm">
                  — Manufacturing Director, Fortune 500 Company
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 