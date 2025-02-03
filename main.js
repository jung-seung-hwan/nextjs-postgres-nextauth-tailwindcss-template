const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let vueWindow;

// Electron 준비 시 실행
app.on('ready', () => {
  // Next.js 창 생성
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // contextIsolation을 false로 설정
      preload: path.join(__dirname, 'preload.js'), // Next.js용 preload 파일
    },
  });

  mainWindow.loadURL('http://localhost:3000'); // Next.js 개발 중
  // mainWindow.loadFile('out/index.html'); // Next.js 배포 시

  // Vue 창 생성
  vueWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'vue-app/preload.js'), // Vue 앱 preload 파일
    },
  });

  vueWindow.loadFile(path.join(__dirname, 'vue-app/dist/index.html')); // Vue 배포된 파일 로드
});

// 모든 창이 닫히면 앱 종료
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC 메시지 처리
ipcMain.on('message-from-vue', (event, data) => {
  console.log('Received from Vue:', data);
  event.reply('reply-to-vue', 'Message received!');
});
