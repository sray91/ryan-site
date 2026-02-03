import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      solutionId,
      rating,
      title,
      content,
      reviewerName,
      reviewerEmail,
      reviewerRole,
      reviewerCompany,
    } = body;

    // Validate required fields
    if (!solutionId || !rating || !content || !reviewerName || !reviewerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: solutionId, rating, content, reviewerName, and reviewerEmail are required' },
        { status: 400 }
      );
    }

    // Validate rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(reviewerEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if the solution exists
    const solution = await client.fetch(
      `*[_type == "solution" && _id == $solutionId][0]{ _id, name }`,
      { solutionId }
    );

    if (!solution) {
      return NextResponse.json(
        { error: 'Solution not found' },
        { status: 404 }
      );
    }

    // Check if this email has already reviewed this solution
    const existingReview = await client.fetch(
      `*[_type == "review" && solution._ref == $solutionId && reviewerEmail == $email][0]{ _id }`,
      { solutionId, email: reviewerEmail }
    );

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already submitted a review for this solution' },
        { status: 409 }
      );
    }

    // Create the review document
    const review = await client.create({
      _type: 'review',
      solution: {
        _type: 'reference',
        _ref: solutionId,
      },
      rating: Number(rating),
      title: title || '',
      content,
      reviewerName,
      reviewerEmail,
      reviewerRole: reviewerRole || '',
      reviewerCompany: reviewerCompany || '',
      verifiedUser: false,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully. It will be visible after moderation.',
        reviewId: review._id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review. Please try again later.' },
      { status: 500 }
    );
  }
}
