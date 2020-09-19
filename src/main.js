const { app, BrowserWindow, ipcMain } = require("electron");
const childProcess = require("child_process");
const fs = require("fs");
const fetch = require("node-fetch").default;
const path = require("path");
const { timeStamp } = require("console");

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

  // 개발자 도구를 엽니다.
  win.webContents.openDevTools();
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

//이 파일에는 나머지 앱의 특정 주요 프로세스 코드를 포함시킬 수 있습니다. You can also put them in separate files and require them here.
ipcMain.handle("get-url", async (event, url) => {
  try {
    const saveDir = path.resolve(__dirname.replace('app.asar', 'app.asar.unpacked'), '../', 'tmp');
    const savePath = path.resolve(saveDir, `${Math.random().toString(36).substr(2)}.pdf`);

    const res = await fetch(url);
    const dest = fs.createWriteStream(savePath);
    res.body.pipe(dest);

    dest.on('finish', () => {
      childProcess.exec(
        `${path.resolve(__dirname.replace('app.asar', 'app.asar.unpacked'), "../bin/SumatraPDF.exe")} ${savePath}`,
        {},
        (error, stdout, stderr) => {
          logger(error);
          logger(stdout);
          logger(stderr);

          fs.unlinkSync(savePath);
        }
      );
    })
  } catch (err) {
    logger(err.message);
    logger(err.stack);
  }
});

ipcMain.handle("get-cur-path", (event, args) => {
  logger(__dirname);
});
