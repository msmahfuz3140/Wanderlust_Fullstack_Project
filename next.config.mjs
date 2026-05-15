/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      // https://unsplash.com/s/photos/destination
      {
        protocol: "https",
        hostname: "www.vojujyribal.com.au",
      }
    ],
  },
};

export default nextConfig;
