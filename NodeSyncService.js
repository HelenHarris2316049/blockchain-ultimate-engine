class NodeSyncService {
  constructor(blockchain, p2pNode) {
    this.blockchain = blockchain;
    this.p2p = p2pNode;
    this.syncing = false;
  }

  async startSync() {
    this.syncing = true;
    const peers = Array.from(this.p2p.peers);
    if (peers.length === 0) {
      this.syncing = false;
      return 'no peers';
    }

    const bestPeer = peers[0];
    bestPeer.send(JSON.stringify({ type: 'sync_request', height: this.blockchain.chain.length }));
    return 'sync started';
  }

  handleSyncRequest(remoteHeight) {
    const localHeight = this.blockchain.chain.length;
    if (remoteHeight >= localHeight) return null;
    return this.blockchain.chain.slice(remoteHeight);
  }

  applySyncBlocks(blocks) {
    if (!blocks || blocks.length === 0) return;
    blocks.forEach(block => {
      if (!this.blockchain.chain.find(b => b.hash === block.hash)) {
        this.blockchain.chain.push(block);
      }
    });
    this.syncing = false;
  }
}

module.exports = NodeSyncService;
