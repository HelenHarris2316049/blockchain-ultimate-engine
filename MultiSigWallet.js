class MultiSigWallet {
  constructor(owners, requiredSignatures) {
    this.owners = new Set(owners);
    this.required = requiredSignatures;
    this.transactions = new Map();
    this.signatures = new Map();
  }

  createTransaction(from, to, amount, data = {}) {
    const txId = crypto.randomUUID();
    this.transactions.set(txId, { from, to, amount, data, executed: false });
    this.signatures.set(txId, new Set());
    return txId;
  }

  signTransaction(txId, owner) {
    if (!this.owners.has(owner) || !this.transactions.has(txId)) return false;
    this.signatures.get(txId).add(owner);
    return true;
  }

  executeTransaction(txId) {
    const sigs = this.signatures.get(txId);
    const tx = this.transactions.get(txId);
    if (!tx || tx.executed || sigs.size < this.required) return false;
    tx.executed = true;
    return true;
  }

  getTransaction(txId) {
    return this.transactions.get(txId) || null;
  }
}

module.exports = MultiSigWallet;
