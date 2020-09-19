const { ipcRenderer } = require("electron");

const btnGetPdf = document.getElementById('btn-get-pdf');
const txtPdfUrl = document.getElementById('txt-pdf-url');
btnGetPdf.addEventListener("click", () => {
  const url = txtPdfUrl.value;
  ipcRenderer.invoke('get-url', url);
});

const btnGetPath = document.getElementById('btn-get-path');
btnGetPath.addEventListener("click", () => {
  ipcRenderer.invoke('get-cur-path');
})
