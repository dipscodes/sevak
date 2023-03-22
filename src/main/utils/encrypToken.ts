import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

async function encrypt(permission: string): Promise<Array<string>> {
  const algorithm: string = 'aes-256-cbc';
  const initVector = process.env.INIT_VECTOR as string;
  const securitykey: Buffer = crypto.randomBytes(32);

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(securitykey),
    Buffer.from(initVector, 'hex')
  );
  let encryptedData = cipher.update(permission, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  // eslint-disable-next-line no-console
  // console.log([securitykey.toString('hex'), encryptedData]);\
  const passKey = securitykey.toString('hex');

  return [passKey, encryptedData];
}

export default encrypt;
