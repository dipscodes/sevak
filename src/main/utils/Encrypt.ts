import * as crypto from 'crypto';

export default class Encrypt {
  /**
   * Takes input of permission string ({token: 'something', 'droplet_actions': {...}})
   * Encrypts the data and sends back(returns) a security key.
   * @param permissionString: normal string with no encryption applied.
   */
  static async encryptPermissionString(
    permissionString: string
  ): Promise<Array<string>> {
    const algorithm: string = 'aes-256-cbc';
    const initVector: string = 'bd5fac96dd725e297f87bf255e3aadb0';
    const securitykey: Buffer = crypto.randomBytes(32);
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(securitykey),
      Buffer.from(initVector, 'hex')
    );

    let encryptedPermissionString = cipher.update(
      permissionString,
      'utf-8',
      'hex'
    );
    encryptedPermissionString += cipher.final('hex');
    const passKey = securitykey.toString('hex');

    return [passKey, encryptedPermissionString];
  }

  /**
   * static function that takes normal password (decrypted string) as input and encrypts with
   * master password (decrypted string).
   * @param normalPassword: normal string (decrypted)
   * @param masterPassword: normal string (decrypted)
   */
  static async encryptNormalPassword(
    normalPassword: string,
    masterPassword: string
  ): Promise<string> {
    const algorithm: string = 'aes-256-cbc';
    const initVector: string = 'bd5fac96dd725e297f87bf255e3aadb0';
    const inflatedPassword: string = this.#inflate(32, masterPassword);
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(inflatedPassword),
      Buffer.from(initVector, 'hex')
    );

    let encryptedPassword = cipher.update(normalPassword, 'utf-8', 'hex');
    encryptedPassword += cipher.final('hex');

    return encryptedPassword;
  }

  static #inflate(targetLength: number, password: string): string {
    const multiplier = Math.ceil(targetLength / password.length);
    return password.repeat(multiplier).substring(0, 32);
  }
}
