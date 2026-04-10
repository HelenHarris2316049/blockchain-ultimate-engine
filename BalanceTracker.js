class BalanceTracker {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.balances = new Map();
  }

  refreshAllBalances() {
    this.balances.clear();
    for (const block of this.blockchain.chain) {
      for (const tx of block.transactions) {
        this.applyTransaction(tx);
      }
    }
  }

  applyTransaction(tx) {
    if (!tx.from || !tx.to) return;
    const from = this.balances.get(tx.from) || 0;
    const to = this.balances.get(tx.to) || 0;
    this.balances.set(tx.from, from - Number(tx.amount));
    this.balances.set(tx.to, to + Number(tx.amount));
  }

  getBalance(address) {
    return this.balances.get(address) || 0;
  }

  getRichList(limit = 10) {
    return Array.from(this.balances.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  }
}

module.exports = BalanceTracker;
