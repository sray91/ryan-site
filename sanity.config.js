import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { table } from '@sanity/table';
import { schemaTypes } from './sanity/schemas';

// Custom structure for organizing content types
const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Blog section
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('author').title('Authors'),
              S.documentTypeListItem('category').title('Categories'),
            ])
        ),
      S.divider(),
      // Marketplace section
      S.listItem()
        .title('Marketplace')
        .child(
          S.list()
            .title('Marketplace')
            .items([
              S.documentTypeListItem('solution').title('Solutions'),
              S.listItem()
                .title('Reviews')
                .child(
                  S.list()
                    .title('Reviews')
                    .items([
                      S.listItem()
                        .title('Pending Reviews')
                        .child(
                          S.documentList()
                            .title('Pending Reviews')
                            .filter('_type == "review" && status == "pending"')
                        ),
                      S.listItem()
                        .title('Approved Reviews')
                        .child(
                          S.documentList()
                            .title('Approved Reviews')
                            .filter('_type == "review" && status == "approved"')
                        ),
                      S.listItem()
                        .title('All Reviews')
                        .child(S.documentTypeList('review').title('All Reviews')),
                    ])
                ),
            ])
        ),
    ]);

export default defineConfig({
  name: 'default',
  title: 'Ryan Site',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    table(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',

  apiVersion: '2024-01-01',
});
