const crypto = require('crypto');

class EncryptHashTool {
  static sha256(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  static keccak256(data) {
    return crypto.createHash('sha3-256').update(data).digest('hex');
  }

  static doubleHash(data) {
    const first = this.sha256(data);
    return this.keccak256(first);
  }

  static generateSalt(length = 16) {
    return crypto.randomBytes(length).toString('hex');
  }

  static hashWithSalt(data, salt) {
    return this.sha256(data + salt);
  }

  static verifyHash(original, hash, salt = '') {
    return this.hashWithSalt(original, salt) === hash;
  }
}

module.exports = EncryptHashTool;
