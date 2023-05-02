/* eslint-disable no-console */
import { dialog } from 'electron';
import Store from 'electron-store';
import { readFile } from 'fs/promises';
import checkedListToJson from './utils/CheckedListToJson';
import permissionObjectToFile from './utils/PermissionObjectToFile';
import tokenTemlate from './utils/tokenTemplate.json';
import Encrypt from './utils/Encrypt';
import Decrypt from './utils/Decrypt';
import dropletPermission from './utils/dropletPermissionTemplate.json';
import convertJSONtoCheckboxNodes from './utils/ConvertJSONtoCheckboxNodes';
import getDecryptedPermissionObject from './utils/GetDecryptedPermissionObject';

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

  return filePaths[0];
}

async function handleExportEncryptedTokenFileFromPermissionString(
  writePath: string,
  checkedList: string[],
  tokenName: string,
  permissionObject: string,
  masterPassword: string
) {
  const decryptedPermissionObject: object = await getDecryptedPermissionObject(
    tokenName,
    masterPassword
  );

  const rawTokenKey: string = (decryptedPermissionObject as any).token;
  const updatedPermissionObject: object = checkedListToJson(
    checkedList,
    JSON.parse(permissionObject)
  );

  Object.assign(updatedPermissionObject, { token: rawTokenKey });
  const passKey: string = await permissionObjectToFile(
    writePath,
    updatedPermissionObject
  );

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
    encryptedTokenString[0],
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

async function handleGetListOfAllTokenNames(): Promise<string[]> {
  const store = new Store();
  const tokens: object = store.get('permission') as object;
  if (typeof tokens === 'object') {
    return Object.keys(tokens);
  }

  return [''];
}

async function handleGetListOfAllRawTokenNames(
  masterPassword: string
): Promise<string[]> {
  const store = new Store();
  const tokens: object = store.get('permission') as object;
  if (typeof tokens === 'object') {
    let listOfAllRawTokenNames = await Promise.all(
      Object.keys(tokens).map(async (tokenName) => {
        const t = await (async () => {
          const temp = await getDecryptedPermissionObject(
            tokenName,
            masterPassword
          );
          const check: boolean = (temp as any).is_raw_token;
          return check ? tokenName : '';
        })();
        return t;
      })
    );
    listOfAllRawTokenNames = listOfAllRawTokenNames.filter(
      (value) => value !== ''
    );
    console.log(listOfAllRawTokenNames);
    return listOfAllRawTokenNames;
  }

  return [''];
}

async function handleGetTokenPermission(
  tokenName: string,
  masterPassword: string
): Promise<string> {
  const decyprtedPermissionStringInJSON: object =
    await getDecryptedPermissionObject(tokenName, masterPassword);
  delete (decyprtedPermissionStringInJSON as any).token;

  return JSON.stringify(decyprtedPermissionStringInJSON);
}

async function handleDeleteExistingToken(name: string): Promise<void> {
  const store = new Store();
  store.delete(`permission.${name}`);
  store.delete(`password.${name}`);
}

async function getListOfDroplets(apiKey: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer dop_v1_${apiKey}`,
  };
  const dropletNamesAndIds: object = {};
  const dropletsApiCall: string = `https://api.digitalocean.com/v2/droplets`;
  const apiResponse = await fetch(dropletsApiCall, {
    method: 'GET',
    headers,
  });
  const droplets: any = await apiResponse.json();

  droplets.droplets.forEach((dropletInfo: any) => {
    if (droplets.droplets.length > 0) {
      const name: string = dropletInfo.name as string;
      const id: string = dropletInfo.id as string;
      dropletNamesAndIds[`${id}~${name}`] = dropletPermission;
    }
  });

  return dropletNamesAndIds;
}

async function handleGetTokenSpecificCheckboxNode(
  tokenName: string,
  masterPassword: string
): Promise<Array<object>> {
  const decryptedPermissionStringInJSON = await getDecryptedPermissionObject(
    tokenName,
    masterPassword
  );

  console.log(decryptedPermissionStringInJSON);

  const apiKey = (decryptedPermissionStringInJSON as any).token;
  const listOfDropletNamesAndIds = await getListOfDroplets(apiKey);
  tokenTemlate.token = 'null';
  tokenTemlate.name = 'null';
  tokenTemlate.permissions.droplets = listOfDropletNamesAndIds;

  return convertJSONtoCheckboxNodes(tokenTemlate, '');
}

export {
  handleFileOpen,
  handleExportEncryptedTokenFileFromPermissionString,
  handleSetRawToken,
  handleSetFileToken,
  handleGetFilePath,
  handleGetListOfAllTokenNames,
  handleGetListOfAllRawTokenNames,
  handleGetTokenPermission,
  handleDeleteExistingToken,
  handleGetTokenSpecificCheckboxNode,
};
