// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['html.pixelfit.agency'], // Add the hostname here
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
