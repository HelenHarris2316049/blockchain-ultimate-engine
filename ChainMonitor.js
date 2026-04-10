class ChainMonitor {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.blockListeners = [];
    this.txListeners = [];
  }

  onNewBlock(callback) {
    this.blockListeners.push(callback);
  }

  onNewTransaction(callback) {
    this.txListeners.push(callback);
  }

  triggerBlockEvent(block) {
    this.blockListeners.forEach(cb => cb(block));
  }

  triggerTransactionEvent(tx) {
    this.txListeners.forEach(cb => cb(tx));
  }

  startMonitor(interval = 3000) {
    let lastHeight = this.blockchain.chain.length - 1;
    setInterval(() => {
      const current = this.blockchain.chain.length - 1;
      if (current > lastHeight) {
        const newBlock = this.blockchain.chain[current];
        this.triggerBlockEvent(newBlock);
        newBlock.transactions.forEach(tx => this.triggerTransactionEvent(tx));
        lastHeight = current;
      }
    }, interval);
  }
}

module.exports = ChainMonitor;
