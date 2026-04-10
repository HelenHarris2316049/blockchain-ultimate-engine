const crypto = require('crypto');

class PrivateKeyEncryptor {
  static algorithm = 'aes-256-cbc';

  static encrypt(privateKey, password) {
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, iv: iv.toString('hex') };
  }

  static decrypt(encryptedData, password) {
    const { encrypted, iv } = encryptedData;
    const key = crypto.scryptSync(password, 'salt', 32);
    const decipher = crypto.createDecipheriv(this.algorithm, key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

module.exports = PrivateKeyEncryptor;
