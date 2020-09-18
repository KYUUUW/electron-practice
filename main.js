const { app, BrowserWindow, ipcMain } = require('electron');
const childProcess = require('child_process');
const fs = require('fs');
const fetch = require('node-fetch').default;
const path = require('path');

function createWindow () {
  // 브라우저 창을 생성합니다.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // 개발자 도구를 엽니다.
  win.webContents.openDevTools()
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 이 파일에는 나머지 앱의 특정 주요 프로세스 코드를 포함시킬 수 있습니다. You can also put them in separate files and require them here.
ipcMain.handle('get-url', async (event, url) =>{
  const savePath = path.resolve(__dirname, 'test.pdf');
  console.log(savePath);

  const res = await fetch(url)
  const dest = fs.createWriteStream(savePath);
  res.body.pipe(dest);

  dest.on('finish', () => {
    childProcess.exec(
      path.resolve(__dirname, `SumatraPDF.exe ${savePath}`),
      (error, stdout, stderr) => {
        if(error) {
          console.log("Error");
          console.log(error);
        }
        else if (stdout) {
          console.log("stdout");
          console.log(stdout);
        }
        else if (stderr) {
          console.log("stderr error");
          console.log(stderr)
        }
      }
    );
  });
});