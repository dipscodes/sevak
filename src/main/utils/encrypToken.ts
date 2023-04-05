import * as crypto from 'crypto';

function inflate(targetLength: number, password?: string): Buffer | undefined {
  if (password === undefined) {
    return password;
  }
  const multiplier = Math.ceil(targetLength / password.length);
  return Buffer.from(password.repeat(multiplier).substring(0, 32), 'utf-8');
}

async function encrypt(
  genericString: string,
  password?: string // this password is decrypted always
): Promise<Array<string>> {
  const algorithm: string = 'aes-256-cbc';
  const initVector: string = 'bd5fac96dd725e297f87bf255e3aadb0';
  const securitykey: Buffer = crypto.randomBytes(32);
  const inflatedPassword = inflate(32, password);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(inflatedPassword ?? securitykey),
    Buffer.from(initVector, 'hex')
  );

  let encryptedData = cipher.update(genericString, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  const passKey = securitykey.toString('utf-8');

  return [!password ? passKey : password, encryptedData];
}

export default encrypt;
