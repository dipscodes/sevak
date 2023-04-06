/* eslint-disable no-console */
import { dialog } from 'electron';
import Store from 'electron-store';
import { readFile } from 'fs/promises';
import checkedListToJson from './utils/CheckedListToJson';
import { PermissionObject } from './utils/Interfaces';
import permissionObjectToFile from './utils/PermissionObjectToFile';
import tokenTemlate from './utils/tokenTemplate.json';
import Encrypt from './utils/Encrypt';
import Decrypt from './utils/Decrypt';

async function handleFileOpen(): Promise<string> {
  const { canceled, filePath } = await dialog.showSaveDialog({
    properties: [
      'showHiddenFiles',
      'createDirectory',
      'showOverwriteConfirmation',
    ],
  });
  if (canceled) {
    return 'No file was selected';
  }
  if (!filePath) return '';

  return filePath;
}

async function handleGetFilePath(): Promise<string> {
  // eslint-disable-next-line no-unused-vars
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile', 'showHiddenFiles'],
  });

  filePaths.push('');
  // eslint-disable-next-line no-console
  // console.log(`filepath: ${filePaths[0]}`);

  return filePaths[0];
}

async function handleExportEncryptedTokenFileFromPermissionString(
  writePath: string,
  checkedList: string[],
  tokenName: string,
  masterPassword: string
) {
  const store = new Store();
  const encryptedPassword = store.get(`password.${tokenName}`);
  const decryptedPassword = await Decrypt.decryptNormalPassword(
    encryptedPassword as string,
    masterPassword
  );
  const encryptedPermissionString = store.get(`permission.${tokenName}`);
  const decryptedPermissionString = await Decrypt.decryptPermissionString(
    encryptedPermissionString as string,
    decryptedPassword
  );

  const rawTokenKey: string = JSON.parse(decryptedPermissionString).token;
  const permissionObject: PermissionObject = checkedListToJson(
    checkedList,
    rawTokenKey as string
  );
  const passKey: string = await permissionObjectToFile(
    writePath,
    permissionObject
  );
  console.log(writePath, rawTokenKey);
  return passKey;
}

async function handleSetRawToken(
  name: string,
  key: string,
  masterPassword: string
): Promise<void> {
  const store = new Store();
  const template = tokenTemlate;

  template.token = key;
  template.name = name;
  template.is_raw_token = true;

  const encryptedTokenString: string[] = await Encrypt.encryptPermissionString(
    JSON.stringify(template)
  );

  const encryptedPassword: string = await Encrypt.encryptNormalPassword(
    encryptedTokenString[0], // passKey
    masterPassword
  );

  store.set(`permission.${name}`, encryptedTokenString[1]);
  store.set(`password.${name}`, encryptedPassword);
}

async function handleSetFileToken(
  file: string,
  password: string,
  masterPassword: string,
  name?: string
): Promise<void> {
  console.log(file, password, masterPassword, name ?? 'no name came');
  const store = new Store();
  const fileContent: string = await readFile(file, { encoding: 'utf-8' });
  let decryptedPermissionString: string = await Decrypt.decryptPermissionString(
    fileContent,
    password
  );
  const permission = JSON.parse(decryptedPermissionString);

  if (name !== undefined) {
    permission.name = name;
  }

  decryptedPermissionString = JSON.stringify(permission);
  const encryptedPermissionString: string[] =
    await Encrypt.encryptPermissionString(decryptedPermissionString);

  const encryptedPassword: string = await Encrypt.encryptNormalPassword(
    encryptedPermissionString[0],
    masterPassword
  );

  store.set(`permission.${permission.name}`, encryptedPermissionString[1]);
  store.set(`password.${permission.name}`, encryptedPassword);
}

function handleGetAllTokenNames(): string[] {
  const store = new Store();
  const tokens: object = store.get('permission') as object;
  if (typeof tokens === 'object') {
    return Object.keys(tokens);
  }

  return [''];
}

export {
  handleFileOpen,
  handleExportEncryptedTokenFileFromPermissionString,
  handleSetRawToken,
  handleSetFileToken,
  handleGetFilePath,
  handleGetAllTokenNames,
};
