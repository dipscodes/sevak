import { dialog } from 'electron';
import checkedListToJson from './utils/CheckedListToJson';
import { PermissionObject } from './utils/Interfaces';
import permissionObjectToFile from './utils/PermissionObjectToFile';

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
  // eslint-disable-next-line no-console
  console.log(`pass key : ${passKey}`);
  return passKey;
}

export { handleFileOpen, handleExportEncryptedTokenFileFromPermissionString };
