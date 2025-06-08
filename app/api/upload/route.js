import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');
    const type = data.get('type'); // 'image' or 'pdf'

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    let allowedTypes, maxSize, folderPrefix;

    if (type === 'pdf') {
      // PDF upload for LinkedIn carousel
      allowedTypes = ['application/pdf'];
      maxSize = 10 * 1024 * 1024; // 10MB max for PDFs
      folderPrefix = 'blog-carousels';
    } else {
      // Default image upload
      allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      maxSize = 5 * 1024 * 1024; // 5MB max for images
      folderPrefix = 'blog-images';
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      const expectedTypes = type === 'pdf' ? 'PDF files' : 'JPEG, PNG, GIF, and WebP images';
      return NextResponse.json({ 
        error: `Invalid file type. Only ${expectedTypes} are allowed.` 
      }, { status: 400 });
    }

    // Validate file size
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return NextResponse.json({ 
        error: `File too large. Maximum size is ${maxSizeMB}MB.` 
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${folderPrefix}/${timestamp}_${originalName}`;
    
    // Upload to Vercel Blob Storage
    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({ 
      success: true, 
      url: blob.url,
      filename: filename,
      type: type || 'image'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file' 
    }, { status: 500 });
  }
} 