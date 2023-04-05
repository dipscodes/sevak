import * as crypto from 'crypto';

function inflate(targetLength: number, password: string): string {
  const multiplier = Math.ceil(targetLength / password.length);
  return password.repeat(multiplier).substring(0, 32);
}

async function decrypt(
  permission: string,
  securitykey: string // this is the decrypted password always.
): Promise<string> {
  const algorithm: string = 'aes-256-cbc';
  const initVector: string = 'bd5fac96dd725e297f87bf255e3aadb0';
  const inflatedPassword = inflate(32, securitykey);
  // eslint-disable-next-line no-console
  console.log(inflatedPassword);

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(inflatedPassword),
    Buffer.from(initVector, 'hex')
  );
  let decryptedData = decipher.update(permission, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');

  return decryptedData;
}

export default decrypt;
