/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_BASEPATH: process.env.BACKEND_BASEPATH,
    }
}

module.exports = nextConfig
