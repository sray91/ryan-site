'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReviewFormClient({ solution }) {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: '',
    reviewerName: '',
    reviewerEmail: '',
    reviewerRole: '',
    reviewerCompany: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    // Client-side validation
    if (formData.rating === 0) {
      setErrorMessage('Please select a rating');
      setIsSubmitting(false);
      return;
    }

    if (!formData.content.trim()) {
      setErrorMessage('Please share your experience');
      setIsSubmitting(false);
      return;
    }

    if (!formData.reviewerName.trim()) {
      setErrorMessage('Please enter your name');
      setIsSubmitting(false);
      return;
    }

    if (!formData.reviewerEmail.trim()) {
      setErrorMessage('Please enter your email');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solutionId: solution._id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to submit review');
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setFormData({
          rating: 0,
          title: '',
          content: '',
          reviewerName: '',
          reviewerEmail: '',
          reviewerRole: '',
          reviewerCompany: '',
        });
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)',
      }}
    >
      <main className="flex-1 px-4 sm:px-8 lg:px-16 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div
            className="rounded-xl p-8 mb-8 border border-white/10"
            style={{
              background: 'rgba(58, 58, 60, 0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {solution.logo ? (
                  <img
                    src={solution.logo}
                    alt={`${solution.name} logo`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white/50">
                    {solution.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Review {solution.name}</h1>
                {solution.tagline && (
                  <p className="text-white/60">{solution.tagline}</p>
                )}
              </div>
            </div>
            <p className="text-sm text-white/50">
              Share your experience to help others make informed decisions. Your review will be
              visible after moderation.
            </p>
          </div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-8 p-6 rounded-xl bg-green-500/20 border border-green-500/30">
              <h2 className="text-lg font-semibold text-green-400 mb-2">
                Thank you for your review!
              </h2>
              <p className="text-white/70 mb-4">
                Your review has been submitted and will be visible after moderation.
              </p>
              <Link
                href={`/bench/${solution.slug}`}
                className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to {solution.name}
              </Link>
            </div>
          )}

          {/* Review Form */}
          {submitStatus !== 'success' && (
            <form onSubmit={handleSubmit}>
              <div
                className="rounded-xl p-8 border border-white/10"
                style={{
                  background: 'rgba(58, 58, 60, 0.6)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Error Message */}
                {errorMessage && (
                  <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Overall Rating <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingClick(star)}
                          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                            formData.rating >= star
                              ? 'bg-yellow-400 text-gray-900'
                              : 'bg-white/10 hover:bg-white/20 text-white/70'
                          }`}
                        >
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Review Title (optional)
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Summarize your experience in a few words"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Review Content */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Experience <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="What did you use this solution for? What worked well? What could be improved?"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 resize-none transition-colors"
                    />
                  </div>

                  <hr className="border-white/10" />

                  {/* Reviewer Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="reviewerName"
                        value={formData.reviewerName}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="reviewerEmail"
                        value={formData.reviewerEmail}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      <p className="text-xs text-white/40 mt-1">Not displayed publicly</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Role (optional)</label>
                      <input
                        type="text"
                        name="reviewerRole"
                        value={formData.reviewerRole}
                        onChange={handleInputChange}
                        placeholder="e.g., Plant Manager, Engineer"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company (optional)</label>
                      <input
                        type="text"
                        name="reviewerCompany"
                        value={formData.reviewerCompany}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                      boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)',
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>

                  <p className="text-xs text-white/40 text-center">
                    Reviews are moderated before being published. One review per solution per email.
                  </p>
                </div>
              </div>
            </form>
          )}

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href={`/bench/${solution.slug}`}
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              ← Back to {solution.name}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
