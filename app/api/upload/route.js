import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import formidable from 'formidable';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_CODE,
});

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    try {
      const cloudinaryResponse = await cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return NextResponse.error(new Error('no file '));
        }
        console.log("Cloudinary response:", result);
        // return NextResponse.error(new Error('no file '));
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      });

      // Pipe the Uint8Array to the Cloudinary upload stream
      const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' });
      stream.end(uint8Array);

    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return NextResponse.error(new Error('no file '));
    }
  } else {
    return NextResponse.error(new Error('no file '));
  }
}
