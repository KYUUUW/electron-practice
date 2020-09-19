const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

const logger = (line) => {
  fs.appendFile("./path.log", line + "\n", () => {
    console.log(line);
  });
};

function createWindow() {
  // 브라우저 창을 생성합니다.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  const indexPath = path.resolve(__dirname, "./index.html");
  win.loadFile(indexPath);

  console.log('creating window');

  // 개발자 도구를 엽니다.
  win.webContents.openDevTools();
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

ipcMain.handle('get-path', () => {
  logger(`dirname: ${__dirname}`);
  logger(`cwd: ${process.cwd()}`);
});