import { writeFile } from 'fs/promises';
import { PermissionObject } from './Interfaces';
import Encrypt from './Encrypt';

export default async function permissionObjectToFile(
  writePath: string,
  permissionObject: PermissionObject
): Promise<string> {
  const [passKey, encryptedData] = await Encrypt.encryptPermissionString(
    JSON.stringify(permissionObject)
  );
  writeFile(writePath, encryptedData, { encoding: 'utf-8' });
  return passKey;
}
