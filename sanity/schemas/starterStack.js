import { defineType, defineField } from 'sanity';

const focusTagOptions = [
  { title: 'Brownfield', value: 'brownfield' },
  { title: 'Greenfield', value: 'greenfield' },
  { title: 'Mid-Market', value: 'mid-market' },
  { title: 'Enterprise', value: 'enterprise' },
  { title: 'Reliability-First', value: 'reliability-first' },
  { title: 'Data-First', value: 'data-first' },
  { title: 'PE Value Creation', value: 'pe-value-creation' },
  { title: 'Operator Enablement', value: 'operator-enablement' },
  { title: 'Visualization', value: 'visualization' },
  { title: 'Asset-Heavy', value: 'asset-heavy' },
];

export default defineType({
  name: 'starterStack',
  title: 'Starter Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Stack Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whoItsFor',
      title: "Who It's For",
      type: 'text',
      rows: 3,
      description: 'Describe the ideal user of this stack',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'problemItSolves',
      title: 'Problem It Solves',
      type: 'text',
      rows: 4,
      description: 'What pain points does this combination address?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whyThisComboWorks',
      title: 'Why This Combo Works',
      type: 'text',
      rows: 4,
      description: 'Explain the synergy between the solutions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notAFitIf',
      title: 'Not a Fit If...',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List scenarios where this stack is NOT appropriate',
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'solution',
              title: 'Solution',
              type: 'reference',
              to: [{ type: 'solution' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role in Stack',
              type: 'string',
              description: 'e.g., "Core Platform", "Data Orchestration", "Analytics"',
            },
          ],
          preview: {
            select: {
              title: 'solution.name',
              subtitle: 'role',
              media: 'solution.logo',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'relevantFocusTags',
      title: 'Relevant Focus Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: focusTagOptions,
        layout: 'tags',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'whoItsFor',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : '',
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
