import { readFileSync } from 'fs';
import { PermissionObject } from './Interfaces';

export default function checkedListToJson(
  checkedList: string[]
): PermissionObject {
  const permissionTemplate: string = readFileSync(
    `${__dirname}/template.json`,
    {
      encoding: 'utf-8',
    }
  );
  const permissionObject = JSON.parse(permissionTemplate);
  if (!checkedList) {
    return permissionObject;
  }
  checkedList.forEach((value) => {
    const key = value.split('-')[0];
    const subKey = value.split('-')[1];
    permissionObject[key][subKey] = true;
  });

  return permissionObject;
}
