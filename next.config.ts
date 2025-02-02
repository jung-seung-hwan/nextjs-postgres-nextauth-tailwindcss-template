export default {
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
};
