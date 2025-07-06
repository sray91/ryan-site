import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Add authentication here if needed
        // For now, we'll allow uploads but could add user authentication
        
        // Parse the client payload to get file info
        const payload = clientPayload ? JSON.parse(clientPayload) : {};
        const fileType = payload.fileType || '';
        const fileSize = payload.fileSize || 0;
        
        // Validate file type
        if (fileType === 'pdf' && !pathname.toLowerCase().endsWith('.pdf')) {
          throw new Error('Invalid file type. PDF files only.');
        }
        
        // Set file size limits (much higher for client uploads)
        const maxSize = fileType === 'pdf' ? 100 * 1024 * 1024 : 20 * 1024 * 1024; // 100MB for PDFs, 20MB for images
        if (fileSize > maxSize) {
          const maxSizeMB = Math.round(maxSize / (1024 * 1024));
          throw new Error(`File too large. Maximum size is ${maxSizeMB}MB.`);
        }
        
        // Configure allowed content types and return token
        const allowedContentTypes = fileType === 'pdf' 
          ? ['application/pdf']
          : ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        
        return {
          allowedContentTypes,
          tokenPayload: JSON.stringify({
            fileType,
            fileSize,
            uploadedAt: new Date().toISOString()
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Handle upload completion
        console.log('Client upload completed:', blob.url);
        
        // Could add database logging here if needed
        // const { fileType, fileSize } = JSON.parse(tokenPayload);
        // await db.logUpload({ url: blob.url, fileType, fileSize });
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Client upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 400 }
    );
  }
} 