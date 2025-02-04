const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],

  // ✅ 해시 제거
  filenameHashing: false,

  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",  // Next.js 실행 도메인
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type"
    },
    port: 8080,  // Vue 개발 서버 포트 (기본값: 8080)
    allowedHosts: "all",  // 모든 도메인에서 접속 허용
  },

  // ✅ Webpack 설정 추가
  configureWebpack: {
    resolve: {
      fallback: {
        "os": require.resolve("os-browserify/browser") // os 모듈을 브라우저용으로 대체
      }
    }
  }
});
