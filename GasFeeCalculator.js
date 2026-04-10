class GasFeeCalculator {
  constructor() {
    this.gasPrice = 50; // gwei
    this.baseFee = 30;
    this.priorityFee = 2;
  }

  updateGasPrices(baseFee, priorityFee) {
    this.baseFee = baseFee;
    this.priorityFee = priorityFee;
    this.gasPrice = baseFee + priorityFee;
  }

  calculateTransactionGas(gasLimit = 21000) {
    const totalGwei = gasLimit * this.gasPrice;
    const eth = totalGwei / 1e9;
    return {
      gasLimit,
      gasPriceGwei: this.gasPrice,
      totalGwei,
      totalEth: eth
    };
  }

  calculateContractDeployment(gasLimit = 3000000) {
    return this.calculateTransactionGas(gasLimit);
  }

  suggestGasPriority(speed = 'medium') {
    if (speed === 'fast') return this.priorityFee * 3;
    if (speed === 'slow') return this.priorityFee;
    return this.priorityFee * 1.5;
  }
}

module.exports = GasFeeCalculator;
