import { client } from '@/sanity/lib/client';
import { starterStacksQuery } from '@/sanity/lib/queries';
import StarterStacksClient from './StarterStacksClient';

export const revalidate = 60;

export const metadata = {
  title: 'Starter Stacks | The Bench | Ryan Cahalane',
  description: 'Pre-configured technology combinations for common manufacturing scenarios. Curated stacks that work together out of the box.',
};

async function getStarterStacks() {
  const stacks = await client.fetch(starterStacksQuery);
  return stacks;
}

export default async function StarterStacksPage() {
  const stacks = await getStarterStacks();

  return <StarterStacksClient stacks={stacks} />;
}
