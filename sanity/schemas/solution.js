import { defineType, defineField } from 'sanity';

// Tag options matching existing solutions.json structure
const processFocusOptions = [
  { title: 'Discrete Manufacturing', value: 'discrete-manufacturing' },
  { title: 'Process Manufacturing', value: 'process-manufacturing' },
  { title: 'Packaging', value: 'packaging' },
  { title: 'Maintenance & Reliability', value: 'maintenance-reliability' },
  { title: 'Quality / Compliance', value: 'quality-compliance' },
  { title: 'Planning & Scheduling', value: 'planning-scheduling' },
  { title: 'Energy / Utilities', value: 'energy-utilities' },
  { title: 'Warehouse / Intralogistics', value: 'warehouse-intralogistics' },
  { title: 'Safety / Training', value: 'safety-training' },
];

const techCategoryOptions = [
  { title: 'Connectivity / IIoT', value: 'connectivity-iiot' },
  { title: 'SCADA / HMI', value: 'scada-hmi' },
  { title: 'MES', value: 'mes' },
  { title: 'Historian / Data Platform', value: 'historian-data-platform' },
  { title: 'CMMS / EAM', value: 'cmms-eam' },
  { title: 'APS / Scheduling', value: 'aps-scheduling' },
  { title: 'QMS', value: 'qms' },
  { title: 'Vision / Inspection', value: 'vision-inspection' },
  { title: 'AI / Analytics', value: 'ai-analytics' },
  { title: 'Digital Work / SOPs', value: 'digital-work-sops' },
  { title: 'Cybersecurity (OT)', value: 'cybersecurity-ot' },
  { title: 'Integration / Middleware', value: 'integration-middleware' },
];

const fundingTypeOptions = [
  { title: 'Bootstrap / Independent', value: 'bootstrap-independent' },
  { title: 'Venture-Backed', value: 'venture-backed' },
  { title: 'Corporate-Backed', value: 'corporate-backed' },
  { title: 'Private Equity-Backed', value: 'pe-backed' },
  { title: 'Open Source / Community-Led', value: 'open-source' },
];

const valuesLensOptions = [
  { title: 'Punches Above Weight', value: 'punches-above-weight' },
  { title: 'Operator-Led', value: 'operator-led' },
  { title: 'Fair Pricing / Transparent', value: 'fair-pricing' },
  { title: 'Open Integration Posture', value: 'open-integration' },
  { title: "Doesn't Hostage Your Data", value: 'no-data-hostage' },
  { title: 'Proven in Ugly Plants', value: 'proven-ugly-plants' },
];

export default defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
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
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short one-liner describing the solution',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Brief overview of what the company/solution does',
    }),
    defineField({
      name: 'whyILikeIt',
      title: "Why I Like It",
      type: 'text',
      rows: 4,
      description: "Ryan's personal take on this solution",
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // Tags
    defineField({
      name: 'processFocus',
      title: 'Process Focus',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: processFocusOptions,
        layout: 'tags',
      },
    }),
    defineField({
      name: 'techCategory',
      title: 'Tech Category',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: techCategoryOptions,
        layout: 'tags',
      },
    }),
    defineField({
      name: 'fundingType',
      title: 'Funding Type',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: fundingTypeOptions,
        layout: 'tags',
      },
    }),
    defineField({
      name: 'valuesLens',
      title: 'Values Lens',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: valuesLensOptions,
        layout: 'tags',
      },
    }),
    // Ryan's Score
    defineField({
      name: 'ryanRating',
      title: "Ryan's Rating",
      type: 'number',
      description: 'Rating from 1-5 (supports half points like 4.5)',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'ryanComment',
      title: "Ryan's Comment",
      type: 'text',
      rows: 2,
      description: 'Brief comment on the rating',
    }),
    defineField({
      name: 'dateAdded',
      title: 'Date Added',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'commonPairings',
      title: 'Commonly Paired With',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'solution' }],
        },
      ],
      description: 'Solutions that are commonly used together with this one',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'logo',
    },
  },
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: "Ryan's Rating",
      name: 'ryanRatingDesc',
      by: [{ field: 'ryanRating', direction: 'desc' }],
    },
    {
      title: 'Date Added',
      name: 'dateAddedDesc',
      by: [{ field: 'dateAdded', direction: 'desc' }],
    },
  ],
});
