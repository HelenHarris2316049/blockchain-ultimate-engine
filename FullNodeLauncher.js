const BlockchainCore = require('./BlockchainCore');
const P2pNetworkNode = require('./P2pNetworkNode');
const MiningEngine = require('./MiningEngine');
const ChainMonitor = require('./ChainMonitor');

class FullNodeLauncher {
  constructor(port = 3000) {
    this.core = new BlockchainCore();
    this.p2p = new P2pNetworkNode(port);
    this.miner = new MiningEngine();
    this.monitor = new ChainMonitor(this.core);
    this.running = false;
  }

  start() {
    if (this.running) return;
    this.p2p.startServer();
    this.monitor.startMonitor();
    this.running = true;
    console.log('✅ Blockchain Full Node Started Successfully');
    console.log(`✅ Chain Height: ${this.core.chain.length}`);
  }

  mineAndBroadcast() {
    const block = this.core.minePendingBlock();
    this.p2p.broadcast({ type: 'new_block', block });
    return block;
  }

  getNodeInfo() {
    return {
      height: this.core.chain.length,
      peers: this.p2p.peers.size,
      pending: this.core.pendingTransactions.length,
      running: this.running
    };
  }
}

module.exports = FullNodeLauncher;
