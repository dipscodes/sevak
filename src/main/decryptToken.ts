import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

async function decrypt(
  permission: string,
  securitykey: string
): Promise<string> {
  const algorithm: string = 'aes-256-cbc';
  const initVector = process.env.INIT_VECTOR as string;

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(securitykey, 'hex'),
    Buffer.from(initVector, 'hex')
  );
  let decryptedData = decipher.update(permission, 'utf-8', 'hex');
  decryptedData += decipher.final('hex');
  // eslint-disable-next-line no-console
  // console.log([securitykey.toString('hex'), encryptedData]);

  return decryptedData;
}

export default decrypt;
