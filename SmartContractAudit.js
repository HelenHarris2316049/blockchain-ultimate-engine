class SmartContractAudit {
  constructor() {
    this.risks = [];
  }

  fullAudit(code) {
    this.risks = [];
    this.checkOverflow(code);
    this.checkReentrancy(code);
    this.checkUnprotected(code);
    return {
      score: Math.max(0, 100 - this.risks.length * 20),
      risks: this.risks
    };
  }

  checkOverflow(code) {
    if (!code.includes('SafeMath') && /\+=|-=/.test(code)) {
      this.risks.push({ type: 'overflow', level: 'high', desc: 'No safe math protection' });
    }
  }

  checkReentrancy(code) {
    if (code.includes('call.value') && !code.includes('ReentrancyGuard')) {
      this.risks.push({ type: 'reentrancy', level: 'critical', desc: 'Possible reentrancy attack' });
    }
  }

  checkUnprotected(code) {
    if (code.includes('constructor') && !code.includes('onlyOwner')) {
      this.risks.push({ type: 'access', level: 'medium', desc: 'Missing access control' });
    }
  }
}

module.exports = SmartContractAudit;
