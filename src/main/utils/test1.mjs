/* eslint-disable no-console */
import * as crypto from 'crypto';
import template from './tokenTemplate.json' assert { type: 'json' };

class Encrypt {
  /**
   * Takes input of permission string ({token: 'something', 'droplet_actions': {...}})
   * Encrypts the data and sends back(returns) a security key.
   * @param permissionString: normal string with no encryption applied.
   */
  static encryptPermissionString(permissionString) {
    const algorithm = 'aes-256-cbc';
    const initVector = 'bd5fac96dd725e297f87bf255e3aadb0';
    const securitykey = crypto.randomBytes(32);
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
  static encryptNormalPassword(normalPassword, masterPassword) {
    const algorithm = 'aes-256-cbc';
    const initVector = 'bd5fac96dd725e297f87bf255e3aadb0';
    const inflatedPassword = this.#inflate(32, masterPassword);
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(inflatedPassword),
      Buffer.from(initVector, 'hex')
    );

    let encryptedPassword = cipher.update(normalPassword, 'utf-8', 'hex');
    encryptedPassword += cipher.final('hex');

    return encryptedPassword;
  }

  static #inflate(targetLength, password) {
    const multiplier = Math.ceil(targetLength / password.length);
    return password.repeat(multiplier).substring(0, 32);
  }

  static decryptPermissionString(encryptedPermissionString, normalPassword) {
    const algorithm = 'aes-256-cbc';
    const initVector = 'bd5fac96dd725e297f87bf255e3aadb0';

    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(normalPassword, 'hex'),
      Buffer.from(initVector, 'hex')
    );
    let decryptedData = decipher.update(
      encryptedPermissionString,
      'utf-8',
      'hex'
    );
    decryptedData += decipher.final('utf-8');

    return decryptedData;
  }

  static decryptNormalPassword(encryptedPassword, masterPassword) {
    const algorithm = 'aes-256-cbc';
    const initVector = 'bd5fac96dd725e297f87bf255e3aadb0';
    const inflatedPassword = this.#inflate(32, masterPassword);

    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(inflatedPassword),
      Buffer.from(initVector, 'hex')
    );
    let decryptedData = decipher.update(encryptedPassword, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');

    return decryptedData;
  }
}

const [passKey, encryptedPermissionString] = Encrypt.encryptPermissionString(
  JSON.stringify(template)
);
console.log('passkey: ', passKey);
console.log('encrypted data: ', encryptedPermissionString);

const encryptedPassword = Encrypt.encryptNormalPassword(
  'a4349d417c90d5dcf85c9f89468e61d56b99b053aac3507d4e71ccabcdba711f',
  'p'
);
console.log('encryptedPassword: ', encryptedPassword);

const decryptedPassword = Encrypt.decryptNormalPassword(encryptedPassword, 'p');
console.log('decryptedPassword: ', decryptedPassword);

const decryptedPermissionString = Encrypt.decryptPermissionString(
  encryptedPermissionString,
  decryptedPassword
);
console.log('decrypted Data: ', decryptedPermissionString);
