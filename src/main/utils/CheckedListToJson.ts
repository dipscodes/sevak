// import { readFileSync } from 'fs';
import { PermissionObject } from './Interfaces';
import template from './template.json';

export default function checkedListToJson(
  checkedList: string[]
): PermissionObject {
  const permissionObject = template;
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
