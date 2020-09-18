const { ipcRenderer } = require("electron");

const btnGetPdf = document.getElementById('btn-get-pdf');
const txtPdfUrl = document.getElementById('txt-pdf-url');

btnGetPdf.addEventListener("click", () => {
  const url = txtPdfUrl.value;
  ipcRenderer.invoke('get-url', url);
  
});
