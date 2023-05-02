import Store from 'electron-store';
import Decrypt from './Decrypt';

async function getDecryptedPermissionObject(
  tokenName: string,
  masterPassword: string
): Promise<object> {
  const store = new Store();
  const encryptedPassword = store.get(`password.${tokenName}`);
  const encryptedPermissionString = store.get(`permission.${tokenName}`);

  const decryptedPassword = await Decrypt.decryptNormalPassword(
    encryptedPassword as string,
    masterPassword
  );
  const decryptedPermissionString = await Decrypt.decryptPermissionString(
    encryptedPermissionString as string,
    decryptedPassword
  );
  const decryptedPermissionStringInJSON = JSON.parse(decryptedPermissionString);
  return decryptedPermissionStringInJSON;
}

export default getDecryptedPermissionObject;
