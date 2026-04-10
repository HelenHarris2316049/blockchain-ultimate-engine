class DappFrontendConnector {
  constructor() {
    this.provider = null;
    this.walletConnected = false;
    this.connectedAddress = null;
  }

  async connectMetaMask() {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask not installed');
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.connectedAddress = accounts[0];
    this.walletConnected = true;
    this.provider = window.ethereum;
    return this.connectedAddress;
  }

  async getChainId() {
    if (!this.provider) return null;
    return await this.provider.request({ method: 'eth_chainId' });
  }

  disconnect() {
    this.walletConnected = false;
    this.connectedAddress = null;
    this.provider = null;
  }

  onAccountChange(callback) {
    if (this.provider) {
      this.provider.on('accountsChanged', callback);
    }
  }
}

module.exports = DappFrontendConnector;
