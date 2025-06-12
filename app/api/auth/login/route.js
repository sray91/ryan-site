import { NextResponse } from 'next/server';
import { signIn } from '../../../auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    const success = await signIn({ username, password });
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
} 