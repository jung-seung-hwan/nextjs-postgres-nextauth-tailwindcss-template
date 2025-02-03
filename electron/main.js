const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // 보안 설정 (Next.js는 일반적으로 nodeIntegration을 사용하지 않음)
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // 필요할 경우 추가
    },
  });

  // Next.js 서버를 로드
  mainWindow.loadURL("http://localhost:3000");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
