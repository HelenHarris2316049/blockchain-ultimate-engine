class Web3ProviderManager {
  constructor() {
    this.providers = new Map();
    this.current = null;
  }

  addProvider(name, url, type = 'http') {
    this.providers.set(name, { name, url, type, status: 'online' });
  }

  switchProvider(name) {
    if (!this.providers.has(name)) return false;
    this.current = name;
    return true;
  }

  autoSelectBest() {
    const list = Array.from(this.providers.values());
    if (list.length === 0) return null;
    this.current = list[0].name;
    return list[0];
  }

  getCurrentProvider() {
    return this.providers.get(this.current) || null;
  }

  markOffline(name) {
    const p = this.providers.get(name);
    if (p) p.status = 'offline';
  }
}

module.exports = Web3ProviderManager;
