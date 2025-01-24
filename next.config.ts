import { NextConfig } from 'next';
import { VueLoaderPlugin } from 'vue-loader';

const nextConfig: NextConfig = {
  experimental: {
    turbo: false, // Turbo 비활성화
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        search: '',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'example.com', // 추가된 이미지 호스트
        search: '',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        compilerOptions: {
          whitespace: 'condense',
        },
      },
    });

    // Vue 플러그인 추가
    config.plugins.push(new VueLoaderPlugin());

    // Webpack alias 설정 추가
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      vue$: 'vue/dist/vue.esm.js', // Vue.js 2를 위한 설정
    };

    return config;
  },
};

export default nextConfig;
