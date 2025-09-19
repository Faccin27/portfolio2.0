/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // aceita qualquer host HTTPS
      },
      {
        protocol: 'http',
        hostname: '**', // se também quiser http
      },
    ],
  },
};

export default nextConfig;
