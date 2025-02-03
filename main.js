const { app, BrowserWindow } = require("electron");

let mainWindow = null;

app.whenReady().then(() => {
  // 중복 실행 방지
  if (mainWindow) return;

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Vue 또는 Next.js의 로컬 서버로 연결
  mainWindow.loadURL("http://localhost:3000"); // Next.js 실행 주소

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

// 모든 창이 닫혔을 때 앱 종료
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// macOS에서 Dock 아이콘을 클릭하면 창을 다시 열도록 설정
app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      }
    });

    mainWindow.loadURL("http://localhost:3000");
  }
});
