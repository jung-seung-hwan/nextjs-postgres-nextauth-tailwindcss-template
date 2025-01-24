const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // 서버가 실행되지 않으면 에러 화면 표시
  mainWindow.loadURL('http://localhost:3000').catch((err) => {
    console.error('Failed to load URL:', err);
    mainWindow.loadFile('error.html'); // 에러 페이지 (옵션)
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
