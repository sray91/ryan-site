import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';
import ReviewFormClient from './ReviewFormClient';

const solutionForReviewQuery = groq`*[_type == "solution" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  tagline,
  "logo": logo.asset->url
}`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const solution = await client.fetch(solutionForReviewQuery, { slug });

  if (!solution) {
    return { title: 'Solution Not Found' };
  }

  return {
    title: `Review ${solution.name} | The Bench`,
    description: `Share your experience with ${solution.name}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ReviewPage({ params }) {
  const { slug } = await params;
  const solution = await client.fetch(solutionForReviewQuery, { slug });

  if (!solution) {
    notFound();
  }

  return <ReviewFormClient solution={solution} />;
}
