import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { starterStackBySlugQuery, starterStackSlugsQuery } from '@/sanity/lib/queries';
import StarterStackDetailClient from './StarterStackDetailClient';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch(starterStackSlugsQuery);
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const stack = await client.fetch(starterStackBySlugQuery, { slug });

  if (!stack) {
    return {
      title: 'Stack Not Found',
    };
  }

  return {
    title: `${stack.name} | Starter Stacks | The Bench | Ryan Cahalane`,
    description: stack.whoItsFor,
  };
}

async function getStack(slug) {
  const stack = await client.fetch(starterStackBySlugQuery, { slug });
  return stack;
}

export default async function StarterStackDetailPage({ params }) {
  const { slug } = await params;
  const stack = await getStack(slug);

  if (!stack) {
    notFound();
  }

  return <StarterStackDetailClient stack={stack} />;
}
