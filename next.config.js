/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY:
            process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY
    }
}

module.exports = nextConfig