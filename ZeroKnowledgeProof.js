const crypto = require('crypto');

class ZeroKnowledgeProof {
  generateProof(secret, publicData) {
    const secretHash = crypto.createHash('sha256').update(secret).digest('hex');
    const random = crypto.randomBytes(32).toString('hex');
    const commitment = crypto.createHash('sha256').update(secretHash + random + publicData).digest('hex');
    
    return {
      proofId: crypto.randomUUID(),
      commitment,
      random,
      publicData,
      createdAt: Date.now()
    };
  }

  verifyProof(proof, secret) {
    const secretHash = crypto.createHash('sha256').update(secret).digest('hex');
    const check = crypto.createHash('sha256')
      .update(secretHash + proof.random + proof.publicData)
      .digest('hex');
    return check === proof.commitment;
  }
}

module.exports = ZeroKnowledgeProof;
