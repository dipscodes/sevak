import { writeFile } from 'fs/promises';
import { PermissionObject } from './Interfaces';
import encrypt from './encrypToken';

export default async function permissionObjectToFile(
  writePath: string,
  permissionObject: PermissionObject
): Promise<string> {
  const [passKey, encryptedData] = await encrypt(
    JSON.stringify(permissionObject)
  );
  writeFile(writePath, encryptedData, { encoding: 'utf-8' });
  return passKey;
}
