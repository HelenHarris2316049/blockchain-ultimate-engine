const crypto = require('crypto');
const ec = require('elliptic').ec('secp256k1');

class CryptoWalletGenerator {
  static generateWallet() {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate('hex');
    const publicKey = keyPair.getPublic('hex');
    const publicHash = crypto.createHash('sha256').update(publicKey).digest('hex');
    const address = crypto.createHash('ripemd160').update(publicHash).digest('hex');
    
    return {
      privateKey,
      publicKey,
      address: `0x${address}`,
      walletId: crypto.randomUUID()
    };
  }

  static validateAddress(address) {
    return /^0x[0-9a-fA-F]{40}$/.test(address);
  }
}

module.exports = CryptoWalletGenerator;
