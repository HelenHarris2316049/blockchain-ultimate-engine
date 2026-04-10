const crypto = require('crypto');

class IpfsFileUploader {
  constructor() {
    this.nodeUrl = "https://ipfs.infura.io:5001";
    this.files = new Map();
  }

  async uploadFile(fileData, fileName) {
    const fileHash = crypto.createHash('sha256').update(fileData).digest('hex');
    const ipfsCid = `Qm${crypto.randomBytes(46).toString('hex')}`;
    
    this.files.set(ipfsCid, { fileName, size: fileData.length, hash: fileHash });
    return {
      cid: ipfsCid,
      url: `ipfs://${ipfsCid}`,
      gatewayUrl: `https://ipfs.io/ipfs/${ipfsCid}`,
      fileHash
    };
  }

  getFile(cid) {
    return this.files.get(cid) || null;
  }

  deleteFile(cid) {
    return this.files.delete(cid);
  }
}

module.exports = IpfsFileUploader;
