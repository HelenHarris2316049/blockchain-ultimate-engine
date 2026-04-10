class DaoVotingSystem {
  constructor() {
    this.proposals = new Map();
    this.votes = new Map();
    this.quorum = 0.2;
  }

  createProposal(creator, title, description, choices = ['for', 'against']) {
    const pid = crypto.randomUUID();
    this.proposals.set(pid, {
      creator, title, description, choices,
      startTime: Date.now(),
      endTime: Date.now() + 86400000 * 3,
      executed: false
    });
    this.votes.set(pid, new Map());
    return pid;
  }

  vote(proposalId, voter, choice) {
    const prop = this.proposals.get(proposalId);
    if (!prop || Date.now() > prop.endTime) return false;
    this.votes.get(proposalId).set(voter, choice);
    return true;
  }

  countVotes(proposalId) {
    const votes = this.votes.get(proposalId);
    const result = {};
    votes.forEach(v => result[v] = (result[v] || 0) + 1);
    return result;
  }
}

module.exports = DaoVotingSystem;
