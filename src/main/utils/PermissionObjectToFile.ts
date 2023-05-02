import { writeFile } from 'fs/promises';
import Encrypt from './Encrypt';

export default async function permissionObjectToFile(
  writePath: string,
  permissionObject: object
): Promise<string> {
  const [passKey, encryptedData] = await Encrypt.encryptPermissionString(
    JSON.stringify(permissionObject)
  );
  // console.log(`back end : ${JSON.stringify(permissionObject)}`);
  writeFile(writePath, encryptedData, { encoding: 'utf-8' });
  return passKey;
}
