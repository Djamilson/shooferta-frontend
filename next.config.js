/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY:
            process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY,
        NEXT_PUBLIC_LOCALHOST: process.env.NEXT_PUBLIC_LOCALHOST,
        NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
        NEXT_PUBLIC_WEBHOST: process.env.NEXT_PUBLIC_WEBHOST,
        NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    }
}

module.exports = nextConfig
