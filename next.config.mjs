


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['html.pixelfit.agency','res.cloudinary.com','via.placeholder.com','example.com','i.ibb.co'],
   
  },
  transpilePackages: ['swiper'],
  experimental: {
    esmExternals: 'loose'
  },
 
  // Webpack Custom Configuration
  webpack: (config) => {
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false, // ESM modules fix
      },
    });
    return config;
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

// }

// module.exports = nextConfig
