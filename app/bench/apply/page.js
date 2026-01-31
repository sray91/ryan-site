'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

export default function BenchApplyPage() {
  const [formData, setFormData] = useState({
    // Company basics
    companyName: '',
    website: '',
    contactName: '',
    contactEmail: '',
    contactRole: '',
    primaryCategory: '',
    
    // Who you're for
    bestFor: '',
    notFor: '',
    
    // References
    references: '',
    
    // Integration posture
    integrationApis: false,
    integrationDataExport: false,
    integrationCommonStacks: '',
    
    // Pricing posture
    pricingPosture: '',
    servicesRequired: '',
    
    // Security/compliance
    securityCompliance: '',
    
    // The pitch
    whyEthicalBench: '',
    additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div
        className="min-h-screen text-white flex flex-col"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)',
        }}
      >
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4">Application Received</h1>
            <p className="text-white/70 mb-8">
              Thanks for applying. I review every submission personally, which means it takes time. 
              If your solution looks like a fit, I'll reach out to learn more. No news isn't bad news—
              it just means I haven't gotten to it yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/bench"
                className="px-6 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition-all"
              >
                Back to Bench
              </Link>
              <Link
                href="/marketplace"
                className="px-6 py-3 rounded-lg transition-all"
                style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                }}
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)',
      }}
    >
      <Header />

      <main className="flex-1 px-4 sm:px-8 lg:px-16 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <Link
            href="/bench"
            className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Bench
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Apply to the Bench</h1>
          <p className="text-white/70 mb-8">
            I review every application personally. Be specific about what makes you different and 
            who you're actually good for. Honesty beats marketing speak.
          </p>

          {/* Important Note */}
          <div
            className="rounded-xl p-6 mb-8 border border-yellow-500/30"
            style={{
              background: 'rgba(234, 179, 8, 0.1)',
            }}
          >
            <h2 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              What I'm Looking For
            </h2>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Real production deployments (not just pilots)</li>
              <li>• Operator-first design philosophy</li>
              <li>• Transparent pricing and fair contracts</li>
              <li>• Open integration posture</li>
              <li>• Support teams that actually show up</li>
            </ul>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Basics */}
            <section>
              <h2 className="text-xl font-bold mb-4">Company Basics</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Website <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      required
                      placeholder="https://"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Contact Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Contact Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <input
                      type="text"
                      name="contactRole"
                      value={formData.contactRole}
                      onChange={handleChange}
                      placeholder="e.g., CEO, VP Sales"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Primary Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="primaryCategory"
                    value={formData.primaryCategory}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="" className="bg-gray-800">Select category...</option>
                    <option value="connectivity-iiot" className="bg-gray-800">Connectivity / IIoT</option>
                    <option value="scada-hmi" className="bg-gray-800">SCADA / HMI</option>
                    <option value="mes" className="bg-gray-800">MES</option>
                    <option value="historian-data" className="bg-gray-800">Historian / Data Platform</option>
                    <option value="cmms-eam" className="bg-gray-800">CMMS / EAM</option>
                    <option value="aps-scheduling" className="bg-gray-800">APS / Scheduling</option>
                    <option value="qms" className="bg-gray-800">QMS</option>
                    <option value="vision-inspection" className="bg-gray-800">Vision / Inspection</option>
                    <option value="ai-analytics" className="bg-gray-800">AI / Analytics</option>
                    <option value="digital-work-sops" className="bg-gray-800">Digital Work / SOPs</option>
                    <option value="cybersecurity-ot" className="bg-gray-800">Cybersecurity (OT)</option>
                    <option value="integration-middleware" className="bg-gray-800">Integration / Middleware</option>
                    <option value="other" className="bg-gray-800">Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Who You're For */}
            <section>
              <h2 className="text-xl font-bold mb-4">Who You're For</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Who are you best for? <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="bestFor"
                    value={formData.bestFor}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Industry verticals, company sizes, use cases, technical environments where you shine..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Who are you NOT for? <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="notFor"
                    value={formData.notFor}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Be honest. Where do you NOT fit? This honesty is what builds trust."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            </section>

            {/* References */}
            <section>
              <h2 className="text-xl font-bold mb-4">Customer References</h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  2-3 Customer References <span className="text-red-400">*</span>
                </label>
                <p className="text-white/50 text-sm mb-2">
                  Can be anonymized (e.g., "Automotive Tier 1, 3 plants, 18 months in production"). 
                  I may ask for direct contact later if things look promising.
                </p>
                <textarea
                  name="references"
                  value={formData.references}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Reference 1: [Industry], [Scale], [Duration], [Brief outcome]&#10;Reference 2: ...&#10;Reference 3: ..."
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </section>

            {/* Integration Posture */}
            <section>
              <h2 className="text-xl font-bold mb-4">Integration Posture</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="integrationApis"
                      checked={formData.integrationApis}
                      onChange={handleChange}
                      className="w-4 h-4 rounded bg-white/10 border-white/20"
                    />
                    <span className="text-sm">Open APIs</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="integrationDataExport"
                      checked={formData.integrationDataExport}
                      onChange={handleChange}
                      className="w-4 h-4 rounded bg-white/10 border-white/20"
                    />
                    <span className="text-sm">Full data export capability</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Common stacks you integrate with
                  </label>
                  <input
                    type="text"
                    name="integrationCommonStacks"
                    value={formData.integrationCommonStacks}
                    onChange={handleChange}
                    placeholder="e.g., SAP, Ignition, Rockwell, Siemens, OSIsoft, etc."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Pricing Posture */}
            <section>
              <h2 className="text-xl font-bold mb-4">Pricing & Services</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pricing Posture <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="pricingPosture"
                    value={formData.pricingPosture}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="" className="bg-gray-800">Select...</option>
                    <option value="transparent" className="bg-gray-800">Transparent (published pricing)</option>
                    <option value="predictable" className="bg-gray-800">Predictable (quote-based but straightforward)</option>
                    <option value="quote-only" className="bg-gray-800">Quote-only (enterprise sales)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Services Required?
                  </label>
                  <select
                    name="servicesRequired"
                    value={formData.servicesRequired}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="" className="bg-gray-800">Select...</option>
                    <option value="self-service" className="bg-gray-800">Self-service / minimal</option>
                    <option value="optional" className="bg-gray-800">Optional professional services</option>
                    <option value="recommended" className="bg-gray-800">Recommended for first deployment</option>
                    <option value="required" className="bg-gray-800">Required (implementation partner model)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Security/Compliance */}
            <section>
              <h2 className="text-xl font-bold mb-4">Security & Compliance</h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Relevant certifications or compliance
                </label>
                <input
                  type="text"
                  name="securityCompliance"
                  value={formData.securityCompliance}
                  onChange={handleChange}
                  placeholder="e.g., SOC 2, ISO 27001, FDA 21 CFR Part 11, IEC 62443, etc."
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                />
              </div>
            </section>

            {/* The Pitch */}
            <section>
              <h2 className="text-xl font-bold mb-4">The Pitch</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Why do you belong on an ethical bench? <span className="text-red-400">*</span>
                  </label>
                  <p className="text-white/50 text-sm mb-2">
                    Convince me you're an operator-first company. What do you do differently?
                  </p>
                  <textarea
                    name="whyEthicalBench"
                    value={formData.whyEthicalBench}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your values, how you treat customers, what you refuse to do, why operators trust you..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Anything else?</label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Anything I should know that doesn't fit above..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                  boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)',
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <p className="text-white/40 text-sm text-center mt-4">
                By submitting, you confirm the information is accurate. I may follow up for references.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
