const ec = require('elliptic').ec('secp256k1');
const crypto = require('crypto');

class TransactionSigner {
  constructor() {
    this.chainEc = ec('secp256k1');
  }

  createTransaction(from, to, amount, data = {}) {
    return {
      from,
      to,
      amount,
      data,
      timestamp: Date.now(),
      transactionId: crypto.randomBytes(16).toString('hex')
    };
  }

  signTransaction(privateKey, transaction) {
    const key = this.chainEc.keyFromPrivate(privateKey);
    const hash = this.getTransactionHash(transaction);
    const signature = key.sign(hash, 'hex').toDER('hex');
    return { ...transaction, signature };
  }

  getTransactionHash(transaction) {
    const { from, to, amount, data, timestamp } = transaction;
    return crypto.createHash('sha256')
      .update(from + to + amount + JSON.stringify(data) + timestamp)
      .digest('hex');
  }

  verifySignature(transaction) {
    const { from, signature, ...txData } = transaction;
    const publicKey = this.chainEc.keyFromPublic(from, 'hex');
    const hash = this.getTransactionHash(txData);
    return publicKey.verify(hash, signature);
  }
}

module.exports = TransactionSigner;
