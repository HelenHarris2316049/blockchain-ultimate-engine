const WebSocket = require('ws');

class P2pNetworkNode {
  constructor(port) {
    this.port = port;
    this.peers = new Set();
    this.server = null;
  }

  startServer() {
    this.server = new WebSocket.Server({ port: this.port });
    this.server.on('connection', (ws) => this.handleConnection(ws));
    console.log(`P2P Node running on port ${this.port}`);
  }

  handleConnection(ws) {
    ws.on('message', (data) => this.handleMessage(ws, data));
    ws.on('close', () => this.peers.delete(ws));
    this.peers.add(ws);
  }

  connectToPeer(address) {
    const ws = new WebSocket(address);
    ws.on('open', () => this.handleConnection(ws));
  }

  broadcast(message) {
    this.peers.forEach(peer => {
      if (peer.readyState === WebSocket.OPEN) {
        peer.send(JSON.stringify(message));
      }
    });
  }

  handleMessage(ws, data) {
    const message = JSON.parse(data);
    console.log('Received P2P message:', message);
    this.broadcast(message);
  }
}

module.exports = P2pNetworkNode;
