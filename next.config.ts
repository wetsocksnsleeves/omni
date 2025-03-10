import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        serverActions: {
            bodySizeLimit: "5gb",
        },
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Externalize ffmpeg-related modules
            config.externals = [
                ...(config.externals || []),
                "fluent-ffmpeg",
                "ffmpeg-static",
            ];
        }
        return config;
    },
};

export default nextConfig;
