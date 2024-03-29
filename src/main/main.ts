/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import {
  handleExportEncryptedTokenFileFromPermissionString,
  handleFileOpen,
  handleSetRawToken,
  handleSetFileToken,
  handleGetFilePath,
  handleGetListOfAllTokenNames,
  handleGetListOfAllRawTokenNames,
  handleGetTokenPermission,
  handleDeleteExistingToken,
  handleGetTokenSpecificCheckboxNode,
  handleGetListOfDropletsFromDO,
  handlePowerOnDroplet,
  handlePowerOffDroplet,
  handleGetDropletInfo,
  handleGetListOfAccesibleDropletIDs,
  handleRebootDroplet,
} from './handlers';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  // require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    ipcMain.handle('dialog:getFilePath', handleGetFilePath);
    ipcMain.handle(
      'exportEncryptedTokenFileFromPermissionString',
      async (event, args) =>
        handleExportEncryptedTokenFileFromPermissionString(
          args[0],
          args[1],
          args[2],
          args[3],
          args[4]
        )
    );
    ipcMain.handle('setRawToken', async (event, args) =>
      handleSetRawToken(args[0], args[1], args[2])
    );
    ipcMain.handle('setFileToken', async (event, args) =>
      handleSetFileToken(args[0], args[1], args[2], args[3])
    );
    ipcMain.handle('getListOfAllTokenNames', handleGetListOfAllTokenNames);
    ipcMain.handle('getListOfAllRawTokens', async (event, args) =>
      handleGetListOfAllRawTokenNames(args[0])
    );
    ipcMain.handle('getTokenPermission', async (event, args) =>
      handleGetTokenPermission(args[0], args[1])
    );
    ipcMain.handle('deleteExistingToken', async (event, args) =>
      handleDeleteExistingToken(args[0])
    );
    ipcMain.handle('getTokenSpecificCheckboxNode', async (event, args) =>
      handleGetTokenSpecificCheckboxNode(args[0], args[1])
    );

    ipcMain.handle('getListOfDropletsFromDO', async (event, args) =>
      handleGetListOfDropletsFromDO(args[0], args[1])
    );

    ipcMain.handle('powerOnDroplet', async (event, args) =>
      handlePowerOnDroplet(args[0], args[1], args[2])
    );
    ipcMain.handle('powerOffDroplet', async (event, args) =>
      handlePowerOffDroplet(args[0], args[1], args[2])
    );
    ipcMain.handle('rebootDroplet', async (event, args) =>
      handleRebootDroplet(args[0], args[1], args[2])
    );

    ipcMain.handle('getDropletInfo', async (event, args) =>
      handleGetDropletInfo(args[0], args[1], args[2])
    );

    ipcMain.handle('getListOfAccesibleDropletIDs', async (event, args) =>
      handleGetListOfAccesibleDropletIDs(args[0], args[1])
    );

    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
