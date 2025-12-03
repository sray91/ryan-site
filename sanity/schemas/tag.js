import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'tag',
  title: 'Tag',
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
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code (e.g., #3B82F6)',
      initialValue: '#3B82F6',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
      color: 'color',
    },
    prepare(selection) {
      const { title, subtitle, media, color } = selection;
      return {
        title,
        subtitle,
        media: media || (() => (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            backgroundColor: color || '#ccc' 
          }} />
        )),
      };
    },
  },
});

