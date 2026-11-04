/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // One canonical host: www.milarch.in -> milarch.in
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.milarch.in" }],
        destination: "https://milarch.in/:path*",
        permanent: true,
      },
      // URLs from the pre-2026 site, now sections of the one-page home
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/pharma", destination: "/#products", permanent: true },
      { source: "/pharma/products", destination: "/#products", permanent: true },
      { source: "/products", destination: "/#products", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
