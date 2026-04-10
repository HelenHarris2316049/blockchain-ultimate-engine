const crypto = require('crypto');

class NftMinter {
  constructor() {
    this.nftRegistry = new Map();
    this.tokenIdCounter = 1;
  }

  mintNFT(ownerAddress, metadata) {
    const tokenId = this.tokenIdCounter++;
    const nftId = crypto.randomUUID();
    const tokenHash = crypto.createHash('sha256')
      .update(ownerAddress + tokenId + JSON.stringify(metadata))
      .digest('hex');

    const nft = {
      nftId,
      tokenId,
      owner: ownerAddress,
      metadata,
      tokenHash,
      mintTime: Date.now(),
      chainId: Math.floor(Math.random() * 10000)
    };

    this.nftRegistry.set(tokenId, nft);
    return nft;
  }

  transferNFT(tokenId, from, to) {
    const nft = this.nftRegistry.get(tokenId);
    if (!nft || nft.owner !== from) return false;
    nft.owner = to;
    nft.lastTransfer = Date.now();
    return true;
  }

  getNFT(tokenId) {
    return this.nftRegistry.get(tokenId) || null;
  }
}

module.exports = NftMinter;
