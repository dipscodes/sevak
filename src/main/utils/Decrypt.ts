import * as crypto from 'crypto';

export default class Decrypt {
  /**
   * Function that takes input of encrypted permission string (hex encoded)
   * @param encryptedPermissionString: encrypted hex string
   * @param normalPassword: decrypted (hex) string. (NOT ENCRYPTED.)
   */
  static async decryptPermissionString(
    encryptedPermissionString: string,
    normalPassword: string
  ): Promise<string> {
    const algorithm: string = 'aes-256-cbc';
    const initVector: string = 'bd5fac96dd725e297f87bf255e3aadb0';

    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(normalPassword, 'hex'),
      Buffer.from(initVector, 'hex')
    );
    let decryptedData = decipher.update(
      encryptedPermissionString,
      'hex',
      'utf-8'
    );
    decryptedData += decipher.final('utf-8');

    return decryptedData;
  }

  /**
   * function takes input of encrypted password in hex-string format and master password in normal format
   * @param encryptedPassword: encrypted hex string
   * @param masterPassword: normal string
   */
  static async decryptNormalPassword(
    encryptedPassword: string,
    masterPassword: string
  ): Promise<string> {
    const algorithm: string = 'aes-256-cbc';
    const initVector: string = 'bd5fac96dd725e297f87bf255e3aadb0';
    const inflatedPassword: string = this.#inflate(32, masterPassword);

    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(inflatedPassword),
      Buffer.from(initVector, 'hex')
    );
    let decryptedData = decipher.update(encryptedPassword, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');

    return decryptedData;
  }

  static #inflate(targetLength: number, password: string): string {
    const multiplier = Math.ceil(targetLength / password.length);
    return password.repeat(multiplier).substring(0, 32);
  }
}
