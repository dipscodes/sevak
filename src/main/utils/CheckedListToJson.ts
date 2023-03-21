// import { readFileSync } from 'fs';
import { PermissionObject } from './Interfaces';

const permissionObject = {
  token: 'token',
  droplet_action: {
    power_on: false,
    power_off: false,
    reboot: false,
  },
};

export default function checkedListToJson(
  checkedList: string[]
): PermissionObject {
  // const permissionTemplate: string = readFileSync('main/utils/template.json', {
  //   encoding: 'utf-8',
  // });
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
