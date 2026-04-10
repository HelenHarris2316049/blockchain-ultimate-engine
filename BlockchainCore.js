class BlockchainCore {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createGenesisBlock();
    this.difficulty = 4;
  }

  createGenesisBlock() {
    const genesisBlock = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: "0",
      hash: "genesis-block-hash-ultimate",
      nonce: 0
    };
    this.chain.push(genesisBlock);
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  generateBlockHash(block) {
    const { index, timestamp, transactions, previousHash, nonce } = block;
    return require('crypto').createHash('sha256')
      .update(index + timestamp + JSON.stringify(transactions) + previousHash + nonce)
      .digest('hex');
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  minePendingBlock() {
    const lastBlock = this.getLastBlock();
    const newBlock = {
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      previousHash: lastBlock.hash,
      nonce: 0
    };

    while (!newBlock.hash || newBlock.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
      newBlock.nonce++;
      newBlock.hash = this.generateBlockHash(newBlock);
    }

    this.chain.push(newBlock);
    this.pendingTransactions = [];
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      if (current.hash !== this.generateBlockHash(current)) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

module.exports = BlockchainCore;
