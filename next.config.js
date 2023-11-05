/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //     appDir: true,
  // },
  // images: {
  //     domains: [
  //         'avatars.githubusercontent.com'
  //     ]
  // }
  images: {
    domains: ["res.cloudinary.com", "avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
