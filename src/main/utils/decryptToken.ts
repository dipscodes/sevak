import * as crypto from 'crypto';

async function decrypt(
  permission: string,
  securitykey: string
): Promise<string> {
  const algorithm: string = 'aes-256-cbc';
  const initVector: string = 'bd5fac96dd725e297f87bf255e3aadb0';

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(securitykey, 'hex'),
    Buffer.from(initVector, 'hex')
  );
  let decryptedData = decipher.update(permission, 'utf-8', 'hex');
  decryptedData += decipher.final('hex');

  return decryptedData;
}

export default decrypt;
