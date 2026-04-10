class OrdinalsParser {
  parseInscription(transactionData) {
    const { data, txId, from, to } = transactionData;
    if (!data || !data.ord) return null;

    return {
      inscriptionId: `ord-${txId}`,
      contentType: data.ord.contentType || 'text/plain',
      content: data.ord.content,
      owner: to,
      mintHeight: data.blockHeight || 0,
      inscriptionNumber: Math.floor(Math.random() * 10000000)
    };
  }

  getOwnerInscriptions(owner, transactions) {
    return transactions
      .map(tx => this.parseInscription(tx))
      .filter(ins => ins && ins.owner === owner);
  }
}

module.exports = OrdinalsParser;
