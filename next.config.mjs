/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com',"platform-lookaside.fbsbx.com"],  // Add Cloudinary domain to the allowed domains
      },
};

export default nextConfig;
