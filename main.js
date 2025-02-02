const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'), // 필요한 경우 preload 스크립트
    },
  });

  // Next.js 애플리케이션 로드
  mainWindow.loadURL('http://localhost:3000'); // 개발 중일 때
  // mainWindow.loadFile('out/index.html'); // 배포 후
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const createVueWindow = () => {
    const vueWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'vue-app/preload.js'), // Vue 앱의 preload 파일
      },
    });
  
    vueWindow.loadFile(path.join(__dirname, 'vue-app/dist/index.html'));
  };
  
  app.on('ready', () => {
    createVueWindow(); // Vue 창 생성
  });
  
const { ipcMain } = require('electron');

ipcMain.on('message-from-vue', (event, data) => {
  console.log('Received from Vue:', data);
  event.reply('reply-to-vue', 'Message received!');
});

const { ipcRenderer } = require('electron');

ipcRenderer.send('message-from-vue', 'Hello from Vue!');
ipcRenderer.on('reply-to-vue', (event, message) => {
  console.log(message);
});