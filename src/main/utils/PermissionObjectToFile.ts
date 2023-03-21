import { writeFile } from 'fs/promises';
import { PermissionObject } from './Interfaces';

export default function permissionObjectToFile(
  writePath: string,
  permissionObject: PermissionObject
) {
  writeFile(writePath, JSON.stringify(permissionObject), { encoding: 'utf-8' });
}
