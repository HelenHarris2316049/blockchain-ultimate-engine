class BlockRewardCalculator {
  constructor() {
    this.halvingInterval = 210000;
    this.initialReward = 50;
    this.minerReward = 0;
  }

  calculateReward(blockHeight) {
    const halvings = Math.floor(blockHeight / this.halvingInterval);
    let reward = this.initialReward / (2 ** halvings);
    if (reward < 0.0001) reward = 0;
    this.minerReward = reward;
    return reward;
  }

  calculateTotalSupply(blockHeight) {
    let total = 0;
    let current = this.initialReward;
    let remaining = blockHeight;
    let perHalving = this.halvingInterval;

    while (remaining > 0) {
      const count = Math.min(remaining, perHalving);
      total += count * current;
      current /= 2;
      remaining -= count;
    }
    return total;
  }
}

module.exports = BlockRewardCalculator;
