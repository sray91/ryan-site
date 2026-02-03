import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { solutionBySlugQuery, solutionSlugsQuery } from '@/sanity/lib/queries';
import SolutionDetailClient from './SolutionDetailClient';

export const revalidate = 60;

// Generate static params for all solutions
export async function generateStaticParams() {
  const slugs = await client.fetch(solutionSlugsQuery);
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const solution = await client.fetch(solutionBySlugQuery, { slug });

  if (!solution) {
    return {
      title: 'Solution Not Found',
    };
  }

  return {
    title: `${solution.name} | The Bench`,
    description: solution.summary,
  };
}

async function getSolution(slug) {
  const solution = await client.fetch(solutionBySlugQuery, { slug });
  return solution;
}

export default async function SolutionDetailPage({ params }) {
  const { slug } = await params;
  const solution = await getSolution(slug);

  if (!solution) {
    notFound();
  }

  return <SolutionDetailClient solution={solution} />;
}
