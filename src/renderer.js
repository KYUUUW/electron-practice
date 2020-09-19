const { ipcRenderer } = require("electron");
const path = require('path');

const btnGetPath = document.getElementById('btn-get-path');
btnGetPath.addEventListener("click", () => {
  console.log(__dirname);
  console.log(process.cwd());
  console.log(process.execPath);
  console.log(path.resolve('./'));
  ipcRenderer.invoke('get-path');
})
