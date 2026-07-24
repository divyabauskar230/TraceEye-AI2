/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // <-- ही ओळ जोडली आहे (याने ४०४ एरर सॉल्व्ह होईल)

  allowedDevOrigins: [
    'http://192.168.43.10:3000',
    'http://localhost:3000',
    '192.168.43.10',
    'localhost',
  ],
};

export default nextConfig;