const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
