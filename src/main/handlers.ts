import { dialog } from 'electron';
import Store from 'electron-store';
import checkedListToJson from './utils/CheckedListToJson';
import { PermissionObject } from './utils/Interfaces';
import permissionObjectToFile from './utils/PermissionObjectToFile';
import tokenTemlate from './utils/tokenTemplate.json';
import encrypt from './utils/encrypToken';

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

  store.set(name, encryptedTokenString[1]);
  store.set(`password.${name}`, encryptedPassword[1]);
}

async function handleSetFileToken(
  file: string,
  passKey: string,
  masterPassword: string
): Promise<void> {
  const store = new Store();
  const template = tokenTemlate;
  template.is_raw_token = false;

  const encryptedTokenString: string[] = await encrypt(
    JSON.stringify(template),
    passKey
  );

  const encryptedPassword: string[] = await encrypt(
    encryptedTokenString[0],
    masterPassword
  );

  store.set(file, encryptedTokenString[1]);
  store.set(`password.${file}`, encryptedPassword[1]);
}

export {
  handleFileOpen,
  handleExportEncryptedTokenFileFromPermissionString,
  handleSetRawToken,
  handleSetFileToken,
};
