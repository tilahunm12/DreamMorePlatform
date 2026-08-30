/** @type {import('next').NextConfig} */
const nextConfig = {
  // የጋራ ፓኬጆችን ማካተት
  transpilePackages: ['@dream-more/shared'],
  reactStrictMode: true,
  // ከውጭ ምንጭ (External URLs) የሚመጡ ፎቶዎችን ለመፍቀድ የተደረገ ቅንብር
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
