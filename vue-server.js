const express = require("express");
const path = require("path");

const app = express();
const PORT = 5173;

// Vue.js 2 정적 파일을 서빙
const vuePath = path.join(__dirname, "src/vue");
app.use(express.static(vuePath));

// `http://localhost:5173` 접속 시 `index.html`을 반환
app.get("/", (req, res) => {
  res.sendFile(path.join(vuePath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Vue.js 2 서버 실행 중: http://localhost:${PORT}`);
});
