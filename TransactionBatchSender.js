class TransactionBatchSender {
  constructor(signer, blockchain) {
    this.signer = signer;
    this.blockchain = blockchain;
    this.batch = [];
  }

  addToBatch(privateKey, from, to, amount) {
    const tx = this.signer.createTransaction(from, to, amount);
    const signed = this.signer.signTransaction(privateKey, tx);
    this.batch.push(signed);
  }

  sendBatch() {
    if (this.batch.length === 0) return { count: 0, success: 0 };
    let success = 0;
    for (const tx of this.batch) {
      if (this.signer.verifySignature(tx)) {
        this.blockchain.addTransaction(tx);
        success++;
      }
    }
    const result = { count: this.batch.length, success };
    this.batch = [];
    return result;
  }

  clearBatch() {
    this.batch = [];
  }
}

module.exports = TransactionBatchSender;
