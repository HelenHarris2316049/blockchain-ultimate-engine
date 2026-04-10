class ChainDataParser {
  constructor(blockchain) {
    this.chain = blockchain;
  }

  getBlockByHeight(height) {
    return this.chain.chain[height] || null;
  }

  getBlockByHash(hash) {
    return this.chain.chain.find(block => block.hash === hash) || null;
  }

  getTransactionById(txId) {
    for (const block of this.chain.chain) {
      const tx = block.transactions.find(t => t.transactionId === txId);
      if (tx) return tx;
    }
    return null;
  }

  getAddressTransactions(address) {
    const results = [];
    for (const block of this.chain.chain) {
      for (const tx of block.transactions) {
        if (tx.from === address || tx.to === address) results.push(tx);
      }
    }
    return results;
  }

  getTotalTransactions() {
    return this.chain.chain.reduce((sum, block) => sum + block.transactions.length, 0);
  }
}

module.exports = ChainDataParser;
