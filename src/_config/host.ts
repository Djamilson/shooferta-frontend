export default {
    url:
        process.env.NEXT_PUBLIC_ENV === 'production'
            ? `https://${process.env.NEXT_PUBLIC_WEBHOST}`
            : `http://${process.env.NEXT_PUBLIC_LOCALHOST}:${process.env.NEXT_PUBLIC_PORT}`
}
