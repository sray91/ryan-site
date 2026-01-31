import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'reference',
      to: [{ type: 'solution' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating from 1-5',
      validation: (Rule) => Rule.required().min(1).max(5).precision(1),
    }),
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
      description: 'Optional headline for the review',
    }),
    defineField({
      name: 'content',
      title: 'Review Content',
      type: 'text',
      rows: 5,
      description: 'The review text',
    }),
    defineField({
      name: 'reviewerName',
      title: 'Reviewer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewerEmail',
      title: 'Reviewer Email',
      type: 'string',
      description: 'For verification (not displayed publicly)',
    }),
    defineField({
      name: 'reviewerRole',
      title: 'Reviewer Role',
      type: 'string',
      description: 'e.g., "Maintenance Manager", "Plant Engineer"',
    }),
    defineField({
      name: 'reviewerCompany',
      title: 'Reviewer Company',
      type: 'string',
      description: 'Optional - company where they used this solution',
    }),
    defineField({
      name: 'verifiedUser',
      title: 'Verified User',
      type: 'boolean',
      description: 'Has this reviewer been verified?',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'moderationNotes',
      title: 'Moderation Notes',
      type: 'text',
      rows: 2,
      description: 'Internal notes about this review (not public)',
    }),
  ],
  preview: {
    select: {
      title: 'reviewerName',
      solutionName: 'solution.name',
      rating: 'rating',
      status: 'status',
    },
    prepare({ title, solutionName, rating, status }) {
      const statusIcon = {
        pending: '🟡',
        approved: '✅',
        rejected: '❌',
      };
      return {
        title: `${title} - ${solutionName || 'Unknown'}`,
        subtitle: `${statusIcon[status] || '🟡'} ${status} | ⭐ ${rating}/5`,
      };
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Pending First',
      name: 'pendingFirst',
      by: [{ field: 'status', direction: 'asc' }],
    },
    {
      title: 'Rating (High to Low)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
});
