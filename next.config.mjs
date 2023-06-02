/** @type {import('next').NextConfig} */

const nextConfig = {
    publicRuntimeConfig: {
        apiUrl: ''
    },
  experimental: {
    appDir: true,
  },
  async rewrites() {
    const ret = [
      {
        source: "/api/proxy/:path*",
        destination: "https://api.openai.com/:path*",
      },
      {
        source: "/api/:path*",
        destination: `https://open.gouguoyin.cn/:path*`,
      }
    ];
    // const apiUrl = process.env.API_URL;
    // console.log('apiUrl==>', apiUrl);
return ret
    // console.log(11111);
    // if (apiUrl) {
    //   console.log("[Next] using api url ", apiUrl);
    //   ret.push({
    //     source: "/api/:path*",
    //     destination: `${apiUrl}/:path*`,
    //   });
    // }

    // return {
    //   beforeFiles: ret,
    // };
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  output: "standalone",
};

export default nextConfig;
