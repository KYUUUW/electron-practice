import { ipcRenderer } from 'electron';

ipcRenderer.invoke('perform-action')