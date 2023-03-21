import { writeFile } from 'fs/promises';
import { readFileSync } from 'fs';

function checkedListToJson(checkedList) {
  const permissionTemplate = readFileSync('./template.json', {
    encoding: 'utf-8',
  });
  const permissionObject = JSON.parse(permissionTemplate);
  if (!checkedList) {
    return permissionObject;
  }
  checkedList.forEach((value) => {
    const key = value.split('-')[0];
    const subKey = value.split('-')[1];
    console.log(key, subKey);
    permissionObject[key][subKey] = true;
  });

  return permissionObject;
}

function permissionObjectToFile(writePath, permissionObject) {
  // eslint-disable-next-line no-param-reassign
  writePath = '/home/dips/Documents/test.json';
  writeFile(writePath, JSON.stringify(permissionObject), { encoding: 'utf-8' });
}

async function handleExportEncryptedTokenFileFromPermissionString(
  writePath,
  checkedList
) {
  const permissionObject = checkedListToJson(checkedList);
  permissionObjectToFile(writePath, permissionObject);
}

const clist = ['droplet_action-power_on', 'droplet_action-power_off'];

handleExportEncryptedTokenFileFromPermissionString(
  '/home/dips/Documents/test.json',
  clist
);
