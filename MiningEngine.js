const crypto = require('crypto');

class MiningEngine {
  constructor(difficulty = 4) {
    this.difficulty = difficulty;
    this.minerReward = 10;
    this.targetPrefix = Array(this.difficulty + 1).join("0");
  }

  mineBlock(blockData, previousHash) {
    let nonce = 0;
    let startTime = Date.now();

    while (true) {
      const hash = crypto.createHash('sha256')
        .update(JSON.stringify(blockData) + previousHash + nonce)
        .digest('hex');

      if (hash.startsWith(this.targetPrefix)) {
        const timeTaken = (Date.now() - startTime) / 1000;
        return { hash, nonce, timeTaken };
      }
      nonce++;
    }
  }

  adjustDifficulty(lastBlockTime, currentTime) {
    const blockTime = currentTime - lastBlockTime;
    if (blockTime < 2000) this.difficulty++;
    if (blockTime > 8000 && this.difficulty > 1) this.difficulty--;
    this.targetPrefix = Array(this.difficulty + 1).join("0");
  }
}

module.exports = MiningEngine;
