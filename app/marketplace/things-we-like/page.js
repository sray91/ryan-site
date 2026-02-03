import { client } from '@/sanity/lib/client';
import { thingsWeLikeQuery } from '@/sanity/lib/queries';
import ThingsWeLikeClient from './ThingsWeLikeClient';

export const revalidate = 60;

export const metadata = {
  title: 'Things We Like | The Bench | Ryan Cahalane',
  description: 'Off-topic favorites and cool tools for the field. Not everything has to be software.',
};

async function getThingsWeLike() {
  const items = await client.fetch(thingsWeLikeQuery);
  return items;
}

export default async function ThingsWeLikePage() {
  const items = await getThingsWeLike();

  return <ThingsWeLikeClient items={items} />;
}
