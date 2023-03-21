// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  openFile() {
    return ipcRenderer.invoke('dialog:openFile');
  },
  exportEncryptedTokenFileFromPermissionString(
    writePath: string,
    checkedList: string[]
  ) {
    // const writePath = this.openFile(); // this opens a dialog and returns a path
    ipcRenderer.invoke('exportEncryptedTokenFileFromPermissionString', [
      writePath,
      checkedList,
    ]); // this is waiting for resoponse from main
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
