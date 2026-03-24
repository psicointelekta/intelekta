import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

/**
 * POST /api/admin/upload
 * Process image upload to Vercel Blob (Permanent Storage)
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const password = formData.get('password') as string | null

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    console.log(`Starting upload for file: ${file.name}, size: ${file.size} bytes`)

    // Upload to Vercel Blob
    const blob = await put(`news/${Date.now()}-${file.name}`, file, {
      access: 'public',
    })
    
    console.log(`Upload successful: ${blob.url}`)

    return NextResponse.json({ 
      success: true, 
      url: blob.url 
    })
  } catch (error: any) {
    console.error('Upload Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
