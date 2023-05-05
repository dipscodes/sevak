/* eslint-disable no-console */
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
    checkedList: string[],
    tokenName: string,
    permissionObject: string,
    masterPassword: string
  ) {
    return ipcRenderer.invoke('exportEncryptedTokenFileFromPermissionString', [
      writePath,
      checkedList,
      tokenName,
      permissionObject,
      masterPassword,
    ]);
  },
  setRawToken(name: string, key: string, masterPassword: string) {
    ipcRenderer.invoke('setRawToken', [name, key, masterPassword]);
  },
  setFileToken(
    file: string,
    passKey: string,
    masterPassword: string,
    name?: string
  ) {
    ipcRenderer.invoke('setFileToken', [file, passKey, masterPassword, name]);
  },
  getFilePath() {
    return ipcRenderer.invoke('dialog:getFilePath');
  },
  getListOfAllTokens() {
    return ipcRenderer.invoke('getListOfAllTokenNames');
  },
  getListOfAllRawTokens(masterPassword) {
    return ipcRenderer.invoke('getListOfAllRawTokens', [masterPassword]);
  },
  getTokenPermission(name: string, masterPassword: string) {
    return ipcRenderer.invoke('getTokenPermission', [name, masterPassword]);
  },
  deleteExistingToken(name: string) {
    ipcRenderer.invoke('deleteExistingToken', [name]);
  },
  getTokenSpecificCheckboxNode(
    tokenName: string,
    masterPassword: string
  ): Promise<Array<object>> {
    return ipcRenderer.invoke('getTokenSpecificCheckboxNode', [
      tokenName,
      masterPassword,
    ]);
  },
  getListOfDropletsFromDO(
    tokenName: string,
    masterPassword: string
  ): Promise<Array<object>> {
    return ipcRenderer.invoke('getListOfDropletsFromDO', [
      tokenName,
      masterPassword,
    ]);
  },
  powerOnDroplet(
    tokenName: string,
    dropletID: string,
    masterPassword: string
  ): Promise<Array<object>> {
    return ipcRenderer.invoke('powerOnDroplet', [
      tokenName,
      dropletID,
      masterPassword,
    ]);
  },
  powerOffDroplet(
    tokenName: string,
    dropletID: string,
    masterPassword: string
  ): Promise<Array<object>> {
    return ipcRenderer.invoke('powerOffDroplet', [
      tokenName,
      dropletID,
      masterPassword,
    ]);
  },
  rebootDroplet(
    tokenName: string,
    dropletID: string,
    masterPassword: string
  ): Promise<Array<object>> {
    return ipcRenderer.invoke('rebootDroplet', [
      tokenName,
      dropletID,
      masterPassword,
    ]);
  },
  getDropletInfo(
    tokenName: string,
    dropletID: string,
    masterPassword: string
  ): Promise<Array<object>> {
    return ipcRenderer.invoke('getDropletInfo', [
      tokenName,
      dropletID,
      masterPassword,
    ]);
  },
  getListOfAccesibleDropletIDs(
    tokenName: string,
    masterPassword: string
  ): Promise<Array<string>> {
    return ipcRenderer.invoke('getListOfAccesibleDropletIDs', [
      tokenName,
      masterPassword,
    ]);
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
