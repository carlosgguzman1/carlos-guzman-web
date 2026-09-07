/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // plantilla-cliente es solo material para generar sitios de cliente;
  // vive fuera de app/ así que Next no la compila.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/sofia', destination: '/sofia-rx', permanent: true },
      { source: '/demo', destination: '/sofia-rx#demo', permanent: true },
      { source: '/agenda', destination: '/contacto', permanent: true },
      { source: '/webs', destination: '/paginas-web', permanent: true },
      { source: '/landing', destination: '/paginas-web', permanent: true },
    ];
  },
};

export default nextConfig;
