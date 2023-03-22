import * as crypto from 'crypto';

async function encrypt(permission: string): Promise<Array<string>> {
  const algorithm: string = 'aes-256-cbc';
  const initVector: string = 'bd5fac96dd725e297f87bf255e3aadb0';
  const securitykey: Buffer = crypto.randomBytes(32);

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(securitykey),
    Buffer.from(initVector, 'hex')
  );
  let encryptedData = cipher.update(permission, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  const passKey = securitykey.toString('hex');

  return [passKey, encryptedData];
}

export default encrypt;
