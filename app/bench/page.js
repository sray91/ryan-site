import { client } from '@/sanity/lib/client';
import { solutionsQuery } from '@/sanity/lib/queries';
import MarketplaceClient from './MarketplaceClient';

export const revalidate = 60; // Revalidate every 60 seconds

async function getSolutions() {
  const solutions = await client.fetch(solutionsQuery);
  return solutions;
}

export default async function MarketplacePage() {
  const solutions = await getSolutions();

  return <MarketplaceClient solutions={solutions} />;
}
