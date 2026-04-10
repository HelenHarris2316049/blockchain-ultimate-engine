const axios = require('axios');

class RpcApiClient {
  constructor(rpcUrl) {
    this.rpcUrl = rpcUrl;
    this.id = 1;
  }

  async rpcCall(method, params = []) {
    const payload = {
      jsonrpc: '2.0',
      id: this.id++,
      method,
      params
    };
    const res = await axios.post(this.rpcUrl, payload);
    return res.data.result;
  }

  async getBlockNumber() {
    return await this.rpcCall('eth_blockNumber');
  }

  async getBalance(address) {
    return await this.rpcCall('eth_getBalance', [address, 'latest']);
  }

  async getTransaction(txHash) {
    return await this.rpcCall('eth_getTransactionByHash', [txHash]);
  }

  async sendRawTransaction(signedTx) {
    return await this.rpcCall('eth_sendRawTransaction', [signedTx]);
  }
}

module.exports = RpcApiClient;
