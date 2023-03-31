/* eslint-disable no-console */
import { dialog } from 'electron';
import Store from 'electron-store';
import { readFile } from 'fs/promises';
import checkedListToJson from './utils/CheckedListToJson';
import { PermissionObject } from './utils/Interfaces';
import permissionObjectToFile from './utils/PermissionObjectToFile';
import tokenTemlate from './utils/tokenTemplate.json';
import encrypt from './utils/encrypToken';
import decrypt from './utils/decryptToken';

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
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile', 'showHiddenFiles'],
  });

  filePaths.push('');
  // eslint-disable-next-line no-console
  // console.log(`filepath: ${filePaths[0]}`);

  if (canceled) {
    return 'No file was selected';
  }

  return filePaths[0];
}

async function handleExportEncryptedTokenFileFromPermissionString(
  writePath: string,
  checkedList: string[]
) {
  const permissionObject: PermissionObject = checkedListToJson(checkedList);
  const passKey: string = await permissionObjectToFile(
    writePath,
    permissionObject
  );
  return passKey;
}

async function handleSetRawToken(
  name: string,
  key: string,
  passKey: string,
  masterPassword: string
): Promise<void> {
  const store = new Store();
  const template = tokenTemlate;

  template.token = key;
  template.name = name;
  template.is_raw_token = true;

  const encryptedTokenString: string[] = await encrypt(
    JSON.stringify(template),
    passKey
  );

  const encryptedPassword: string[] = await encrypt(
    encryptedTokenString[0],
    masterPassword
  );

  store.set(`permission.${name}`, encryptedTokenString[1]);
  store.set(`password.${name}`, encryptedPassword[1]);
}

async function handleSetFileToken(
  file: string,
  password: string,
  masterPassword: string,
  name?: string
): Promise<void> {
  const store = new Store();
  const fileContent: string = await readFile(file, { encoding: 'utf-8' });
  let decryptedPermissionString: string = await decrypt(fileContent, password);
  const permission = JSON.parse(decryptedPermissionString);

  if (name !== undefined) {
    permission.name = name;
  }

  decryptedPermissionString = JSON.stringify(permission);
  const encryptedPermissionString: string[] = await encrypt(
    decryptedPermissionString,
    password
  );

  const encryptedPassword: string[] = await encrypt(password, masterPassword);

  store.set(`permission.${permission.name}`, encryptedPermissionString[1]);
  store.set(`password.${permission.name}`, encryptedPassword[1]);
}

function handleGetAllPermissionNames(): any[] {
  const store = new Store();
  const permissions: object | unknown = store.get('permission');
  if (typeof permissions === 'object') {
    const listOfPermissions: any[] = [];
    Object.keys(permissions as Object).forEach((value) => {
      listOfPermissions.push(value);
    });
    // console.log(listOfPermissions);
    return Object.keys(permissions as Object);
  }

  return [];
}

export {
  handleFileOpen,
  handleExportEncryptedTokenFileFromPermissionString,
  handleSetRawToken,
  handleSetFileToken,
  handleGetFilePath,
  handleGetAllPermissionNames,
};
