const { ipcRenderer } = require("electron");

const btnGetPath = document.getElementById('btn-get-path');
btnGetPath.addEventListener("click", () => {
  console.log(__dirname);
  console.log(process.cwd());
  ipcRenderer.invoke('get-path');
})
