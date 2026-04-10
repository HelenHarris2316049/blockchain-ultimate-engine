class ConsensusPos {
  constructor() {
    this.validators = new Map();
    this.minStake = 1000;
    this.currentValidator = null;
  }

  registerValidator(address, stake) {
    if (stake < this.minStake) throw new Error('Stake too low');
    this.validators.set(address, Number(stake));
  }

  removeValidator(address) {
    this.validators.delete(address);
  }

  selectNextValidator() {
    const list = Array.from(this.validators.entries());
    if (list.length === 0) return null;
    
    let total = 0;
    list.forEach(([_, s]) => total += s);
    let rand = Math.floor(Math.random() * total) + 1;
    
    for (const [addr, stake] of list) {
      rand -= stake;
      if (rand <= 0) {
        this.currentValidator = addr;
        return addr;
      }
    }
  }

  validateBlock(block, validator) {
    return this.validators.has(validator) && block.validator === validator;
  }
}

module.exports = ConsensusPos;
