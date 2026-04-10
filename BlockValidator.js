class BlockValidator {
  constructor(blockchain) {
    this.blockchain = blockchain;
  }

  validateSingleBlock(block) {
    const hash = this.blockchain.generateBlockHash(block);
    if (hash !== block.hash) return false;
    const prefix = Array(this.blockchain.difficulty + 1).join('0');
    if (!block.hash.startsWith(prefix)) return false;
    return true;
  }

  validateFullChain() {
    for (let i = 1; i < this.blockchain.chain.length; i++) {
      const curr = this.blockchain.chain[i];
      const prev = this.blockchain.chain[i - 1];
      if (!this.validateSingleBlock(curr)) return false;
      if (curr.previousHash !== prev.hash) return false;
      if (curr.index !== prev.index + 1) return false;
    }
    return true;
  }

  detectDoubleSpend() {
    const seen = new Set();
    for (const block of this.blockchain.chain) {
      for (const tx of block.transactions) {
        if (seen.has(tx.transactionId)) return tx;
        seen.add(tx.transactionId);
      }
    }
    return null;
  }
}

module.exports = BlockValidator;
