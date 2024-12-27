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

export async function POST(req) {
  const form = formidable({ multiples: true }); // Updated to create a new instance
   const formData=await req.formData();
   console.log(formData);
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("error:",err);
        return reject(NextResponse.json({ error: 'Failed to parse the file' }, { status: 500 }));
      }

      try {
        // Upload image to Cloudinary
        const result = await cloudinary.v2.uploader.upload("saboo.jpg");
        
        // Prepare data to save in the database
        const metadata = {
          imageUrl: result.secure_url,
          public_id: result.public_id,
          ...fields, // Include other fields from the form
        };

        // Log metadata
        console.log(metadata);

        // Respond with the URL and any other necessary data
        resolve(NextResponse.json({ url: result.secure_url, metadata },{status:201}));
      } catch (err) {
        console.log("error in bottom:",err);
        reject(NextResponse.json({ error: 'Upload failed', details: err }, { status: 500 }));
      }
    });
  });
}