import { defineType, defineField } from 'sanity';

const categoryTypeOptions = [
  { title: 'Off-Topic Favorite', value: 'off-topic-favorite' },
  { title: 'Cool Tool', value: 'cool-tool' },
];

const subCategoryOptions = [
  { title: 'Electrical', value: 'electrical' },
  { title: 'Networking', value: 'networking' },
  { title: 'Commissioning', value: 'commissioning' },
  { title: 'Maintenance', value: 'maintenance' },
  { title: 'Safety', value: 'safety' },
  { title: 'Lifestyle', value: 'lifestyle' },
];

export default defineType({
  name: 'thingsWeLike',
  title: 'Things We Like',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      name: 'oneLiner',
      title: 'One-Liner',
      type: 'string',
      description: 'Brief description of what this is',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'categoryType',
      title: 'Category Type',
      type: 'string',
      options: {
        list: categoryTypeOptions,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subCategory',
      title: 'Sub-Category',
      type: 'string',
      options: {
        list: subCategoryOptions,
      },
      description: 'For Cool Tools, specify the sub-category',
      hidden: ({ document }) => document?.categoryType !== 'cool-tool',
    }),
    defineField({
      name: 'whyRyanLikesIt',
      title: 'Why Ryan Likes It',
      type: 'text',
      rows: 4,
      description: "Ryan's personal take on why this is great",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
      description: 'Where to buy or learn more',
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
      subtitle: 'oneLiner',
      media: 'image',
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
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        { field: 'categoryType', direction: 'asc' },
        { field: 'subCategory', direction: 'asc' },
      ],
    },
  ],
});
