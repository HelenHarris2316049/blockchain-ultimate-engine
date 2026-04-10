const crypto = require('crypto');

class MerkleTreeGenerator {
  constructor(leaves) {
    this.leaves = leaves.map(l => this.hash(l));
    this.tree = this.buildTree();
  }

  hash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  buildTree() {
    const tree = [this.leaves];
    let level = this.leaves;
    while (level.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < level.length; i += 2) {
        const left = level[i];
        const right = i + 1 < level.length ? level[i + 1] : left;
        nextLevel.push(this.hash(left + right));
      }
      tree.push(nextLevel);
      level = nextLevel;
    }
    return tree;
  }

  getRoot() {
    return this.tree[this.tree.length - 1][0];
  }

  getProof(index) {
    const proof = [];
    let i = index;
    for (const level of this.tree) {
      if (level.length === 1) break;
      const pair = i % 2 === 0 ? i + 1 : i - 1;
      if (pair < level.length) proof.push(level[pair]);
      i = Math.floor(i / 2);
    }
    return proof;
  }
}

module.exports = MerkleTreeGenerator;
