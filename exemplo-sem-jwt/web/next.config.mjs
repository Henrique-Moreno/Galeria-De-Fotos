/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Permite qualquer hostname
                port: '', // Deixe vazio para permitir qualquer porta
                pathname: '**', // Permite qualquer caminho
            },
        ],
    },
};

export default nextConfig;
