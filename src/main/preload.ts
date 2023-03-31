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
    return ipcRenderer.invoke('exportEncryptedTokenFileFromPermissionString', [
      writePath,
      checkedList,
    ]);
  },
  setRawToken(
    name: string,
    key: string,
    passKey: string,
    masterPassword: string
  ) {
    ipcRenderer.invoke('setRawToken', [name, key, passKey, masterPassword]);
  },
  setFileToken(
    file: string,
    passKey: string,
    masterPassword: string,
    name: string
  ) {
    ipcRenderer.invoke('setFileToken', [file, passKey, masterPassword, name]);
  },
  getFilePath() {
    return ipcRenderer.invoke('dialog:getFilePath');
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
