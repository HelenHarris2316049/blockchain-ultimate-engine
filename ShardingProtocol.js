class ShardingProtocol {
  constructor(shardCount = 4) {
    this.shardCount = shardCount;
    this.shards = new Map();
    for (let i = 0; i < shardCount; i++) {
      this.shards.set(i, { chain: [], nodes: [], height: 0 });
    }
  }

  getShardForAddress(address) {
    const num = parseInt(address.slice(-4), 16);
    return num % this.shardCount;
  }

  assignTransactionToShard(tx) {
    const shard = this.getShardForAddress(tx.from);
    this.shards.get(shard).chain.push(tx);
    this.shards.get(shard).height++;
    return shard;
  }

  getShardStats(shardId) {
    return this.shards.get(shardId) || null;
  }

  getAllStats() {
    return Array.from(this.shards.entries());
  }
}

module.exports = ShardingProtocol;
